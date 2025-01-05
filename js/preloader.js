gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
    const tl = gsap.timeline();

    tl.to(".progress-bar-inner", {
        width: "100%",
        duration: 1,
        ease: "power2.inOut",
    }).to(".preloader", {
        yPercent: -100,
        duration: 0.8,
        ease: "power2.inOut",
    });

    const heroTl = gsap.timeline();
    heroTl
        .to("h1 span", {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
        })
        .to(
            "p",
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
            },
            "-=0.5"
        );

    initAboutAnimations();
});