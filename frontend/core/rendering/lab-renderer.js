import { LABS_STATE }
from "../state/labs.state.js";

import { RENDERING_STATE }
from "../state/rendering.state.js";

import { RUNTIME_CONTRACT }
from "../contracts/runtime.contract.js";


export async function renderLabsRuntime() {

    LABS_STATE.loading =
        true;

    document.body.dataset.labsRuntime =
        "loading";

    const container =
        getRuntimeContainer();

    if (!container) {

        runtimeError(
            "Capability container not found."
        );

        return;

    }

    try {

        clearRuntimeContainer(
            container
        );

        const capabilities =
            await loadEngineeringCapabilities();

        await progressivelyRenderCapabilities({

            container,
            capabilities

        });

        synchronizeRendering(
            capabilities
        );

    }

    catch (error) {

        document.body.dataset.labsRuntime =
            "failure";

        runtimeError(
            "Capability rendering failure.",
            error
        );

    }

}



function getRuntimeContainer() {

    return document.getElementById(

        RUNTIME_CONTRACT
            .containers
            .labs

    );

}



function clearRuntimeContainer(
    container
) {

    container.innerHTML = "";

}



async function loadEngineeringCapabilities() {

    const registry =
        await loadLabsRegistry();

    const activeCapabilities =
        registry.labs.filter(
            (lab) => lab.enabled
        );

    const loadedCapabilities = [];

    for (const registryCapability of activeCapabilities) {

        const loadedCapability =
            await loadCapabilitySource(
                registryCapability
            );

        if (loadedCapability) {

            loadedCapabilities.push({

                ...loadedCapability,

                runtimePriority:
                    registryCapability.runtimePriority ||
                    "standard",

                registryMetadata:
                    registryCapability

            });

        }

    }

    return prioritizeCapabilities(
        loadedCapabilities
    );

}



async function loadLabsRegistry() {

    const response =
        await fetch(

            "/frontend/data/registry/labs.registry.json"

        );

    if (!response.ok) {

        throw new Error(
            "Failed loading capability registry."
        );

    }

    return await response.json();

}



async function loadCapabilitySource(
    capability
) {

    try {

        const response =
            await fetch(
                capability.source
            );

        if (!response.ok) {

            throw new Error(
                `Failed loading ${capability.source}`
            );

        }

        return await response.json();

    }

    catch (error) {

        LABS_STATE.failedLabs.push(
            capability.id
        );

        runtimeError(
            `Failed loading capability ${capability.id}`,
            error
        );

        return null;

    }

}



function prioritizeCapabilities(
    capabilities
) {

    const priorities = {

        hero: 0,
        featured: 1,
        standard: 2,
        experimental: 3

    };

    return [...capabilities].sort(

        (a, b) =>

            priorities[
                a.runtimePriority
            ] -

            priorities[
                b.runtimePriority
            ]

    );

}



async function progressivelyRenderCapabilities({

    container,
    capabilities

}) {

    for (const capability of capabilities) {

        await renderSingleCapability({

            container,
            capability

        });

    }

}



async function renderSingleCapability({

    container,
    capability

}) {

    await waitForRenderFrame();

    const component =
        createCapabilitySurface(
            capability
        );

    container.appendChild(
        component
    );

    requestAnimationFrame(
        () => {

            component.classList.add(
                "lab-card-visible"
            );

        }
    );

}



function createCapabilitySurface(
    capability
) {

    const card =
        document.createElement(
            "article"
        );

    card.className =
        buildCardClassname(
            capability
        );

    card.setAttribute(
        "tabindex",
        "0"
    );



    const header =
        createCapabilityHeader(
            capability
        );



    const narrative =
        createNarrativeSection(
            capability
        );



    const principles =
        createMetadataSection({

            title:
                "Highlights",

            items:
                limitItems(

                    capability
                        .architecturePrinciples || [],

                    5

                )

        });



    const stack =
        createMetadataSection({

            title:
                "Technology Stack",

            items:
                limitItems(

                    normalizeStack(
                        capability.stack || {}
                    ),

                    5

                )

        });



    const footer =
        createCapabilityFooter(
            capability
        );



    card.appendChild(
        header
    );

    if (narrative) {

        card.appendChild(
            narrative
        );

    }

    if (principles) {

        card.appendChild(
            principles
        );

    }

    if (stack) {

        card.appendChild(
            stack
        );

    }

    card.appendChild(
        footer
    );

    return card;

}



