from playwright.sync_api import sync_playwright

with sync_playwright() as pw:
    b = pw.chromium.launch()
    p = b.new_context(viewport={"width": 1200, "height": 900}).new_page()
    p.goto("http://localhost:8000/", wait_until="networkidle")
    info = p.evaluate("""() => {
        const c = document.querySelector('.container');
        const s = getComputedStyle(c);
        const r = c.getBoundingClientRect();
        return {
            width_computed: s.width,
            max_width: s.maxWidth,
            margin_left: s.marginLeft,
            margin_right: s.marginRight,
            rect_left: Math.round(r.left),
            rect_width: Math.round(r.width),
            rect_right: Math.round(r.right),
        };
    }""")
    for k, v in info.items():
        print(f"  {k}: {v}")
    b.close()
