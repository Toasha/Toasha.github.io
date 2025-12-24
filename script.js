document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Effect
    const cursor = document.querySelector('.cursor-glow');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;

        cursorX += dx * 0.2;
        cursorY += dy * 0.2;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Smooth Scrolling
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Scroll Down Button
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Stagger children if it's a grid
                if (entry.target.classList.contains('skills-grid') ||
                    entry.target.classList.contains('products-grid') ||
                    entry.target.classList.contains('video-grid')) {

                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('visible');
                        }, index * 100); // 100ms delay between items
                    });
                }
            }
        });
    }, observerOptions);

    // Elements to observe
    const animatedElements = document.querySelectorAll(
        '.section-title, .bio-paragraph, .timeline-item, .subsection-title, .fade-up'
    );
    animatedElements.forEach(el => observer.observe(el));

    // Grids (Observer handles children reveal via parent observation or directly)
    // Actually, let's observe the children directly for better control if not strictly grid parent
    const gridItems = document.querySelectorAll('.skill-card, .product-card, .video-item');
    gridItems.forEach((item, index) => {
        // We can observe each item or observe the parent. 
        // Let's observe the item itself but maybe we want stagger? 
        // The previous logic for grid parent is good for stagger.
        // Let's observe the parents instead for staggering.
    });

    const grids = document.querySelectorAll('.skills-grid, .products-grid, .video-grid');
    grids.forEach(grid => observer.observe(grid));


    // Header Blur Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    // Flower Animation
    const flowerContainer = document.getElementById('flower-container');
    const petalCount = 30;

    for (let i = 0; i < petalCount; i++) {
        createPetal();
    }

    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('flower-petal');

        // Randomize
        const size = Math.random() * 10 + 10; // 10px to 20px
        const left = Math.random() * 100; // 0% to 100%
        const delay = Math.random() * 10; // 0s to 10s
        const duration = Math.random() * 10 + 10; // 10s to 20s
        const swayDuration = Math.random() * 2 + 3; // 3s to 5s
        const rotateDuration = Math.random() * 5 + 5; // 5s to 10s

        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${left}%`;
        petal.style.animationDelay = `${delay}s, ${Math.random() * 5}s, 0s`;
        petal.style.animationDuration = `${duration}s, ${swayDuration}s, ${rotateDuration}s`;

        // Vary shape slightly
        if (Math.random() > 0.5) {
            petal.style.borderRadius = "0 50% 0 50%";
        }

        flowerContainer.appendChild(petal);
    }
});
