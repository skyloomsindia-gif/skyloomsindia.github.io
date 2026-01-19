// Create twinkling stars
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    document.body.appendChild(starsContainer);

    const numberOfStars = 300;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Randomly make some stars gold (20% chance)
        if (Math.random() > 0.8) {
            star.classList.add('gold');
        }

        // Randomly make some stars brighter (15% chance)
        if (Math.random() > 0.85) {
            star.classList.add('bright');
        }

        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';

        // Random animation duration (2s to 5s)
        const duration = 2 + Math.random() * 3;
        star.style.setProperty('--duration', duration + 's');

        // Random delay (0s to 3s)
        const delay = Math.random() * 3;
        star.style.setProperty('--delay', delay + 's');

        starsContainer.appendChild(star);
    }
}

// Initialize stars when page loads
window.addEventListener('DOMContentLoaded', createStars);

// Header scroll effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';

            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all procedure cards
document.querySelectorAll('.procedure-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Add particle effect on mouse move (subtle)
document.addEventListener('mousemove', (e) => {
    const particle = document.createElement('div');
    particle.className = 'mouse-particle';
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.6) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        z-index: 9999;
        animation: particleFade 1s ease-out forwards;
    `;

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000);
});

// Add particle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFade {
        from {
            opacity: 0.8;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.5) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Add hover sound effect preparation (visual feedback)
document.querySelectorAll('.procedure-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Console welcome message
console.log('%c Welcome to ProceduresHub! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Streamlining excellence, one procedure at a time. ', 'color: #667eea; font-size: 14px;');
