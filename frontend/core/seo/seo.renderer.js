export function applySeoMetadata(seoData)
{
    if (!seoData)
    {
        return;
    }

    /*
    |--------------------------------------------------------------------------
    | Title
    |--------------------------------------------------------------------------
    */

    document.title = seoData.title || document.title;

    /*
    |--------------------------------------------------------------------------
    | Meta Description
    |--------------------------------------------------------------------------
    */

    updateMetaTag(
        "description",
        seoData.description
    );

    /*
    |--------------------------------------------------------------------------
    | Keywords
    |--------------------------------------------------------------------------
    */

    updateMetaTag(
        "keywords",
        seoData.keywords?.join(", ")
    );

    /*
    |--------------------------------------------------------------------------
    | Author
    |--------------------------------------------------------------------------
    */

    updateMetaTag(
        "author",
        seoData.author
    );

    /*
    |--------------------------------------------------------------------------
    | Robots
    |--------------------------------------------------------------------------
    */

    updateMetaTag(
        "robots",
        seoData.robots
    );

    /*
    |--------------------------------------------------------------------------
    | Canonical
    |--------------------------------------------------------------------------
    */

    updateCanonical(
        seoData.canonical
    );

    /*
    |--------------------------------------------------------------------------
    | Open Graph
    |--------------------------------------------------------------------------
    */

    if (seoData.openGraph)
    {
        updatePropertyTag(
            "og:title",
            seoData.openGraph.title
        );

        updatePropertyTag(
            "og:description",
            seoData.openGraph.description
        );

        updatePropertyTag(
            "og:type",
            seoData.openGraph.type
        );

        updatePropertyTag(
            "og:url",
            seoData.openGraph.url
        );

        awaitStructuredData();
    }
}

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function updateMetaTag(name, content)
{
    if (!content)
    {
        return;
    }

    let tag = document.querySelector(
        `meta[name="${name}"]`
    );

    if (!tag)
    {
        tag = document.createElement("meta");

        tag.setAttribute("name", name);

        document.head.appendChild(tag);
    }

    tag.setAttribute("content", content);
}

function updatePropertyTag(property, content)
{
    if (!content)
    {
        return;
    }

    let tag = document.querySelector(
        `meta[property="${property}"]`
    );

    if (!tag)
    {
        tag = document.createElement("meta");

        tag.setAttribute(
            "property",
            property
        );

        document.head.appendChild(tag);
    }

    tag.setAttribute(
        "content",
        content
    );
}

function updateCanonical(url)
{
    if (!url)
    {
        return;
    }

    let canonical = document.querySelector(
        'link[rel="canonical"]'
    );

    if (!canonical)
    {
        canonical = document.createElement("link");

        canonical.setAttribute(
            "rel",
            "canonical"
        );

        document.head.appendChild(canonical);
    }

    canonical.setAttribute(
        "href",
        url
    );
}

/*
|--------------------------------------------------------------------------
| Structured Data
|--------------------------------------------------------------------------
*/

async function awaitStructuredData()
{
    try
    {
        const response = await fetch(
            "frontend/data/structured/person.schema.json"
        );

        const schema = await response.json();

        injectStructuredData(schema);
    }

    catch (error)
    {
        console.error(
            "[SEO] Failed to load structured data.",
            error
        );
    }
}



function injectStructuredData(schema)
{
    const script = document.createElement("script");

    script.type =
        "application/ld+json";

    script.textContent =
        JSON.stringify(schema);

    document.head.appendChild(script);
}
