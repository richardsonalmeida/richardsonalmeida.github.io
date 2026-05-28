import
{
    renderSemanticPage
}
from "./page.renderer.js";



export async function initializeSemanticPage(slug)
{
    try
    {
        const response = await fetch(

            `frontend/data/pages/${slug}/page.json`

        );

        const pageData =
            await response.json();

        renderSemanticPage(pageData);

        console.info(

            `[PAGE] Semantic page loaded: ${slug}`

        );
    }

    catch (error)
    {
        console.error(

            `[PAGE] Failed to load semantic page: ${slug}`,

            error

        );
    }
}
