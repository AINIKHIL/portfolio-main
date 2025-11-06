// ==================== Modern Header Navigation ==================== //
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const modernHeader = document.getElementById('modernHeader');
const headerNav = document.querySelector('.header-nav');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    headerNav.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        headerNav.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !headerNav.contains(e.target)) {
        hamburger.classList.remove('active');
        headerNav.classList.remove('active');
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        modernHeader.classList.add('scrolled');
    } else {
        modernHeader.classList.remove('scrolled');
    }
});

// ==================== Active Navigation Link ==================== //
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== Typing Effect ==================== //
const typingText = document.querySelector('.typing-text');
const texts = ['Full Stack Developer', 'Web Designer', 'Problem Solver', 'Creative Thinker'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000);
});

// ==================== Scroll Animations ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease forwards';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe elements
const animateElements = document.querySelectorAll('.project-card, .certificate-card, .timeline-item, .skill-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== Scroll to Top Button ==================== //
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== Contact Form (client-side save only) ==================== //
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

function loadSubmissions() {
    try { return JSON.parse(localStorage.getItem('contact_submissions') || '[]'); } catch (e) { return []; }
}

function saveSubmission(sub) {
    const submissions = loadSubmissions();
    submissions.unshift(sub);
    localStorage.setItem('contact_submissions', JSON.stringify(submissions));
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && email && subject && message) {
        const submission = { id: Date.now(), timestamp: new Date().toISOString(), name, email, subject, message };
        saveSubmission(submission);

        formMessage.textContent = 'Thank you for your message! Your response is saved.';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';

        contactForm.reset();
        setTimeout(() => { formMessage.style.display = 'none'; }, 5000);
    } else {
        formMessage.textContent = 'Please fill in all fields.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
    }
});

// ==================== Smooth Scrolling ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed header height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Project Card Interactions ==================== //
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==================== Certificate Card Interactions ==================== //
const certificateCards = document.querySelectorAll('.certificate-card');

certificateCards.forEach(card => {
    card.addEventListener('click', function() {
        this.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
});

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

// ==================== Dynamic Year in Footer ==================== //
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer p');
if (footerText) {
    footerText.innerHTML = footerText.innerHTML.replace('2025', currentYear);
}

// ==================== Parallax Effect on Home Section ==================== //
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.home-section');
    
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==================== Counter Animation for Stats ==================== //
function animateCounter(element, target, duration) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ==================== Form Input Focus Effect ==================== //
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// ==================== Theme Toggle (Optional Enhancement) ==================== //
// You can add a dark mode toggle button later
let isDarkMode = false;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('darkMode');
if (savedTheme === 'true') {
    document.body.classList.add('dark-mode');
    isDarkMode = true;
}

// ==================== Loading Animation ==================== //
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== Console Message ==================== //
console.log('%c👋 Welcome to my portfolio!', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cLooking to hire? Let\'s connect!', 'font-size: 14px; color: #8b5cf6;');

// ==================== Prevent Right Click (Optional) ==================== //
// Uncomment if you want to prevent right-click on images
/*
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});
*/

// ==================== Page Visibility API ==================== //
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = 'Come back! 👋 - Portfolio';
    } else {
        document.title = 'My Portfolio - Professional Web Developer';
    }
});

// ==================== Easter Egg - Konami Code ==================== //
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ==================== NEAR Module Interactions ==================== //
// Observe NEAR elements for reveal on scroll
const nearObserve = document.querySelectorAll('.near-card, .role-item');
nearObserve.forEach(el => {
    try {
        el.style.opacity = '0';
        observer.observe(el);
    } catch (e) {
        // if observer isn't ready yet, ignore silently
    }
});

// Note: Copy-wallet behavior removed — button was removed from the NEAR module
