// Create animated star background
function createStars() {
    const starsContainer = document.getElementById('stars');
    const numStars = 150;
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        star.style.animationDelay = Math.random() * 3 + 's';
        
        // Make some stars larger
        if (Math.random() > 0.8) {
            star.classList.add('large');
        }
        
        starsContainer.appendChild(star);
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        }
    });
}

// Enhanced typing animation that preserves space
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    if (!typingElement) return;
    
    const text = 'Pieter';
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    // Start with empty text but element keeps its min-width
    typingElement.textContent = '';
    
    const typeWriter = () => {
        if (isPaused) {
            setTimeout(typeWriter, 3000); // Pause for 3 seconds before deleting
            isPaused = false;
            return;
        }
        
        if (!isDeleting) {
            // Typing
            typingElement.textContent = text.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === text.length) {
                isPaused = true;
                isDeleting = true;
            }
            
            setTimeout(typeWriter, 150);
        } else {
            // Deleting
            typingElement.textContent = text.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                setTimeout(typeWriter, 500);
            } else {
                setTimeout(typeWriter, 75);
            }
        }
    };
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
}

// Parallax effect for hero section
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Intersection Observer for fade-in animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('.about, .projects, .contact');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        observer.observe(card);
    });
}

// Mouse movement effect for stars (DISABLED)
function initMouseEffects() {
    // Mouse effects disabled - stars stay static
    return;
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initThemeSystem(); // Initialize theme system first
    createStars();
    createFloatingParticles();
    createMatrixRain();
    initSmoothScrolling();
    initNavbarScroll();
    initTypingAnimation();
    initParallax();
    initScrollAnimations();
    initMouseEffects();
    initMagneticCursor();
    initSkillAnimations();
    initTextRevealAnimation();
    initHeroMouseTracking();
    initScrollProgress();
    initMobileNav();
    updateActiveNavLink();
});

// Add active nav link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
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
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize active nav link highlighting
document.addEventListener('DOMContentLoaded', updateActiveNavLink);// Floating particles animation
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particleContainer.appendChild(particle);
    }
}

// Magnetic cursor effect for buttons
function initMagneticCursor() {
    const magneticElements = document.querySelectorAll('.btn, .project-card, .social-link');
    
    if (magneticElements.length === 0) return; // Add check for elements
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

// Skill tags floating animation on hover
function initSkillAnimations() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.animation = 'float 2s ease-in-out infinite';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.animation = '';
        });
    });
}
// Text reveal animation on scroll
function initTextRevealAnimation() {
    const textElements = document.querySelectorAll('h2, h3, p');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('text-reveal');
            }
        });
    }, { threshold: 0.1 });
    
    textElements.forEach(element => {
        observer.observe(element);
    });
}

// Matrix rain effect for hero background
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-rain';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return; // Add null check
    
    heroSection.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Add context check
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#6366f1';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const intervalId = setInterval(draw, 35);
    
    // Resize canvas on window resize
    const resizeHandler = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeHandler);
    
    // Cleanup function to prevent memory leaks
    return () => {
        clearInterval(intervalId);
        window.removeEventListener('resize', resizeHandler);
        if (canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
        }
    };
}
// Enhanced mouse tracking for hero section (DISABLED)
function initHeroMouseTracking() {
    // Mouse tracking disabled - no movement effects
    return;
}

// Progress bar on scroll
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}
// Mobile navigation toggle
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (!hamburger || !navMenu) return; // Add null checks
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}
// Theme Management System
function initThemeSystem() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const customColorPicker = document.getElementById('custom-color');
    const customColorWrapper = document.querySelector('.custom-color-wrapper');
    const body = document.body;
    
    if (!themeButtons.length || !customColorPicker) return;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    const savedCustomColor = localStorage.getItem('portfolio-custom-color') || '#6366f1';
    
    // Apply saved theme
    applyTheme(savedTheme, savedCustomColor);
    
    // Theme button handlers
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            applyTheme(theme);
            updateActiveButton(btn);
            localStorage.setItem('portfolio-theme', theme);
        });
    });
    
    // Custom color picker handler
    customColorPicker.addEventListener('change', (e) => {
        const customColor = e.target.value;
        applyTheme('custom', customColor);
        updateActiveButton(customColorWrapper);
        localStorage.setItem('portfolio-theme', 'custom');
        localStorage.setItem('portfolio-custom-color', customColor);
    });
    
    function applyTheme(theme, customColor = savedCustomColor) {
        // Remove existing theme
        body.removeAttribute('data-theme');
        body.classList.remove('theme-transition');
        
        // Add transition class
        setTimeout(() => body.classList.add('theme-transition'), 50);
        
        if (theme === 'custom') {
            body.setAttribute('data-theme', 'custom');
            applyCustomColor(customColor);
        } else {
            // Default dark theme - no attribute needed
        }
        
        // Update active states
        if (theme === 'custom') {
            updateActiveButton(customColorWrapper);
        } else {
            const activeBtn = document.querySelector(`[data-theme="${theme}"]`);
            if (activeBtn) updateActiveButton(activeBtn);
        }
        
        // Update stars and particles for new theme
        updateStarsForTheme();
        updateParticlesForTheme();
    }
    
    function applyCustomColor(color) {
        const root = document.documentElement;
        const rgb = hexToRgb(color);
        
        // Generate color variations
        const lighter = lightenColor(color, 20);
        const light = lightenColor(color, 10);
        const dark = darkenColor(color, 10);
        
        root.style.setProperty('--custom-color', color);
        root.style.setProperty('--custom-color-lighter', lighter);
        root.style.setProperty('--custom-color-light', light);
        root.style.setProperty('--custom-color-dark', dark);
        root.style.setProperty('--accent-primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    }
    
    function updateActiveButton(activeElement) {
        // Remove active class from all
        themeButtons.forEach(btn => btn.classList.remove('active'));
        customColorWrapper.classList.remove('active');
        
        // Add active class to selected
        if (activeElement === customColorWrapper) {
            customColorWrapper.classList.add('active');
        } else {
            activeElement.classList.add('active');
        }
    }
    
    function updateStarsForTheme() {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            star.style.transition = 'background 0.3s ease, box-shadow 0.3s ease';
        });
    }
    
    function updateParticlesForTheme() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.transition = 'background 0.3s ease';
        });
    }
    
    // Color utility functions
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    function lightenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const B = (num >> 8 & 0x00FF) + amt;
        const G = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + 
                     (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + 
                     (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
    }
    
    function darkenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const B = (num >> 8 & 0x00FF) - amt;
        const G = (num & 0x0000FF) - amt;
        return "#" + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 + 
                     (B > 255 ? 255 : B < 0 ? 0 : B) * 0x100 + 
                     (G > 255 ? 255 : G < 0 ? 0 : G)).toString(16).slice(1);
    }
}