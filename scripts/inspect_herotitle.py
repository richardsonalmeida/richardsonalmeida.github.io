from playwright.sync_api import sync_playwright

BASE = "http://localhost:8000"

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    page = browser.new_context(viewport={"width": 1200, "height": 900}).new_page()

    for path in ["/", "/articles/"]:
        page.goto(BASE + path, wait_until="networkidle")
        info = page.evaluate("""() => {
            const ht = document.querySelector(".hero-title");
            const h1 = ht.querySelector("h1");
            const a  = ht.querySelector("h1 a");
            const p  = ht.querySelector("p.role");
            const cs = (el) => {
                const s = getComputedStyle(el);
                return {
                    display: s.display,
                    fontSize: s.fontSize,
                    lineHeight: s.lineHeight,
                    marginTop: s.marginTop,
                    marginBottom: s.marginBottom,
                    paddingTop: s.paddingTop,
                    paddingBottom: s.paddingBottom,
                    height: Math.round(el.getBoundingClientRect().height * 10) / 10,
                };
            };
            return {
                heroTitle: cs(ht),
                h1: cs(h1),
                a: cs(a),
                p: cs(p),
            };
        }""")
        print("===== " + path + " =====")
        for k, v in info.items():
            print("  " + k + ":")
            for kk, vv in v.items():
                print("    " + kk + ": " + str(vv))
        print()

    browser.close()
