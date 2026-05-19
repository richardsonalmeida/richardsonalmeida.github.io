/*
|--------------------------------------------------------------------------
| Operational Labs State
|--------------------------------------------------------------------------
|
| Central engineering laboratories runtime state.
|
| Responsible for:
|
| - laboratory orchestration
| - progressive hydration
| - exploratory runtime
| - discoverability
| - perceptual sequencing
| - adaptive rendering
| - operational grouping
|
|--------------------------------------------------------------------------
*/

export const LABS_STATE = {

    /*
    |--------------------------------------------------------------------------
    | Core Runtime Lifecycle
    |--------------------------------------------------------------------------
    */

    loaded:
        false,

    loading:
        false,

    hydrationComplete:
        false,

    synchronizationComplete:
        false,

    /*
    |--------------------------------------------------------------------------
    | Registry Runtime
    |--------------------------------------------------------------------------
    */

    registryLoaded:
        false,

    registryVersion:
        null,

    /*
    |--------------------------------------------------------------------------
    | Laboratory Collections
    |--------------------------------------------------------------------------
    */

    activeLabs:
        [],

    renderedLabs:
        [],

    failedLabs:
        [],

    deferredLabs:
        [],

    featuredLabs:
        [],

    experimentalLabs:
        [],

    /*
    |--------------------------------------------------------------------------
    | Runtime Tracking
    |--------------------------------------------------------------------------
    */

    totalLabs:
        0,

    visibleLabs:
        [],

    exploredLabs:
        [],

    prioritizedLabs:
        [],

    lastLoadedLab:
        null,

    lastExploredLab:
        null,

    /*
    |--------------------------------------------------------------------------
    | Discoverability Runtime
    |--------------------------------------------------------------------------
    */

    discoverabilityReady:
        false,

    onboardingLabsVisible:
        false,

    progressiveReveal:
        true,

    explorationMode:
        "guided",

    /*
    |--------------------------------------------------------------------------
    | Perceptual Runtime
    |--------------------------------------------------------------------------
    */

    perceptualSequencing:
        true,

    cognitiveDensity:
        "moderate",

    visualPacing:
        "balanced",

    contextualGrouping:
        true,

    /*
    |--------------------------------------------------------------------------
    | Runtime Awareness
    |--------------------------------------------------------------------------
    */

    runtimeEnvironment:
        "desktop",

    reducedMotion:
        false,

    deferredHydration:
        false,

    lazyRendering:
        true,

    /*
    |--------------------------------------------------------------------------
    | Runtime Resilience
    |--------------------------------------------------------------------------
    */

    degradedMode:
        false,

    recoveryMode:
        false,

    hydrationFailures:
        [],

    retryAttempts:
        0

};