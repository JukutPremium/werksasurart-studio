gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    const tl = gsap.timeline();

    tl.to('.progress-bar-inner', {
        width: '100%',
        duration: 1,
        ease: 'power2.inOut'
    })
        .to('.preloader', {
            yPercent: -100,
            duration: 0.8,
            ease: 'power2.inOut'
        });


    const heroTl = gsap.timeline();
    heroTl.to('h1 span', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    })
        .to('p', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5');

    initAboutAnimations();
});

const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
});

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('expanded');
    });

    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('expanded');
    });
});

document.querySelectorAll('.magnetic-button').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(button, {
            x: (x - rect.width / 2) / 5,
            y: (y - rect.height / 2) / 5,
            duration: 0.3
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.3
        });
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function initThreeBackground() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) {
        heroCanvas.appendChild(renderer.domElement);

        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        for (let i = 0; i < 5000; i++) {
            vertices.push(
                Math.random() * 2000 - 1000,
                Math.random() * 2000 - 1000,
                Math.random() * 2000 - 1000
            );
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const material = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        camera.position.z = 1000;

        function animate() {
            requestAnimationFrame(animate);
            particles.rotation.x += 0.0005;
            particles.rotation.y += 0.0005;
            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

function initWorksAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.project-item').forEach(item => {
        observer.observe(item);
    });

    gsap.to('[data-scroll]', {
        scrollTrigger: {
            trigger: '#works',
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });
}

function initAboutAnimations() {
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#about",
            start: "top 60%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });

    aboutTl.from('.bg-white\\/5', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: {
            each: 0.2,
            ease: "power3.out"
        }
    })
        .from('.stat-card', {
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: {
                each: 0.15,
                ease: "power2.out"
            }
        }, "-=0.4");

    ScrollTrigger.refresh();
}

function initializeWebsite() {
    initThreeBackground();
    initWorksAnimation();

    ScrollTrigger.refresh();
}

document.addEventListener('DOMContentLoaded', initializeWebsite);
