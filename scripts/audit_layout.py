#!/usr/bin/env python3
"""
Auditoria de layout via Playwright.
Mede alinhamento entre header, sidebar e conteudo em multiplos breakpoints.
Roda contra http://localhost:8000 (assume server.py rodando).
"""
import json
from playwright.sync_api import sync_playwright

BASE = "http://localhost:8000"

# URLs representativas (1 de cada tipo de template, 3 idiomas)
URLS = [
    ("home-en",       "/"),
    ("home-pt",       "/pt-br/"),
    ("home-es",       "/es/"),
    ("articles-en",   "/articles/"),
    ("articles-pt",   "/pt-br/articles/"),
    ("articles-es",   "/es/articles/"),
    ("art-vikon-en",  "/articles/vikon-architecture/"),
    ("art-vikon-pt",  "/pt-br/articles/vikon-architecture/"),
    ("art-vikon-es",  "/es/articles/vikon-architecture/"),
    ("proj-vikon-en", "/projects/vikon.html"),
    ("proj-vikon-pt", "/pt-br/projects/vikon.html"),
    ("proj-vikon-es", "/es/projects/vikon.html"),
    ("proj-dp-en",    "/projects/digital-presence.html"),
    ("proj-dp-pt",    "/pt-br/projects/digital-presence.html"),
    ("proj-dp-es",    "/es/projects/digital-presence.html"),
]

# Viewports de teste
VIEWPORTS = [
    (1200, ">=900px (desktop)"),
    (800,  "800px (tablet)"),
    (500,  "500px (mobile)"),
]

JS_MEASURE = r"""
() => {
    const q = (sel) => document.querySelector(sel);
    const rect = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
            top: Math.round(r.top * 100) / 100,
            left: Math.round(r.left * 100) / 100,
            bottom: Math.round(r.bottom * 100) / 100,
            right: Math.round(r.right * 100) / 100,
            width: Math.round(r.width * 100) / 100,
            height: Math.round(r.height * 100) / 100,
        };
    };
    const cs = (el, prop) => el ? getComputedStyle(el)[prop] : null;

    const body     = document.body;
    const header   = q("header.site-header");
    const sidebar  = q("aside.sidebar");
    const container= q("div.container");
    const main     = q("main") || q("div.container");

    return {
        body_padding:   cs(body, "padding"),
        body_margin:    cs(body, "margin"),
        header: {
            rect:       rect(header),
            position:   cs(header, "position"),
            top:        cs(header, "top"),
            zIndex:     cs(header, "zIndex"),
            background: cs(header, "backgroundColor"),
            marginBottom: cs(header, "marginBottom"),
            paddingBottom: cs(header, "paddingBottom"),
        },
        sidebar: sidebar ? {
            rect:       rect(sidebar),
            position:   cs(sidebar, "position"),
            top:        cs(sidebar, "top"),
            left:       cs(sidebar, "left"),
            width:      cs(sidebar, "width"),
        } : null,
        container: {
            rect:       rect(container),
            marginLeft: cs(container, "marginLeft"),
            paddingTop: cs(container, "paddingTop"),
        },
        main: {
            rect:       rect(main),
        },
    };
}
"""


def analyze(measurement):
    """Calcula gaps e detecta desalinhamentos."""
    h = measurement["header"]["rect"]
    s = measurement["sidebar"]["rect"] if measurement["sidebar"] else None
    c = measurement["container"]["rect"]
    m = measurement["main"]["rect"]

    out = {}
    if h:
        out["header_height"] = h["height"]
        out["header_bottom"] = h["bottom"]
    if s:
        out["sidebar_top"]    = s["top"]
        out["sidebar_left"]   = s["left"]
        out["sidebar_width"]  = s["width"]
        if h:
            out["gap_header_to_sidebar"] = round(s["top"] - h["bottom"], 2)
    if m:
        out["main_top"]  = m["top"]
        out["main_left"] = m["left"]
        if h:
            out["gap_header_to_main"] = round(m["top"] - h["bottom"], 2)
        if s:
            out["sidebar_to_main_h_diff"] = round(m["left"] - (s["left"] + s["width"]), 2)
    return out


def main():
    results = {}

    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        for width, label in VIEWPORTS:
            print("======================================================")
            print(" VIEWPORT: " + label + "  (largura=" + str(width) + ")")
            print("======================================================")
            print()

            context = browser.new_context(viewport={"width": width, "height": 900})
            page = context.new_page()

            for name, path in URLS:
                url = BASE + path
                try:
                    page.goto(url, wait_until="networkidle", timeout=10000)
                except Exception as e:
                    print("  " + name + " -> FALHA (" + str(e) + ")")
                    continue

                m = page.evaluate(JS_MEASURE)
                a = analyze(m)
                results[(width, name)] = a

                h  = m["header"]["rect"]
                s  = m["sidebar"]["rect"] if m["sidebar"] else None
                mm = m["main"]["rect"]

                # Formato compacto
                header_str = "h=" + str(round(h["height"], 1)) if h else "h=None"
                sidebar_str = ("top=" + str(round(s["top"], 1)) + " left=" + str(round(s["left"], 1))
                               + " w=" + str(round(s["width"], 1))) if s else "sidebar=None"
                main_str = "top=" + str(round(mm["top"], 1)) + " left=" + str(round(mm["left"], 1))

                print("  " + name.ljust(15) + " | " + header_str.ljust(10) + " | " +
                      sidebar_str.ljust(35) + " | main " + main_str)
                print("     gap_header->sidebar=" + str(a.get("gap_header_to_sidebar", "N/A")).ljust(8)
                      + "  gap_header->main=" + str(a.get("gap_header_to_main", "N/A")).ljust(8)
                      + "  sidebar->main(h)=" + str(a.get("sidebar_to_main_h_diff", "N/A")))

            context.close()
            print()

        browser.close()

    # --- Analise final: consistencia entre paginas no mesmo viewport ---
    print("======================================================")
    print(" ANALISE DE CONSISTENCIA POR VIEWPORT")
    print("======================================================")
    for width, label in VIEWPORTS:
        print()
        print("----- " + label + " -----")
        gaps_side = []
        gaps_main = []
        for (w, name), a in results.items():
            if w != width:
                continue
            if "gap_header_to_sidebar" in a:
                gaps_side.append(a["gap_header_to_sidebar"])
            if "gap_header_to_main" in a:
                gaps_main.append(a["gap_header_to_main"])

        def report(label, vals):
            if not vals:
                print("  " + label + ": sem dados")
                return
            uniq = sorted(set(vals))
            if len(uniq) == 1:
                print("  " + label + ": CONSISTENTE = " + str(uniq[0]) + "px")
            else:
                print("  " + label + ": INCONSISTENTE = " + str(uniq))

        report("gap_header_to_sidebar", gaps_side)
        report("gap_header_to_main",    gaps_main)

        # Comparacao entre os dois gaps (o ponto real do problema)
        if gaps_side and gaps_main:
            avg_side = sum(gaps_side) / len(gaps_side)
            avg_main = sum(gaps_main) / len(gaps_main)
            diff = round(avg_side - avg_main, 2)
            if abs(diff) < 1:
                print("  sidebar_main_alinhados: SIM (diff " + str(diff) + "px)")
            else:
                print("  sidebar_main_alinhados: NAO (diff " + str(diff) + "px) <- DESALINHAMENTO")

    print()
    print("======================================================")
    print(" FIM")
    print("======================================================")


if __name__ == "__main__":
    main()
