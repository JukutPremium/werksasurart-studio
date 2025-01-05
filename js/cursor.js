gsap.registerPlugin(ScrollTrigger);
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
    });
});