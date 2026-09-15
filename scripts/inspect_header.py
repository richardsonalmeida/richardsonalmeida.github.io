from playwright.sync_api import sync_playwright

BASE = "http://localhost:8000"

URLS = ["/", "/articles/", "/articles/vikon-architecture/", "/projects/vikon.html"]

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    page = browser.new_context(viewport={"width": 1200, "height": 900}).new_page()

    for path in URLS:
        page.goto(BASE + path, wait_until="networkidle")
        info = page.evaluate("""() => {
            const h = document.querySelector("header.site-header");
            const kids = Array.from(h.children).map(c => ({
                tag: c.tagName,
                cls: c.className,
                h: Math.round(c.getBoundingClientRect().height * 10) / 10,
                display: getComputedStyle(c).display,
            }));
            return {
                header_height: Math.round(h.getBoundingClientRect().height * 10) / 10,
                header_margin_bottom: getComputedStyle(h).marginBottom,
                header_padding_bottom: getComputedStyle(h).paddingBottom,
                children: kids,
            };
        }""")
        print("===== " + path + " =====")
        print("  header height: " + str(info["header_height"]))
        print("  margin-bottom: " + info["header_margin_bottom"])
        print("  padding-bottom: " + info["header_padding_bottom"])
        for k in info["children"]:
            print("    <" + k["tag"] + " class=\"" + k["cls"] + "\"> h=" + str(k["h"]) + " display=" + k["display"])
        print()

    browser.close()
