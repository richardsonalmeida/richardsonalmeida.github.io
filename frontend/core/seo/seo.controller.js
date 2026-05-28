import
{
    applySeoMetadata
}
from "./seo.renderer.js";

export async function initializeSeo()
{
    try
    {
        const response = await fetch(
            "frontend/data/seo/homepage.seo.json"
        );

        const seoData = await response.json();

        applySeoMetadata(seoData);

        console.info(
            "[SEO] Semantic metadata loaded."
        );
    }
    catch (error)
    {
        console.error(
            "[SEO] Failed to initialize SEO layer.",
            error
        );
    }
}
