

import { RUNTIME_STATE }
from "../state/runtime.state.js";

import { initializeNavigation }
from "../navigation/navigation.controller.js";

import { initializeRendering }
from "../rendering/rendering.controller.js";



export async function initializeRuntime() {

    try {

        initializePlatformLifecycle();

        await initializePlatformModules();

        finalizeRuntimeInitialization();

    }

    catch (error) {

        handlePlatformFailure(error);

    }

}



function initializePlatformLifecycle() {

    updateRuntimeStage(
        "initializing"
    );

    synchronizeEnvironment();

}



function synchronizeEnvironment() {

    const runtimeMode =

        window.innerWidth <= 768
            ? "mobile"
            : "desktop";

    const motionMode =

        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches

            ? "reduced-motion"

            : "standard-motion";

    document.body.dataset.runtimeMode =
        runtimeMode;

    document.body.dataset.motionMode =
        motionMode;

}



async function initializePlatformModules() {

 

    await safelyInitializeModule({

        moduleName:
            "navigation",

        initialize:
            async () => {

                initializeNavigation();

            }

    });

  

    await safelyInitializeModule({

        moduleName:
            "rendering",

        initialize:
            async () => {

                await initializeRendering();

            }

    });

}



async function safelyInitializeModule({

    moduleName,

    initialize

}) {

    try {

        updateRuntimeStage(
            `${moduleName}-initializing`
        );

        await initialize();

        markModuleReady(
            moduleName
        );

    }

    catch (error) {

        handleModuleFailure({

            moduleName,
            error

        });

    }

}



function markModuleReady(moduleName) {

    RUNTIME_STATE[
        `${moduleName}Ready`
    ] = true;

    dispatchRuntimeEvent(

        `${moduleName}:ready`

    );

}



function finalizeRuntimeInitialization() {

    updateRuntimeStage(
        "ready"
    );

    RUNTIME_STATE.initialized =
        true;

    RUNTIME_STATE.runtimeReady =
        true;

    RUNTIME_STATE.bootstrapping =
        false;

    RUNTIME_STATE.synchronizationComplete =
        true;

    document.body.classList.add(
        "runtime-ready"
    );

    dispatchRuntimeEvent(
        "runtime:ready"
    );

}


function handlePlatformFailure(error) {

    console.error(

        "[Frontend Platform Failure]",

        error

    );

    updateRuntimeStage(
        "runtime-failure"
    );

    document.body.classList.add(
        "runtime-failure"
    );

    dispatchRuntimeEvent(

        "runtime:failure",

        {
            error
        }

    );

}



function handleModuleFailure({

    moduleName,
    error

}) {

    console.error(

        `[${moduleName}] Platform Failure`,

        error

    );

    RUNTIME_STATE[
        `${moduleName}Failed`
    ] = true;

  

    document.body.classList.add(
        `${moduleName}-degraded`
    );

    dispatchRuntimeEvent(

        `${moduleName}:failure`,

        {
            moduleName,
            error
        }

    );

}



function updateRuntimeStage(stage) {

    RUNTIME_STATE.runtimeStage =
        stage;

    document.body.dataset.runtimeStage =
        stage;

}



function dispatchRuntimeEvent(
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