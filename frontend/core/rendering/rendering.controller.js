/*
|--------------------------------------------------------------------------
| Engineering Rendering Controller
|--------------------------------------------------------------------------
|
| Responsible for:
|
| - engineering capability rendering
| - rendering lifecycle orchestration
| - adaptive rendering pipelines
| - progressive capability hydration
| - rendering synchronization
| - frontend rendering resilience
|
|--------------------------------------------------------------------------
*/

import { RENDERING_STATE }
from "../state/rendering.state.js";

import { LABS_STATE }
from "../state/labs.state.js";

import { renderLabsRuntime }
from "./lab-renderer.js";

/*
|--------------------------------------------------------------------------
| Rendering Initialization
|--------------------------------------------------------------------------
*/

export async function initializeRendering() {

    try {

        initializeRenderingLifecycle();

        await initializeRenderingPipeline();

        finalizeRenderingLifecycle();

    }

    catch (error) {

        handleRenderingFailure(error);

    }

}

/*
|--------------------------------------------------------------------------
| Rendering Lifecycle
|--------------------------------------------------------------------------
*/

function initializeRenderingLifecycle() {

    RENDERING_STATE.rendering =
        true;

    RENDERING_STATE.renderingReady =
        false;

    updateRenderingStage(
        "initializing"
    );

    document.body.classList.add(
        "platform-rendering"
    );

}

/*
|--------------------------------------------------------------------------
| Rendering Pipeline
|--------------------------------------------------------------------------
*/

async function initializeRenderingPipeline() {

    /*
    |--------------------------------------------------------------------------
    | Platform Shell
    |--------------------------------------------------------------------------
    */

    await renderPlatformShell();

    /*
    |--------------------------------------------------------------------------
    | Engineering Capabilities
    |--------------------------------------------------------------------------
    */

    await renderEngineeringCapabilities();

}

/*
|--------------------------------------------------------------------------
| Platform Shell Rendering
|--------------------------------------------------------------------------
*/

async function renderPlatformShell() {

    updateRenderingStage(
        "platform-shell-ready"
    );

    await nextFrame();

    dispatchRenderingEvent(
        "rendering:shell-ready"
    );

}

/*
|--------------------------------------------------------------------------
| Engineering Capability Rendering
|--------------------------------------------------------------------------
*/

async function renderEngineeringCapabilities() {

    updateRenderingStage(
        "capabilities-rendering"
    );

    /*
    |--------------------------------------------------------------------------
    | Adaptive Mobile Rendering
    |--------------------------------------------------------------------------
    */

    if (isMobileRuntime()) {

        await renderDeferredCapabilities();

        return;

    }

    await renderLabsRuntime();

    LABS_STATE.loaded =
        true;

    dispatchRenderingEvent(
        "rendering:capabilities-ready"
    );

}

/*
|--------------------------------------------------------------------------
| Deferred Capability Rendering
|--------------------------------------------------------------------------
*/

async function renderDeferredCapabilities() {

    /*
    |--------------------------------------------------------------------------
    | Reduce initial rendering pressure
    |--------------------------------------------------------------------------
    */

    await idleFrame();

    await renderLabsRuntime();

    LABS_STATE.loaded =
        true;

    dispatchRenderingEvent(
        "rendering:capabilities-ready"
    );

}

/*
|--------------------------------------------------------------------------
| Rendering Finalization
|--------------------------------------------------------------------------
*/

function finalizeRenderingLifecycle() {

    RENDERING_STATE.rendering =
        false;

    RENDERING_STATE.renderingReady =
        true;

    updateRenderingStage(
        "ready"
    );

    document.body.classList.remove(
        "platform-rendering"
    );

    document.body.classList.add(
        "rendering-ready"
    );

    dispatchRenderingEvent(
        "rendering:ready"
    );

}

/*
|--------------------------------------------------------------------------
| Rendering Failure
|--------------------------------------------------------------------------
*/

function handleRenderingFailure(error) {

    console.error(

        "[Engineering Rendering Failure]",

        error

    );

    RENDERING_STATE.rendering =
        false;

    RENDERING_STATE.renderingReady =
        false;

    updateRenderingStage(
        "failure"
    );

    document.body.classList.add(
        "rendering-failure"
    );

    dispatchRenderingEvent(

        "rendering:failure",

        {
            error
        }

    );

}

/*
|--------------------------------------------------------------------------
| Rendering Stage
|--------------------------------------------------------------------------
*/

function updateRenderingStage(stage) {

    RENDERING_STATE.stage =
        stage;

    document.body.dataset.renderingStage =
        stage;

}

/*
|--------------------------------------------------------------------------
| Runtime Detection
|--------------------------------------------------------------------------
*/

function isMobileRuntime() {

    return window.innerWidth <= 768;

}

/*
|--------------------------------------------------------------------------
| Rendering Events
|--------------------------------------------------------------------------
*/

function dispatchRenderingEvent(
    eventName,
    detail = {}
) {

    window.dispatchEvent(

        new CustomEvent(

            eventName,

            {
                detail
            }

        )

    );

}

/*
|--------------------------------------------------------------------------
| Utilities
|--------------------------------------------------------------------------
*/

function nextFrame() {

    return new Promise(
        (resolve) => {

            requestAnimationFrame(
                () => resolve()
            );

        }
    );

}

function idleFrame() {

    return new Promise(
        (resolve) => {

            if (

                "requestIdleCallback" in
                window

            ) {

                requestIdleCallback(
                    () => resolve()
                );

                return;

            }

            setTimeout(
                () => resolve(),
                80
            );

        }
    );

}