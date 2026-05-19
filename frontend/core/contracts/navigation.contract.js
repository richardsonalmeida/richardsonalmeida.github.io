/*
|--------------------------------------------------------------------------
| Operational Navigation Contract
|--------------------------------------------------------------------------
|
| Central operational navigation governance contract.
|
| Responsible for:
|
| - adaptive navigation behavior
| - spatial awareness governance
| - contextual navigation
| - discoverability orchestration
| - narrative runtime behavior
| - operational guidance
|
|--------------------------------------------------------------------------
*/

export const NAVIGATION_CONTRACT = {

    /*
    |--------------------------------------------------------------------------
    | Runtime Navigation Modes
    |--------------------------------------------------------------------------
    */

    navigation: {

        desktopMode:
            "desktop-operational-navigation",

        mobileMode:
            "mobile-narrative-navigation",

        degradedMode:
            "degraded-navigation-runtime",

        navigationStrategy:
            "contextual-runtime-navigation"

    },

    /*
    |--------------------------------------------------------------------------
    | Navigation Runtime
    |--------------------------------------------------------------------------
    */

    runtime: {

        loop:
            false,

        keyboardSupport:
            true,

        touchSupport:
            true,

        gestureSupport:
            true,

        contextualGuidance:
            true

    },

    /*
    |--------------------------------------------------------------------------
    | Spatial Awareness
    |--------------------------------------------------------------------------
    */

    spatialAwareness: {

        enabled:
            true,

        progressIndicators:
            true,

        sectionIndicators:
            true,

        operationalMinimap:
            false,

        progressTracking:
            true

    },

    /*
    |--------------------------------------------------------------------------
    | Discoverability Runtime
    |--------------------------------------------------------------------------
    */

    discoverability: {

        onboardingEnabled:
            true,

        contextualHints:
            true,

        progressiveGuidance:
            true,

        operationalOrientation:
            true

    },

    /*
    |--------------------------------------------------------------------------
    | Navigation States
    |--------------------------------------------------------------------------
    */

    states: {

        active:
            "active-slide",

        inactive:
            "inactive-slide",

        contextual:
            "contextual-slide",

        transitioning:
            "transitioning-slide",

        explored:
            "explored-slide",

        onboarding:
            "onboarding-slide",

        degraded:
            "degraded-navigation"

    },

    /*
    |--------------------------------------------------------------------------
    | Runtime Events
    |--------------------------------------------------------------------------
    */

    events: {

        next:
            "navigation:next",

        previous:
            "navigation:previous",

        changed:
            "navigation:changed",

        sectionChanged:
            "navigation:section-changed",

        progressUpdated:
            "navigation:progress-updated",

        guidanceUpdated:
            "navigation:guidance-updated",

        visibilityChanged:
            "navigation:visibility-changed",

        runtimeModeChanged:
            "navigation:runtime-mode-changed"

    },

    /*
    |--------------------------------------------------------------------------
    | Navigation Policies
    |--------------------------------------------------------------------------
    */

    policies: {

        allowNarrativeRuntime:
            true,

        allowContextualNavigation:
            true,

        allowAdaptiveRuntime:
            true,

        allowProgressiveDiscoverability:
            true

    },

    /*
    |--------------------------------------------------------------------------
    | Resilience Contracts
    |--------------------------------------------------------------------------
    */

    resilience: {

        allowGracefulFallback:
            true,

        allowNavigationRecovery:
            true,

        allowInputIsolation:
            true

    }

};