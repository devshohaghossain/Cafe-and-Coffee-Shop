document.addEventListener("DOMContentLoaded", function () {

    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);


    /* =========================================================
       CAFE CARDS
    ========================================================= */

    const cafeSection = document.querySelector("#cafe-cards")?.closest("section");
    const cafeCards = gsap.utils.toArray("#cafe-cards .cafe-card");

    if (cafeSection && cafeCards.length) {

        gsap.set(cafeCards, {
            opacity: 0,
            y: 60,
            scale: 0.96
        });

        const cafeTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: cafeSection,
                start: "top top",
                end: "+=" + (cafeCards.length * 500),
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        });

        cafeCards.forEach(function (card) {

            cafeTimeline.to(card, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power3.out"
            });

            cafeTimeline.to({}, {
                duration: 1
            });

        });
    }


    /* =========================================================
       HERO TITLE
    ========================================================= */

    document.querySelectorAll(".hero-title").forEach(function (title) {

        if (title.dataset.animated === "true") return;

        title.dataset.animated = "true";

        const walker = document.createTreeWalker(
            title,
            NodeFilter.SHOW_TEXT
        );

        const textNodes = [];

        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach(function (node) {

            const text = node.textContent;
            const fragment = document.createDocumentFragment();

            text.split(/(\s+)/).forEach(function (part) {

                if (/^\s+$/.test(part)) {
                    fragment.appendChild(
                        document.createTextNode(part)
                    );
                    return;
                }

                const word = document.createElement("span");

                word.className = "hero-word";
                word.style.display = "inline-block";
                word.style.whiteSpace = "nowrap";

                [...part].forEach(function (char) {

                    const span = document.createElement("span");

                    span.className = "hero-char";
                    span.textContent = char;
                    span.style.display = "inline-block";

                    word.appendChild(span);

                });

                fragment.appendChild(word);

            });

            node.parentNode.replaceChild(fragment, node);

        });


        const chars = title.querySelectorAll(".hero-char");

        gsap.set(chars, {
            scale: () => gsap.utils.random(0.7, 1.3),
            opacity: 0,
            transformOrigin: "center center"
        });

        gsap.to(chars, {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
            stagger: 0.05,

            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                toggleActions: "play none none none",
                invalidateOnRefresh: true
            }
        });

    });


    /* =========================================================
       DIVIDER
    ========================================================= */

    gsap.utils.toArray(".divider-s1").forEach(function (divider) {

        gsap.fromTo(
            divider,
            {
                scaleX: 0,
                transformOrigin: "center center"
            },
            {
                scaleX: 1,
                duration: 1.5,
                ease: "power4.out",

                scrollTrigger: {
                    trigger: divider,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );

    });


    /* =========================================================
       SLIDER EXTRA
    ========================================================= */

    const sliderExtra = document.querySelector(".slider-extra");

    if (sliderExtra) {

        gsap.to(sliderExtra, {
            opacity: 0,
            y: 30,

            scrollTrigger: {
                trigger: document.body,
                start: "top -50px",
                end: "200px top",
                scrub: 1
            }
        });

    }


    /* =========================================================
       IMPORTANT
    ========================================================= */

    // Tunggu layout selesai, kemudian hitung ulang
    // semua posisi ScrollTrigger.
    window.addEventListener("load", function () {
        ScrollTrigger.refresh();
    });

    setTimeout(function () {
        ScrollTrigger.refresh();
    }, 500);

});