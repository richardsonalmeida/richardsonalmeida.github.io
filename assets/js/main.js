document.addEventListener(
    "DOMContentLoaded",
    () => {

        const slider = document.querySelector(
            ".slider-container"
        );

        const slides = document.querySelectorAll(
            ".slide"
        );

        const totalSlides = slides.length;

        let currentSlide = 0;

        function updateSlider() {

            slider.style.transform =
                `translateX(-${currentSlide * 100}vw)`;

            updateActiveSlide();
        }

        function updateActiveSlide() {

            slides.forEach(
                (slide, index) => {

                    slide.classList.remove(
                        "active-slide"
                    );

                    if (index === currentSlide) {

                        slide.classList.add(
                            "active-slide"
                        );
                    }

                }
            );

        }

        window.moveSlide = function(direction) {

            currentSlide += direction;

            if (currentSlide < 0) {

                currentSlide = 0;
            }

            if (currentSlide >= totalSlides) {

                currentSlide = totalSlides - 1;
            }

            updateSlider();
        };

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "ArrowRight"
                ) {

                    moveSlide(1);
                }

                if (
                    event.key === "ArrowLeft"
                ) {

                    moveSlide(-1);
                }

            }
        );

        let touchStartX = 0;

        let touchEndX = 0;

        document.addEventListener(
            "touchstart",
            (event) => {

                touchStartX =
                    event.changedTouches[0].screenX;
            }
        );

        document.addEventListener(
            "touchend",
            (event) => {

                touchEndX =
                    event.changedTouches[0].screenX;

                handleGesture();
            }
        );

        function handleGesture() {

            const distance =
                touchStartX - touchEndX;

            if (distance > 70) {

                moveSlide(1);
            }

            if (distance < -70) {

                moveSlide(-1);
            }

        }

        updateSlider();

    }
);