document.addEventListener("DOMContentLoaded", () => {
    // 1. 스크롤 애니메이션 (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll(".fade-up");
    fadeElements.forEach((el) => observer.observe(el));

    // 2. Hero 자동 스와이프 슬라이더
    const track = document.querySelector(".hero-track");
    const slides = document.querySelectorAll(".hero-slide");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const indicators = document.querySelectorAll(".indicator");

    let currentIndex = 0;
    const slideCount = slides.length;
    const autoPlayDelay = 3500;
    let autoPlayTimer;

    function updateSlider(index) {
        if (index >= slideCount) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slideCount - 1;
        } else {
            currentIndex = index;
        }

        track.style.transform = `translateX(-${currentIndex * (100 / slideCount)}%)`;

        indicators.forEach((indicator, idx) => {
            if (idx === currentIndex) {
                indicator.classList.add("active");
            } else {
                indicator.classList.remove("active");
            }
        });
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayTimer = setInterval(() => {
            updateSlider(currentIndex + 1);
        }, autoPlayDelay);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
        }
    }

    nextBtn.addEventListener("click", () => {
        updateSlider(currentIndex + 1);
        startAutoPlay();
    });

    prevBtn.addEventListener("click", () => {
        updateSlider(currentIndex - 1);
        startAutoPlay();
    });

    indicators.forEach((indicator, idx) => {
        indicator.addEventListener("click", () => {
            updateSlider(idx);
            startAutoPlay();
        });
    });

    const heroSection = document.querySelector(".hero");
    heroSection.addEventListener("mouseenter", stopAutoPlay);
    heroSection.addEventListener("mouseleave", startAutoPlay);

    startAutoPlay();

    // 3. Process 영역 Swiper 설정 (여러 개의 스와이퍼를 각각 독립적으로 실행)
    const processSwipers = document.querySelectorAll(".process-swiper");
    const delays = [2000, 2300, 2800, 2500, 2300];

    processSwipers.forEach(function (swiperElement, index) {
        new Swiper(swiperElement, {
            effect: "slide",
            loop: true,
            centeredSlides: true,
            slidesPerView: 3,
            spaceBetween: 20,
            speed: 600,
            autoplay: {
                delay: delays[index],
                disableOnInteraction: false,
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });
    });
});
