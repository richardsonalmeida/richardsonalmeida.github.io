import { RUNTIME_STATE }
from "../state/runtime.state.js";

import { initializeRuntime }
from "./runtime.controller.js";

import { initializeSeo }
from "../seo/seo.controller.js";


document.addEventListener(

    "DOMContentLoaded",

    async () => {

        await bootstrapEngineeringPlatform();

    }

);



async function bootstrapEngineeringPlatform() {

    try {

        initializeBootstrapState();

        synchronizeEnvironment();

        await initializeApplicationRuntime();

        finalizePlatformBootstrap();

    }

    catch (error) {

        handlePlatformFailure(error);

    }

}



/*
|--------------------------------------------------------------------------
| Bootstrap State
|--------------------------------------------------------------------------
*/

function initializeBootstrapState() {

    RUNTIME_STATE.bootstrapping =
        true;

    RUNTIME_STATE.runtimeReady =
        false;

    document.body.dataset.runtime =
        "bootstrapping";

    document.body.classList.add(
        "runtime-bootstrapping"
    );

}



/*
|--------------------------------------------------------------------------
| Environment Synchronization
|--------------------------------------------------------------------------
*/

function synchronizeEnvironment() {

    const runtimeMode =

        window.innerWidth <= 768
            ? "mobile"
            : "desktop";

    document.body.dataset.runtimeMode =
        runtimeMode;

    document.body.dataset.motionMode =

        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches

            ? "reduced-motion"

            : "standard-motion";

}



/*
|--------------------------------------------------------------------------
| Runtime Initialization
|--------------------------------------------------------------------------
*/

async function initializeApplicationRuntime() {

    /*
    |--------------------------------------------------------------------------
    | Semantic SEO Layer
    |--------------------------------------------------------------------------
    */

    await initializeSeo();

    /*
    |--------------------------------------------------------------------------
    | Runtime Rendering Layer
    |--------------------------------------------------------------------------
    */

    await nextFrame();

    await initializeRuntime();

}



/*
|--------------------------------------------------------------------------
| Runtime Finalization
|--------------------------------------------------------------------------
*/

function finalizePlatformBootstrap() {

    RUNTIME_STATE.bootstrapping =
        false;

    RUNTIME_STATE.runtimeReady =
        true;

    document.body.dataset.runtime =
        "ready";

    document.body.classList.remove(
        "runtime-bootstrapping"
    );

    document.body.classList.add(
        "runtime-ready"
    );

    dispatchRuntimeReadyEvent();

}



/*
|--------------------------------------------------------------------------
| Runtime Failure Handling
|--------------------------------------------------------------------------
*/

function handlePlatformFailure(error) {

    console.error(
        "[Engineering Platform Failure]",
        error
    );

    RUNTIME_STATE.bootstrapping =
        false;

    RUNTIME_STATE.runtimeReady =
        false;

    document.body.dataset.runtime =
        "runtime-failure";

    document.body.classList.remove(
        "runtime-bootstrapping"
    );

    document.body.classList.add(
        "runtime-failure"
    );

    dispatchRuntimeFailureEvent(error);

}



/*
|--------------------------------------------------------------------------
| Runtime Events
|--------------------------------------------------------------------------
*/

function dispatchRuntimeReadyEvent() {

    window.dispatchEvent(

        new CustomEvent(
            "runtime:ready"
        )

    );

}



function dispatchRuntimeFailureEvent(error) {

    window.dispatchEvent(

        new CustomEvent(

            "runtime:failure",

            {
                detail: {
                    error
                }
            }

        )

    );

}



/*
|--------------------------------------------------------------------------
| Frame Synchronization
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