gsap.registerPlugin(ScrollTrigger);
const navbarDesktop = document.querySelector('nav.md\\:flex');
const navbarMobile = document.querySelector('nav.md\\:hidden');
const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('#mobile-menu a');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        gsap.to(navbarDesktop, {
            backgroundColor: 'rgba(10, 10, 10, 0.8)',
            boxShadow: '0px 4px 6px rgba(10, 10, 10, 0.1)',
            duration: 0.3,
            ease: 'power2.out',
        });
        gsap.to(navbarMobile, {
            backgroundColor: 'rgba(10, 10, 10, 0.8)',
            boxShadow: '0px 4px 6px rgba(10, 10, 10, 0.1)',
            duration: 0.3,
            ease: 'power2.out',
        });
    } else {
        gsap.to(navbarDesktop, {
            backgroundColor: 'rgba(10, 10, 10, 0)',
            boxShadow: 'none',
            duration: 0.3,
            ease: 'power2.out',
        });

        gsap.to(navbarMobile, {
            backgroundColor: 'rgba(10, 10, 10, 0)',
            boxShadow: 'none',
            duration: 0.3,
            ease: 'power2.out',
        });
    }
});

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