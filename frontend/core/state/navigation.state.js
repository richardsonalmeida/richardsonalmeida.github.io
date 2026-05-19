/*
|--------------------------------------------------------------------------
| Operational Navigation State
|--------------------------------------------------------------------------
|
| Central operational navigation state.
|
| Responsible for:
|
| - spatial awareness
| - adaptive navigation
| - contextual guidance
| - navigation synchronization
| - perceptual orientation
| - interaction tracking
|
|--------------------------------------------------------------------------
*/

export const NAVIGATION_STATE = {

    /*
    |--------------------------------------------------------------------------
    | Core Navigation
    |--------------------------------------------------------------------------
    */

    currentSlide:
        0,

    totalSlides:
        0,

    activeSection:
        null,

    previousSection:
        null,

    navigationDirection:
        null,

    /*
    |--------------------------------------------------------------------------
    | Navigation Lifecycle
    |--------------------------------------------------------------------------
    */

    navigationReady:
        false,

    navigationLocked:
        false,

    synchronizationComplete:
        false,

    /*
    |--------------------------------------------------------------------------
    | Runtime Navigation Modes
    |--------------------------------------------------------------------------
    */

    runtimeMode:
        "desktop-operational",

    navigationMode:
        "contextual",

    narrativeMode:
        false,

    /*
    |--------------------------------------------------------------------------
    | Input Runtime
    |--------------------------------------------------------------------------
    */

    allowKeyboardNavigation:
        true,

    allowTouchNavigation:
        true,

    allowGestureNavigation:
        true,

    touchRuntime:
        false,

    keyboardRuntime:
        true,

    /*
    |--------------------------------------------------------------------------
    | Spatial Awareness
    |--------------------------------------------------------------------------
    */

    spatialAwareness:
        true,

    progressVisible:
        true,

    sectionIndicatorsVisible:
        true,

    currentProgress:
        0,

    /*
    |--------------------------------------------------------------------------
    | Discoverability
    |--------------------------------------------------------------------------
    */

    discoverabilityReady:
        false,

    navigationHintsVisible:
        true,

    onboardingComplete:
        false,

    /*
    |--------------------------------------------------------------------------
    | Interaction Tracking
    |--------------------------------------------------------------------------
    */

    userNavigating:
        false,

    userReading:
        false,

    interactionActive:
        false,

    lastInteractionType:
        null,

    /*
    |--------------------------------------------------------------------------
    | Contextual Navigation
    |--------------------------------------------------------------------------
    */

    navigationVisible:
        true,

    contextualGuidance:
        true,

    activeGesture:
        null,

    /*
    |--------------------------------------------------------------------------
    | Runtime Resilience
    |--------------------------------------------------------------------------
    */

    degradedNavigation:
        false,

    recoveryMode:
        false,

    failedTransitions:
        0

};