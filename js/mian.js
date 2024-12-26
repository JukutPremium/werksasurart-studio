const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

let menuOpen = false;

function toggleMenu() {
    menuOpen = !menuOpen;
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');

    // Prevent body scroll when menu is open
    document.body.style.overflow = menuOpen ? 'hidden' : '';
}

menuBtn.addEventListener('click', toggleMenu);

// Close menu when clicking a link
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleMenu();
    });
});

// Handle resize to prevent menu issues
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && menuOpen) {
        toggleMenu();
    }
});

// Optional: Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (menuOpen && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        toggleMenu();
    }
});

// Add GSAP animations for menu items
gsap.from('.mobile-menu a', {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.1,
    paused: true,
    ease: 'power2.out'
});

// Play animations when menu opens
const tl = gsap.timeline({ paused: true });
tl.from('.mobile-menu a', {
    opacity: 100,
    y: 20,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out'
});

// Update toggle function to include animation
menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        tl.restart();
    }
});

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    const counter = document.querySelector('.counter');
    const progressBar = document.querySelector('.progress-bar');
    const loadingText = document.querySelector('.loading-text');
    const contentWrapper = document.querySelector('.content-wrapper');

    // Create GSAP timeline for loading animation
    const loadingTl = gsap.timeline();

    // Counter animation
    loadingTl.to(counter, {
        innerHTML: '100%',
        duration: 1.5,
        snap: { innerHTML: 1 },
        ease: 'power2.inOut',
        onUpdate: () => {
            const counterValue = parseInt(counter.innerHTML);
            gsap.to(progressBar, {
                width: `${counterValue}%`,
                duration: 0.05,
                ease: 'none'
            });
        }
    });

    // Loading text animation
    loadingTl.to(loadingText, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
    }, '-=0.5');

    // Hide counter and prepare for final animation
    loadingTl.to(counter, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
    }, '-=0.3');

    // Slide out preloader
    loadingTl.to(preloader, {
        duration: 0.8,
        yPercent: -100,
        ease: 'power3.inOut'
    });

    // Show content
    loadingTl.to(contentWrapper, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.5,
        onComplete: () => {
            document.body.classList.add('loaded');
        }
    }, '-=0.3');
});

// Custom cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.2
    });
});

// Hero animations

document.addEventListener('DOMContentLoaded', () => {
    // Hero text animation
    const words = ['authentic works of art', 'unique experiences', 'digital masterpieces'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.querySelector('.typewriter');

    function typeWriter() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeWriter, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeWriter, 500);
        } else {
            setTimeout(typeWriter, isDeleting ? 50 : 100);
        }
    }

    // Initialize animations
    gsap.to('#hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1
    });

    gsap.to('.scroll-indicator', {
        opacity: 1,
        duration: 1,
        delay: 2
    });

    // Start typewriter
    setTimeout(typeWriter, 1500);

    // Magnetic effect for title words
    const magneticWrappers = document.querySelectorAll('.word-wrapper');

    magneticWrappers.forEach(wrap => {
        wrap.addEventListener('mousemove', (e) => {
            const bounds = wrap.getBoundingClientRect();
            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;
            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;

            const deltaX = (mouseX - centerX) * 0.1;
            const deltaY = (mouseY - centerY) * 0.1;

            gsap.to(wrap.querySelector('.word-slide'), {
                x: deltaX,
                y: deltaY,
                duration: 0.3
            });
        });

        wrap.addEventListener('mouseleave', () => {
            gsap.to(wrap.querySelector('.word-slide'), {
                x: 0,
                y: 0,
                duration: 0.3
            });
        });
    });
});

// Project items animation
gsap.utils.toArray('.project-item').forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'top center',
            scrub: 1
        },
        y: 50,
        opacity: 0,
        delay: index * 0.2
    });
});

// Hover animations for project items
document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            scale: 2,
            backgroundColor: 'white',
            duration: 0.3
        });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            scale: 1,
            backgroundColor: 'black',
            duration: 0.3
        });
    });
});
// Text reveal animations
gsap.utils.toArray('h2').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top bottom',
            end: 'top center',
            scrub: 1
        },
        y: 50,
        opacity: 0
    });
});
gsap.utils.toArray('.stat-card').forEach((stat, index) => {
    gsap.from(stat, {
        scrollTrigger: {
            trigger: stat,
            start: 'top bottom',
            end: 'top center',
            scrub: 1
        },
        y: 50,
        opacity: 0,
        delay: index * 0.2
    });
});

// Animate team members
gsap.utils.toArray('.team-member').forEach((member, index) => {
    gsap.from(member, {
        scrollTrigger: {
            trigger: member,
            start: 'top bottom',
            end: 'top center',
            scrub: 1
        },
        y: 50,
        opacity: 0,
        delay: index * 0.2
    });
});

// Animate services
gsap.utils.toArray('.services div').forEach((service, index) => {
    gsap.from(service, {
        scrollTrigger: {
            trigger: service,
            start: 'top bottom',
            end: 'top center',
            scrub: 1
        },
        y: 30,
        opacity: 0,
        delay: index * 0.2
    });
});