function createCapabilityHeader(
    capability
) {

    const header =
        document.createElement(
            "header"
        );

    header.className =
        "capability-header";



    if (capability.headline) {

        const headline =
            createTextElement(
                "span",
                capability.headline
            );

        headline.className =
            "capability-headline";

        header.appendChild(
            headline
        );

    }



    const classification =
        document.createElement(
            "div"
        );

    classification.className =
        "capability-classification";

    classification.appendChild(

        createBadge(

            capability.category ||
            "engineering-capability"

        )

    );

    classification.appendChild(

        createBadge(

            capability.domain ||
            "software-engineering"

        )

    );



    const title =
        createTextElement(
            "h3",
            capability.title
        );

    title.className =
        "capability-title";



    header.appendChild(
        classification
    );

    header.appendChild(
        title
    );

    return header;

}



function createNarrativeSection(
    capability
) {

    const narrative =
        capability.en ||
        capability.ptBr;

    if (!narrative) {

        return null;

    }

    const section =
        document.createElement(
            "section"
        );

    section.className =
        "capability-section";

    const paragraph =
        createTextElement(
            "p",
            narrative
        );

    paragraph.className =
        "capability-description";

    section.appendChild(
        paragraph
    );

    return section;

}



function createMetadataSection({

    title,
    items

}) {

    if (
        !items ||
        !items.length
    ) {

        return null;

    }

    const section =
        document.createElement(
            "section"
        );

    section.className =
        "capability-section";



    const heading =
        createTextElement(
            "h4",
            title
        );

    heading.className =
        "capability-section-title";



    const grid =
        document.createElement(
            "div"
        );

    grid.className =
        "capability-metadata-grid";



    items.forEach(
        (item) => {

            grid.appendChild(
                createMetadataChip(
                    item
                )
            );

        }
    );



    section.append(
        heading,
        grid
    );

    return section;

}



function createCapabilityFooter(
    capability
) {

    const footer =
        document.createElement(
            "footer"
        );

    footer.className =
        "capability-footer";



    const linksContainer =
        document.createElement(
            "div"
        );

    linksContainer.className =
        "capability-links";



    if (capability.repository) {

        const repository =
            document.createElement(
                "a"
            );

        repository.href =
            capability.repository;

        repository.target =
            "_blank";

        repository.rel =
            "noopener noreferrer";

        repository.className =
            "capability-link";

        repository.textContent =
            "Repository →";

        linksContainer.appendChild(
            repository
        );

    }



    if (
        capability.platformAccess
            ?.livePlatform
    ) {

        const platform =
            document.createElement(
                "a"
            );

        platform.href =
            capability
                .platformAccess
                .livePlatform;

        platform.target =
            "_blank";

        platform.rel =
            "noopener noreferrer";

        platform.className =
            "capability-link";

        platform.textContent =
            "Live Platform →";

        linksContainer.appendChild(
            platform
        );

    }



    footer.appendChild(
        linksContainer
    );

    return footer;

}



function createMetadataChip(
    content
) {

    const chip =
        document.createElement(
            "span"
        );

    chip.className =
        "capability-chip";

    chip.textContent =
        content;

    return chip;

}



function createBadge(
    content
) {

    const badge =
        document.createElement(
            "span"
        );

    badge.className =
        "capability-badge";

    badge.textContent =
        content;

    return badge;

}



function buildCardClassname(
    capability
) {

    return [

        "lab-card",

        `lab-card--${capability.runtimePriority}`

    ].join(" ");

}



function normalizeStack(
    stack
) {

    if (Array.isArray(stack)) {

        return stack;

    }

    return Object.values(
        stack
    ).flat();

}



function limitItems(
    items,
    limit
) {

    return items.slice(
        0,
        limit
    );

}



function createTextElement(
    tag,
    content
) {

    const element =
        document.createElement(
            tag
        );

    element.textContent =
        content;

    return element;

}



function synchronizeRendering(
    capabilities
) {

    LABS_STATE.loading =
        false;

    LABS_STATE.loaded =
        true;

    LABS_STATE.activeLabs =
        capabilities;

    LABS_STATE.totalLabs =
        capabilities.length;

    document.body.dataset.labsRuntime =
        "ready";

    RENDERING_STATE.renderedComponents.push(
        "labs-runtime"
    );

    window.dispatchEvent(

        new CustomEvent(
            "labs:rendered"
        )

    );

}



function runtimeError(

    message,
    error = null

) {

    console.error(

        `[Engineering Runtime] ${message}`,

        error || ""

    );

}



function waitForRenderFrame() {

    return new Promise(
        (resolve) => {

            requestAnimationFrame(
                () => resolve()
            );

        }
    );

}