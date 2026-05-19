/*
|--------------------------------------------------------------------------
| Operational Runtime State
|--------------------------------------------------------------------------
|
| Central operational runtime state.
|
| Responsible for:
|
| - runtime lifecycle
| - adaptive runtime behavior
| - operational synchronization
| - perceptual coordination
| - rendering orchestration
| - navigation awareness
| - runtime resilience
|
|--------------------------------------------------------------------------
*/

export const RUNTIME_STATE = {

    /*
    |--------------------------------------------------------------------------
    | Core Runtime Lifecycle
    |--------------------------------------------------------------------------
    */

    initialized:
        false,

    runtimeReady:
        false,

    bootstrapping:
        false,

    synchronizationComplete:
        false,

    runtimeStage:
        "idle",

    /*
    |--------------------------------------------------------------------------
    | Runtime Modes
    |--------------------------------------------------------------------------
    */

    currentMode:
        "slide-runtime",

    runtimeEnvironment:
        "desktop",

    navigationMode:
        "operational",

    renderingMode:
        "progressive",

    interactionMode:
        "standard",

    /*
    |--------------------------------------------------------------------------
    | Accessibility Runtime
    |--------------------------------------------------------------------------
    */

    reducedMotion:
        false,

    touchRuntime:
        false,

    keyboardNavigation:
        true,

    /*
    |--------------------------------------------------------------------------
    | Runtime Identity
    |--------------------------------------------------------------------------
    */

    currentTheme:
        "operational",

    runtimeVersion:
        "2.0.0",

    /*
    |--------------------------------------------------------------------------
    | Rendering Runtime
    |--------------------------------------------------------------------------
    */

    renderingActive:
        false,

    renderingReady:
        false,

    renderingStage:
        "idle",

    renderedModules:
        [],

    /*
    |--------------------------------------------------------------------------
    | Navigation Runtime
    |--------------------------------------------------------------------------
    */

    navigationReady:
        false,

    currentSlide:
        0,

    totalSlides:
        0,

    spatialAwareness:
        true,

    navigationVisible:
        true,

    /*
    |--------------------------------------------------------------------------
    | Runtime Registry
    |--------------------------------------------------------------------------
    */

    registryLoaded:
        false,

    activeModules:
        [],

    /*
    |--------------------------------------------------------------------------
    | Runtime Resilience
    |--------------------------------------------------------------------------
    */

    degradedMode:
        false,

    recoveryMode:
        false,

    runtimeFailure:
        false,

    failedModules:
        [],

    /*
    |--------------------------------------------------------------------------
    | UX Runtime Intelligence
    |--------------------------------------------------------------------------
    */

    discoverabilityReady:
        false,

    perceptualSynchronization:
        false,

    narrativeRuntime:
        false,

    contextualGuidance:
        true

};