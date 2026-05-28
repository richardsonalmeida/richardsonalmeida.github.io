/*
|--------------------------------------------------------------------------
| Adaptive Navigation Controller
|--------------------------------------------------------------------------
|
| Frontend navigation orchestration layer.
|
| Responsible for:
|
| - adaptive navigation behavior
| - spatial interface synchronization
| - desktop and mobile navigation flows
| - accessibility coordination
| - interaction lifecycle handling
| - perceptual navigation feedback
|
|--------------------------------------------------------------------------
*/

import { NAVIGATION_STATE }
from "../state/navigation.state.js";

import { RUNTIME_STATE }
from "../state/runtime.state.js";

/*
|--------------------------------------------------------------------------
| Runtime References
|--------------------------------------------------------------------------
*/

let slider = null;

let slides = [];

let prefersReducedMotion = false;

let isMobileRuntime = false;

let intersectionObserver = null;

/*
|--------------------------------------------------------------------------
| Initialization
|--------------------------------------------------------------------------
*/

export function initializeNavigation() {

    initializeRuntimeReferences();

    validateNavigationEnvironment();

    initializeAccessibility();

    initializeResponsiveNavigation();

    initializeKeyboardNavigation();

    initializeTouchNavigation();

    initializeResizeSynchronization();

    initializeIntersectionSynchronization();

    initializeProgressIndicators();

    synchronizeNavigation();

}

/*
|--------------------------------------------------------------------------
| Runtime References
|--------------------------------------------------------------------------
*/

function initializeRuntimeReferences() {

    slider =
        document.querySelector(
            ".slider-container"
        );

    slides = Array.from(

        document.querySelectorAll(
            ".slide"
        )

    );

    prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

}

/*
|--------------------------------------------------------------------------
| Runtime Validation
|--------------------------------------------------------------------------
*/

function validateNavigationEnvironment() {

    if (!slider || !slides.length) {

        throw new Error(
            "Navigation environment not found."
        );

    }

    NAVIGATION_STATE.totalSlides =
        slides.length;

    NAVIGATION_STATE.navigationReady =
        true;

}

/*
|--------------------------------------------------------------------------
| Responsive Navigation
|--------------------------------------------------------------------------
*/

function initializeResponsiveNavigation() {

    updateRuntimeMode();

    window.addEventListener(

        "resize",

        debounce(() => {

            updateRuntimeMode();

            synchronizeNavigation();

        }, 120),

        {
            passive: true
        }

    );

}

function updateRuntimeMode() {

    isMobileRuntime =
        window.innerWidth <= 768;

    document.body.dataset.runtimeMode =

        isMobileRuntime
            ? "mobile"
            : "desktop";

}

/*
|--------------------------------------------------------------------------
| Public Navigation API
|--------------------------------------------------------------------------
*/

export function moveSlide(direction) {

    moveToSlide(

        NAVIGATION_STATE.currentSlide +
        direction

    );

}

export function moveToSlide(index) {

    if (navigationLocked(index)) {

        return;

    }

    NAVIGATION_STATE.currentSlide =
        index;

    synchronizeNavigation();

    performNavigation(index);

}

/*
|--------------------------------------------------------------------------
| Navigation Guards
|--------------------------------------------------------------------------
*/

function navigationLocked(index) {

    return (

        index < 0 ||

        index >= slides.length ||

        NAVIGATION_STATE.navigationLocked

    );

}

/*
|--------------------------------------------------------------------------
| Navigation Execution
|--------------------------------------------------------------------------
*/

function performNavigation(index) {

    NAVIGATION_STATE.navigationLocked =
        true;

    const targetSlide =
        slides[index];

    if (!targetSlide) {

        releaseNavigationLock();

        return;

    }

    /*
    |--------------------------------------------------------------------------
    | Mobile Navigation
    |--------------------------------------------------------------------------
    */

    if (isMobileRuntime) {

        targetSlide.scrollIntoView({

            behavior:
                prefersReducedMotion
                    ? "auto"
                    : "smooth",

            block: "start"

        });

    }

    /*
    |--------------------------------------------------------------------------
    | Desktop Navigation
    |--------------------------------------------------------------------------
    */

    else {

        slider.scrollTo({

            left:
                slider.clientWidth * index,

            behavior:
                prefersReducedMotion
                    ? "auto"
                    : "smooth"

        });

    }

    releaseNavigationLock();

}

/*
|--------------------------------------------------------------------------
| Navigation Synchronization
|--------------------------------------------------------------------------
*/

function synchronizeNavigation() {

    slides.forEach(
        (slide, index) => {

            const isActive =

                index ===
                NAVIGATION_STATE.currentSlide;

            slide.classList.toggle(
                "active-slide",
                isActive
            );

            slide.setAttribute(
                "aria-hidden",
                !isActive
            );

        }
    );

    synchronizeProgressIndicators();

    dispatchNavigationEvent();

}


