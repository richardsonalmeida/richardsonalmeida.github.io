/*
|--------------------------------------------------------------------------
| Operational Rendering State
|--------------------------------------------------------------------------
|
| Central rendering synchronization state.
|
| Responsible for:
|
| - rendering lifecycle
| - progressive hydration
| - adaptive rendering
| - perceptual synchronization
| - rendering resilience
| - operational rendering orchestration
|
|--------------------------------------------------------------------------
*/

export const RENDERING_STATE = {

    /*
    |--------------------------------------------------------------------------
    | Core Rendering Lifecycle
    |--------------------------------------------------------------------------
    */

    rendering:
        false,

    renderingReady:
        false,

    renderingStage:
        "idle",

    synchronizationComplete:
        false,

    /*
    |--------------------------------------------------------------------------
    | Progressive Rendering
    |--------------------------------------------------------------------------
    */

    shellRendered:
        false,

    labsRendered:
        false,

    interactionReady:
        false,

    /*
    |--------------------------------------------------------------------------
    | Rendering Queues
    |--------------------------------------------------------------------------
    */

    renderingQueue:
        [],

    hydrationQueue:
        [],

    deferredQueue:
        [],

    /*
    |--------------------------------------------------------------------------
    | Rendering Registry
    |--------------------------------------------------------------------------
    */

    renderedComponents:
        [],

    renderedSections:
        [],

    renderedLabs:
        [],

    /*
    |--------------------------------------------------------------------------
    | Runtime Awareness
    |--------------------------------------------------------------------------
    */

    runtimeEnvironment:
        "desktop",

    renderingMode:
        "progressive",

    reducedMotion:
        false,

    lowPowerMode:
        false,

    deferredRendering:
        false,

    /*
    |--------------------------------------------------------------------------
    | Perceptual Rendering
    |--------------------------------------------------------------------------
    */

    perceptualSynchronization:
        false,

    progressiveReveal:
        true,

    visualPacing:
        "balanced",

    cognitiveDensity:
        "moderate",

    /*
    |--------------------------------------------------------------------------
    | Rendering Performance
    |--------------------------------------------------------------------------
    */

    lastRenderTimestamp:
        null,

    renderCycles:
        0,

    averageRenderDuration:
        0,

    /*
    |--------------------------------------------------------------------------
    | Mutation Runtime
    |--------------------------------------------------------------------------
    */

    mutationLock:
        false,

    activeMutations:
        0,

    /*
    |--------------------------------------------------------------------------
    | Rendering Resilience
    |--------------------------------------------------------------------------
    */

    degradedRendering:
        false,

    recoveryMode:
        false,

    failedRenders:
        [],

    retryAttempts:
        0

};