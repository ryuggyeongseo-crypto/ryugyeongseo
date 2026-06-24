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
document.addEventListener("DOMContentLoaded", function () {
    const triggers = document.querySelectorAll(".video-trigger");
    const modal = document.getElementById("videoModal");
    const iframe = document.getElementById("youtubeIframe");
    const closeBtn = document.querySelector(".close-modal");

    // 1. 썸네일 클릭 시 팝업 열고 자동 재생
    triggers.forEach(function (trigger) {
        trigger.addEventListener("click", function () {
            const videoId = this.getAttribute("data-video-id");
            // autoplay=1을 붙여서 창이 열리면 바로 재생되게 만듭니다
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            modal.style.display = "flex";
        });
    });

    // 2. 팝업 닫기 및 영상 정지 함수
    function closeModal() {
        modal.style.display = "none";
        iframe.src = ""; // src를 비워주면 영상이 즉시 정지됩니다
    }

    // 3. X 버튼이나 검은 배경을 누르면 창 닫기
    closeBtn.addEventListener("click", closeModal);
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const processBlocks = document.querySelectorAll(".process-block");
    const navDots = document.querySelectorAll(".process-nav .dot");

    if (processBlocks.length === 0 || navDots.length === 0) return;

    // 화면에 50% 이상 보일 때 해당 섹션으로 인식하도록 설정
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // 1. 화면에 들어온 블록의 id를 가져옴 (예: step1)
                const currentId = entry.target.getAttribute("id");

                // 2. 모든 동그라미에서 active 클래스를 제거
                navDots.forEach((dot) => dot.classList.remove("active"));

                // 3. 현재 id와 일치하는 동그라미에만 active 클래스 추가 (색상 진하게)
                const activeDot = document.querySelector(`.process-nav .dot[href="#${currentId}"]`);
                if (activeDot) {
                    activeDot.classList.add("active");
                }
            }
        });
    }, observerOptions);

    // 모든 프로세스 블록을 감시하도록 설정
    processBlocks.forEach((block) => observer.observe(block));
});

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("detailModal");
    const triggerImg = document.querySelector(".modal-trigger");
    const closeBtn = document.querySelector(".close-btn");

    // 이미지를 클릭하면 모달 열기 (display: flex로 변경하여 중앙 정렬 활성화)
    triggerImg.addEventListener("click", () => {
        modal.style.display = "flex";
        // 모달 열릴 때마다 스크롤을 맨 위로 초기화
        modal.querySelector(".modal-content").scrollTop = 0;
    });

    // 닫기(X) 버튼을 누르면 모달 닫기
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // 모달창 밖의 어두운 배경을 클릭해도 닫히게 만들기
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
