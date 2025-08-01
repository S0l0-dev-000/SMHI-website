// Initialize GSAP with ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animate elements on scroll
gsap.utils.toArray('.service-card, .feature-card, .testimonial-card').forEach((el, i) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1
    });
});

// Animate numbers
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start) + (obj.getAttribute('data-suffix') || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate stats when in view
const stats = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const count = target.getAttribute('data-count');
            const suffix = target.getAttribute('data-suffix') || '';
            animateValue(target, 0, count, 2000);
            statObserver.unobserve(target); // Only animate once
        }
    });
}, { threshold: 0.5 });

// Start observing all stat numbers
stats.forEach(stat => {
    statObserver.observe(stat);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to current section in navigation
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize any other JavaScript functionality here
document.addEventListener('DOMContentLoaded', () => {
    console.log('SMHI Energy Solutions website loaded!');
});
