document.addEventListener(
    "DOMContentLoaded",
    () => {

        const navigation = document.querySelector(
            ".navigation"
        );

        let lastScrollTime = Date.now();

        function showNavigation() {

            if (!navigation) {
                return;
            }

            navigation.style.opacity = "1";

            navigation.style.pointerEvents = "all";

            lastScrollTime = Date.now();
        }

        function hideNavigation() {

            if (!navigation) {
                return;
            }

            const elapsed =
                Date.now() - lastScrollTime;

            if (elapsed > 2500) {

                navigation.style.opacity = "0.2";
            }

        }

        document.addEventListener(
            "mousemove",
            showNavigation
        );

        document.addEventListener(
            "keydown",
            showNavigation
        );

        document.addEventListener(
            "touchstart",
            showNavigation
        );

        setInterval(
            hideNavigation,
            1000
        );

    }
);