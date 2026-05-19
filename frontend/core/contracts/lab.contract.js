/*
|--------------------------------------------------------------------------
| Operational Laboratory Contract
|--------------------------------------------------------------------------
|
| Central operational laboratory governance contract.
|
| Responsible for:
|
| - laboratory schema governance
| - exploratory runtime behavior
| - discoverability orchestration
| - perceptual sequencing
| - adaptive rendering contracts
| - operational grouping
|
|--------------------------------------------------------------------------
*/

export const LAB_CONTRACT = {

    /*
    |--------------------------------------------------------------------------
    | Structural Runtime
    |--------------------------------------------------------------------------
    */

    required: [

        "id",
        "title",
        "description",
        "stack",
        "repository"

    ],

    optional: [

        "status",
        "category",
        "tags",
        "thumbnail",
        "documentation",

        /*
        |--------------------------------------------------------------------------
        | Runtime Intelligence
        |--------------------------------------------------------------------------
        */

        "priority",
        "runtimeMode",
        "featured",
        "experimental",
        "discoverability",

        /*
        |--------------------------------------------------------------------------
        | Perceptual Runtime
        |--------------------------------------------------------------------------
        */

        "visualWeight",
        "cognitiveDensity",
        "narrativeGroup",
        "revealPriority",

        /*
        |--------------------------------------------------------------------------
        | Rendering Runtime
        |--------------------------------------------------------------------------
        */

        "deferredHydration",
        "lazyRender",
        "progressiveReveal"

    ],

    /*
    |--------------------------------------------------------------------------
    | Type Governance
    |--------------------------------------------------------------------------
    */

    types: {

        id:
            "string",

        title:
            "string",

        description:
            "string",

        stack:
            "array",

        repository:
            "string",

        priority:
            "string",

        featured:
            "boolean",

        experimental:
            "boolean",

        visualWeight:
            "string",

        cognitiveDensity:
            "string",

        revealPriority:
            "number"

    },

    /*
    |--------------------------------------------------------------------------
    | Discoverability Governance
    |--------------------------------------------------------------------------
    */

    discoverability: {

        allowFeaturedLabs:
            true,

        allowExploratoryLabs:
            true,

        allowOnboardingLabs:
            true,

        allowContextualLabs:
            true

    },

    /*
    |--------------------------------------------------------------------------
    | Perceptual Sequencing
    |--------------------------------------------------------------------------
    */

    perceptualRuntime: {

        progressiveReveal:
            true,

        contextualGrouping:
            true,

        visualHierarchy:
            true,

        cognitivePacing:
            true

    },

    /*
    |--------------------------------------------------------------------------
    | Rendering Contracts
    |--------------------------------------------------------------------------
    */

    rendering: {

        allowDeferredHydration:
            true,

        allowLazyRendering:
            true,

        allowAdaptiveRendering:
            true,

        allowProgressiveHydration:
            true

    },

    /*
    |--------------------------------------------------------------------------
    | Adaptive Runtime
    |--------------------------------------------------------------------------
    */

    runtime: {

        mobileSupport:
            true,

        desktopSupport:
            true,

        reducedMotionSupport:
            true,

        lowPowerRuntime:
            true

    },

    /*
    |--------------------------------------------------------------------------
    | Lifecycle Governance
    |--------------------------------------------------------------------------
    */

    lifecycle: {

        initialize:
            true,

        hydrate:
            true,

        reveal:
            true,

        suspend:
            true,

        recover:
            true,

        destroy:
            true

    },

    /*
    |--------------------------------------------------------------------------
    | Validation Runtime
    |--------------------------------------------------------------------------
    */

    validation: {

        allowEmptyStack:
            false,

        allowMissingRepository:
            false,

        strictHydrationValidation:
            false,

        allowPartialRendering:
            true

    },

    /*
    |--------------------------------------------------------------------------
    | Resilience Contracts
    |--------------------------------------------------------------------------
    */

    resilience: {

        allowGracefulDegradation:
            true,

        allowFallbackRendering:
            true,

        allowHydrationRecovery:
            true,

        allowRetryHydration:
            true

    }

};