export function renderSemanticPage(pageData)
{
    if (!pageData)
    {
        return;
    }

    const runtime =
        document.querySelector("main");

    if (!runtime)
    {
        return;
    }

    const semanticSurface =
        buildSemanticSurface(pageData);

    runtime.insertAdjacentHTML(
        "beforeend",
        semanticSurface
    );
}



/*
|--------------------------------------------------------------------------
| Semantic Surface
|--------------------------------------------------------------------------
*/

function buildSemanticSurface(pageData)
{
    return `

        <section

            id="${pageData.slug}"

            class="
                semantic-page
                runtime-stack
            "

            data-semantic-page="${pageData.slug}"

        >

            ${renderSemanticHeader(pageData)}

            <div
                class="
                    semantic-sections
                    runtime-stack
                "
            >

                ${renderSections(
                    pageData.sections
                )}

                ${renderRelatedPages(
                    pageData.relatedPages
                )}

            </div>

        </section>

    `;
}



/*
|--------------------------------------------------------------------------
| Semantic Header
|--------------------------------------------------------------------------
*/

function renderSemanticHeader(pageData)
{
    return `

        <header
            class="
                semantic-page-header
                runtime-stack
            "
        >

            <span class="slide-tag">

                ${pageData.hero.tag}

            </span>

            <h2>

                ${pageData.hero.headline}

            </h2>

            <p class="section-introduction">

                ${pageData.hero.subheadline}

            </p>

        </header>

    `;
}



/*
|--------------------------------------------------------------------------
| Semantic Sections
|--------------------------------------------------------------------------
*/

function renderSections(sections)
{
    if (!sections || !sections.length)
    {
        return "";
    }

    return sections.map(

        (section) => {

            return `

                <article
                    class="
                        semantic-section
                        info-card
                    "
                >

                    <h3>

                        ${section.title}

                    </h3>

                    ${renderContent(
                        section.content
                    )}

                </article>

            `;

        }

    ).join("");
}



/*
|--------------------------------------------------------------------------
| Section Content
|--------------------------------------------------------------------------
*/

function renderContent(content)
{
    if (!content || !content.length)
    {
        return "";
    }

    return content.map(

        (paragraph) => {

            return `

                <p>

                    ${paragraph}

                </p>

            `;

        }

    ).join("");
}



/*
|--------------------------------------------------------------------------
| Related Semantic Pages
|--------------------------------------------------------------------------
*/

function renderRelatedPages(relatedPages)
{
    if (
        !relatedPages ||
        !relatedPages.length
    )
    {
        return "";
    }

    return `

        <section
            class="
                semantic-related-pages
                runtime-stack
            "
        >

            <h3>

                Related Engineering Domains

            </h3>

            <div
                class="
                    cards-grid
                    runtime-grid
                "
            >

                ${relatedPages.map(

                    (page) => {

                        return `

                            <article
                                class="
                                    info-card
                                    semantic-link-card
                                "
                            >

                                <a

                                    href="#${page.slug}"

                                    class="
                                        semantic-page-link
                                    "

                                >

                                    ${page.title}

                                </a>

                            </article>

                        `;

                    }

                ).join("")}

            </div>

        </section>

    `;
}