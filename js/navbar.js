gsap.registerPlugin(ScrollTrigger);

const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('#mobile-menu a');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');

    gsap.fromTo(
        mobileMenu,
        { opacity: 0, y: '-100%' },
        { opacity: 1, y: '0%', duration: 0.5, ease: 'power4.out' }
    );

    gsap.fromTo(
        navLinks,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.2, delay: 0.2, ease: 'power4.out' }
    );
});

menuClose.addEventListener('click', () => {
    gsap.to(mobileMenu, {
        opacity: 0,
        y: '-100%',
        duration: 0.5,
        ease: 'power4.in',
        onComplete: () => {
            mobileMenu.classList.add('hidden');
        },
    });
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        gsap.to(mobileMenu, {
            opacity: 0,
            y: '-100%',
            duration: 0.5,
            ease: 'power4.in',
            onComplete: () => {
                mobileMenu.classList.add('hidden');
            },
        });
    });
});