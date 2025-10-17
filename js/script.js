// JEFFWORLDWIDE - Optimized JavaScript for Fast Loading
// Optimized for Android and all mobile devices

'use strict';

// Configuration
const CONFIG = {
    whatsappNumber: '+15551234567',
    businessName: 'JEFFWORLDWIDE',
    defaultMessage: 'Hello JEFFWORLDWIDE, I\'m interested in your luxury cars.'
};

// Detect if user is on Android for performance optimization
const isAndroid = /Android/i.test(navigator.userAgent);
const isLowEndDevice = navigator.hardwareConcurrency <= 4;

// DOM Elements - Cache them
let themeToggle, mobileMenuToggle, mobileMenuOverlay, header, body;

// Theme Manager - Simplified and Fast
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.bindEvents();
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateThemeIcon() {
        const themeIcon = document.querySelector('.theme-icon');
        if (!themeIcon) return;
        
        if (this.currentTheme === 'light') {
            themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
        } else {
            themeIcon.innerHTML = `
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            `;
        }
    }

    bindEvents() {
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// WhatsApp Manager - Simplified
class WhatsAppManager {
    generateWhatsAppURL(carName = '') {
        const message = carName 
            ? `Hello ${CONFIG.businessName}, I'm interested in the ${carName} I saw on your website.`
            : CONFIG.defaultMessage;
        
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${CONFIG.whatsappNumber.replace('+', '')}?text=${encodedMessage}`;
    }

    openWhatsApp(carName = '') {
        const url = this.generateWhatsAppURL(carName);
        window.open(url, '_blank', 'noopener,noreferrer');
    }
}

// Global function for WhatsApp
function orderOnWhatsApp(carName) {
    window.whatsappManager.openWhatsApp(carName);
}

// Mobile Menu Manager - Optimized
class MobileMenuManager {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            mobileMenuOverlay.classList.add('active');
            mobileMenuToggle.classList.add('active');
            body.style.overflow = 'hidden';
        } else {
            mobileMenuOverlay.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            body.style.overflow = '';
        }
    }

    bindEvents() {
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => this.toggleMenu());
        }

        // Close menu when clicking links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.toggleMenu();
            });
        });

        // Close menu when clicking overlay
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', (e) => {
                if (e.target === mobileMenuOverlay) {
                    this.toggleMenu();
                }
            });
        }
    }
}

// Smooth Scroll Manager
class SmoothScrollManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
    }

    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (!element) return;
        
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const target = link.getAttribute('href');
                if (target && target !== '#') {
                    this.smoothScrollTo(target);
                }
            }
        });
    }
}

// Header Scroll Effect - Optimized
class HeaderScrollManager {
    constructor() {
        this.lastScrollY = 0;
        this.ticking = false;
        this.init();
    }

    init() {
        this.bindScrollEvents();
    }

    updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        this.lastScrollY = currentScrollY;
        this.ticking = false;
    }

    requestTick() {
        if (!this.ticking) {
            requestAnimationFrame(() => this.updateHeader());
            this.ticking = true;
        }
    }

    bindScrollEvents() {
        window.addEventListener('scroll', () => this.requestTick(), { passive: true });
    }
}

// Intersection Observer for Scroll Animations - Optimized
class ScrollAnimationManager {
    constructor() {
        this.init();
    }

    init() {
        // Skip animations on low-end devices or Android
        if (isLowEndDevice || isAndroid) {
            this.addSimpleAnimations();
        } else {
            this.observeElements();
        }
    }

    addSimpleAnimations() {
        // Add CSS for simple fade-in without complex animations
        const style = document.createElement('style');
        style.textContent = `
            .car-card {
                opacity: 1;
                transform: none;
            }
        `;
        document.head.appendChild(style);
    }

    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe car cards
        const cards = document.querySelectorAll('.car-card');
        cards.forEach((card, index) => {
            // Stagger the animations slightly
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
            observer.observe(card);
        });
    }
}

// Performance Manager - Critical for Android
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeImages();
        this.addConnectionHints();
        
        // Reduce animations on low-end devices
        if (isLowEndDevice || isAndroid) {
            this.reduceAnimations();
        }
    }

    optimizeImages() {
        // Images already have loading="lazy" in HTML
        // Add error handling for missing images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', function() {
                this.style.display = 'none';
                console.warn('Image failed to load:', this.src);
            });
        });
    }

    addConnectionHints() {
        // Already in HTML, but ensure they're there
        const hasPreconnect = document.querySelector('link[rel="preconnect"]');
        if (!hasPreconnect) {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = 'https://fonts.googleapis.com';
            document.head.appendChild(link);
        }
    }

    reduceAnimations() {
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
        
        // Disable complex hover effects on touch devices
        if ('ontouchstart' in window) {
            const style = document.createElement('style');
            style.textContent = `
                .car-card:hover {
                    transform: none;
                }
                .car-card:hover .car-image img {
                    transform: none;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize everything when DOM is ready
function init() {
    // Cache DOM elements
    themeToggle = document.getElementById('themeToggle');
    mobileMenuToggle = document.getElementById('mobileMenuToggle');
    mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    header = document.querySelector('.header');
    body = document.body;

    // Initialize all managers
    window.themeManager = new ThemeManager();
    window.whatsappManager = new WhatsAppManager();
    window.mobileMenuManager = new MobileMenuManager();
    window.smoothScrollManager = new SmoothScrollManager();
    window.headerScrollManager = new HeaderScrollManager();
    window.scrollAnimationManager = new ScrollAnimationManager();
    window.performanceManager = new PerformanceManager();

    console.log('JEFFWORLDWIDE website initialized! 🚗');
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Website error:', e.error);
});

// Prevent FOUC (Flash of Unstyled Content)
document.documentElement.style.visibility = 'visible';