/*
|--------------------------------------------------------------------------
| Progress Indicator Initialization
|--------------------------------------------------------------------------
*/

function initializeProgressIndicators() {

    synchronizeProgressIndicators();

}

/*
|--------------------------------------------------------------------------
| Progress Indicators
|--------------------------------------------------------------------------
*/

function synchronizeProgressIndicators() {

    const indicators =

        document.querySelectorAll(
            ".operational-progress-dot"
        );

    indicators.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active",
                index ===
                NAVIGATION_STATE.currentSlide
            );

        }
    );

}

/*
|--------------------------------------------------------------------------
| Intersection Synchronization
|--------------------------------------------------------------------------
*/

function initializeIntersectionSynchronization() {

    intersectionObserver =
        new IntersectionObserver(

            handleIntersection,

            {
                threshold: 0.55
            }

        );

    slides.forEach(
        (slide) => {

            intersectionObserver.observe(
                slide
            );

        }
    );

}

function handleIntersection(entries) {

    entries.forEach(
        (entry) => {

            if (!entry.isIntersecting) {

                return;

            }

            const index =
                slides.indexOf(
                    entry.target
                );

            if (

                index === -1 ||

                index ===
                NAVIGATION_STATE.currentSlide

            ) {

                return;

            }

            NAVIGATION_STATE.currentSlide =
                index;

            synchronizeNavigation();

        }
    );

}

/*
|--------------------------------------------------------------------------
| Keyboard Navigation
|--------------------------------------------------------------------------
*/

function initializeKeyboardNavigation() {

    document.addEventListener(

        "keydown",

        handleKeyboardNavigation,

        {
            passive: true
        }

    );

}

function handleKeyboardNavigation(event) {

    if (isEditableTarget(event.target)) {

        return;

    }

    switch (event.key) {

        case "ArrowRight":

            if (!isMobileRuntime) {

                moveSlide(1);

            }

            break;

        case "ArrowLeft":

            if (!isMobileRuntime) {

                moveSlide(-1);

            }

            break;

    }

}

/*
|--------------------------------------------------------------------------
| Editable Elements
|--------------------------------------------------------------------------
*/

function isEditableTarget(target) {

    return target.matches(

        "input, textarea, select, [contenteditable]"

    );

}

/*
|--------------------------------------------------------------------------
| Touch Navigation
|--------------------------------------------------------------------------
*/

let touchStartX = 0;

let touchStartY = 0;

function initializeTouchNavigation() {

    slider.addEventListener(

        "touchstart",

        handleTouchStart,

        {
            passive: true
        }

    );

    slider.addEventListener(

        "touchend",

        handleTouchEnd,

        {
            passive: true
        }

    );

}

function handleTouchStart(event) {

    touchStartX =
        event.changedTouches[0].clientX;

    touchStartY =
        event.changedTouches[0].clientY;

}

function handleTouchEnd(event) {

    if (isMobileRuntime) {

        return;

    }

    const touchEndX =
        event.changedTouches[0].clientX;

    const touchEndY =
        event.changedTouches[0].clientY;

    const deltaX =
        touchStartX - touchEndX;

    const deltaY =
        touchStartY - touchEndY;

    /*
    |--------------------------------------------------------------------------
    | Ignore vertical gestures
    |--------------------------------------------------------------------------
    */

    if (

        Math.abs(deltaY) >
        Math.abs(deltaX)

    ) {

        return;

    }

    const minimumDistance = 60;

    if (

        Math.abs(deltaX) <
        minimumDistance

    ) {

        return;

    }

    if (deltaX > 0) {

        moveSlide(1);

    }

    else {

        moveSlide(-1);

    }

}

/*
|--------------------------------------------------------------------------
| Resize Synchronization
|--------------------------------------------------------------------------
*/

function initializeResizeSynchronization() {

    window.addEventListener(

        "resize",

        debounce(() => {

            synchronizeNavigation();

        }, 100),

        {
            passive: true
        }

    );

}


function initializeAccessibility() {

    slider.setAttribute(
        "role",
        "region"
    );

    slider.setAttribute(
        "aria-label",
        "Engineering capability navigation"
    );

}



function dispatchNavigationEvent() {

    window.dispatchEvent(

        new CustomEvent(

            "navigation:changed",

            {
                detail: {

                    currentSlide:
                        NAVIGATION_STATE.currentSlide,

                    totalSlides:
                        NAVIGATION_STATE.totalSlides,

                    runtimeMode:
                        isMobileRuntime
                            ? "mobile"
                            : "desktop"

                }
            }

        )

    );

}



function releaseNavigationLock() {

    setTimeout(
        () => {

            NAVIGATION_STATE.navigationLocked =
                false;

        },

        prefersReducedMotion
            ? 0
            : 380

    );

}



function debounce(callback, delay = 100) {

    let timeout;

    return (...args) => {

        clearTimeout(timeout);

        timeout = setTimeout(
            () => callback(...args),
            delay
        );

    };

}



window.moveSlide =
    moveSlide;
