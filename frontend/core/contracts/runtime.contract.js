/*
|--------------------------------------------------------------------------
| Operational Runtime Contract
|--------------------------------------------------------------------------
|
| Central operational runtime governance contract.
|
| Responsible for:
|
| - runtime orchestration
| - lifecycle governance
| - adaptive runtime behavior
| - rendering policies
| - navigation governance
| - perceptual synchronization
| - resilience contracts
|
|--------------------------------------------------------------------------
*/

export const RUNTIME_CONTRACT = {

    /*
    |--------------------------------------------------------------------------
    | Runtime Identity
    |--------------------------------------------------------------------------
    */

    runtime: {

        id:
            "operational-runtime",

        version:
            "2.0.0",

        architecture:
            "adaptive-operational-runtime",

        lifecycle:
            "staged-runtime-orchestration"

    },

    /*
    |--------------------------------------------------------------------------
    | Runtime Modes
    |--------------------------------------------------------------------------
    */

    modes: {

        desktop:
            "desktop-operational-runtime",

        mobile:
            "mobile-narrative-runtime",

        degraded:
            "degraded-runtime",

        recovery:
            "recovery-runtime"

    },

    /*
    |--------------------------------------------------------------------------
    | Rendering Contracts
    |--------------------------------------------------------------------------
    */

    rendering: {

        strategy:
            "progressive-hydration",

        renderingMode:
            "adaptive-rendering",

        hydration:
            "contextual-runtime-hydration",

        reveal:
            "progressive-perceptual-reveal"

    },

    /*
    |--------------------------------------------------------------------------
    | Navigation Contracts
    |--------------------------------------------------------------------------
    */

    navigation: {

        strategy:
            "contextual-operational-navigation",

        guidance:
            "adaptive-spatial-guidance",

        discoverability:
            "runtime-aware-discoverability",

        orientation:
            "spatial-awareness-navigation"

    },

    /*
    |--------------------------------------------------------------------------
    | Runtime Lifecycle Stages
    |--------------------------------------------------------------------------
    */

    stages: {

        idle:
            "runtime-idle",

        bootstrapping:
            "runtime-bootstrapping",

        initializing:
            "runtime-initializing",

        navigationReady:
            "navigation-ready",

        renderingReady:
            "rendering-ready",

        interactionReady:
            "interaction-ready",

        runtimeReady:
            "runtime-ready",

        degraded:
            "runtime-degraded",

        failure:
            "runtime-failure"

    },

    /*
    |--------------------------------------------------------------------------
    | Runtime Containers
    |--------------------------------------------------------------------------
    */

    containers: {

        labs:
            "labs-container",

        slider:
            "runtime-slider",

        navigation:
            "runtime-navigation",

        progress:
            "operational-progress"

    },

    /*
    |--------------------------------------------------------------------------
    | Runtime Paths
    |--------------------------------------------------------------------------
    */

    paths: {

        labs:
            "/frontend/data/labs/",

        templates:
            "/frontend/data/templates/",

        registry:
            "/frontend/data/registry/"

    },

    /*
    |--------------------------------------------------------------------------
    | Runtime Events
    |--------------------------------------------------------------------------
    */

    events: {

        runtimeReady:
            "runtime:ready",

        runtimeFailure:
            "runtime:failure",

        renderingReady:
            "rendering:ready",

        renderingFailure:
            "rendering:failure",

        navigationChanged:
            "navigation:changed",

        navigationReady:
            "navigation:ready",

        labsRendered:
            "labs:rendered",

        discoverabilityReady:
            "discoverability:ready"

    },

    /*
    |--------------------------------------------------------------------------
    | Perceptual Runtime Contracts
    |--------------------------------------------------------------------------
    */

    perceptualRuntime: {

        progressiveReveal:
            true,

        spatialAwareness:
            true,

        contextualGuidance:
            true,

        operationalDiscoverability:
            true

    },

    /*
    |--------------------------------------------------------------------------
    | Runtime Policies
    |--------------------------------------------------------------------------
    */

    runtimePolicies: {

        allowDynamicInjection:
            true,

        allowMutationRendering:
            true,

        strictRenderingValidation:
            false,

        allowProgressiveHydration:
            true,

        allowDeferredRendering:
            true,

        allowAdaptiveRuntime:
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

        allowRecoveryMode:
            true,

        allowModuleIsolation:
            true,

        retryFailedHydration:
            true

    }

};