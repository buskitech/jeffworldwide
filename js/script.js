// JEFFWORLDWIDE Website JavaScript
// Main functionality for theme switching, WhatsApp integration, and interactions

// Configuration - Easy to edit
const CONFIG = {
    whatsappNumber: '+15551234567', // Replace with actual WhatsApp number
    businessName: 'JEFFWORLDWIDE',
    defaultMessage: 'Hello JEFFWORLDWIDE, I\'m interested in your luxury cars.'
};

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

// Theme Management
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
        
        // Add smooth transition effect
        body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    }

    updateThemeIcon() {
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            if (this.currentTheme === 'light') {
                // Moon icon for light mode (to switch to dark)
                themeIcon.innerHTML = `
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                `;
            } else {
                // Sun icon for dark mode (to switch to light)
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
    }

    bindEvents() {
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// WhatsApp Integration
class WhatsAppManager {
    constructor() {
        this.bindEvents();
    }

    generateWhatsAppURL(carName = '') {
        const message = carName 
            ? `Hello ${CONFIG.businessName}, I'm interested in the ${carName} I saw on your website.`
            : CONFIG.defaultMessage;
        
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${CONFIG.whatsappNumber.replace('+', '')}?text=${encodedMessage}`;
    }

    openWhatsApp(carName = '') {
        const url = this.generateWhatsAppURL(carName);
        window.open(url, '_blank');
        
        // Analytics tracking (if needed)
        this.trackWhatsAppClick(carName);
    }

    trackWhatsAppClick(carName) {
        // Add analytics tracking here if needed
        console.log(`WhatsApp clicked for: ${carName || 'General inquiry'}`);
    }

    bindEvents() {
        // Bind to existing buttons in HTML
        document.addEventListener('click', (e) => {
            if (e.target.matches('[onclick*="orderOnWhatsApp"]')) {
                e.preventDefault();
                const carName = e.target.getAttribute('onclick').match(/orderOnWhatsApp\('([^']+)'\)/)?.[1] || '';
                this.openWhatsApp(carName);
            }
        });
    }
}

// Global function for WhatsApp (called from HTML)
function orderOnWhatsApp(carName) {
    window.whatsappManager.openWhatsApp(carName);
}

// Mobile Menu Management
class MobileMenuManager {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.createMobileMenu();
    }

    createMobileMenu() {
        // Create mobile menu overlay if it doesn't exist
        if (!document.querySelector('.mobile-menu-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'mobile-menu-overlay';
            overlay.innerHTML = `
                <div class="mobile-menu-content">
                    <a href="#home" class="mobile-nav-link">Home</a>
                    <a href="#cars" class="mobile-nav-link">Cars</a>
                    <a href="#about" class="mobile-nav-link">About</a>
                    <a href="#contact" class="mobile-nav-link">Contact</a>
                </div>
            `;
            document.body.appendChild(overlay);
            
            // Add mobile menu styles
            this.addMobileMenuStyles();
        }
    }

    addMobileMenuStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .mobile-menu-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(10px);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .mobile-menu-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            
            .mobile-menu-content {
                display: flex;
                flex-direction: column;
                gap: 2rem;
                text-align: center;
            }
            
            .mobile-nav-link {
                color: white;
                text-decoration: none;
                font-size: 1.5rem;
                font-weight: 600;
                transition: color 0.3s ease;
            }
            
            .mobile-nav-link:hover {
                color: var(--primary-color);
            }
            
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        `;
        document.head.appendChild(style);
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        const overlay = document.querySelector('.mobile-menu-overlay');
        
        if (this.isOpen) {
            overlay.classList.add('active');
            mobileMenuToggle.classList.add('active');
            body.style.overflow = 'hidden';
        } else {
            overlay.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            body.style.overflow = '';
        }
    }

    bindEvents() {
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => this.toggleMenu());
        }

        // Close menu when clicking on links
        document.addEventListener('click', (e) => {
            if (e.target.matches('.mobile-nav-link')) {
                this.toggleMenu();
            }
        });

        // Close menu when clicking overlay
        document.addEventListener('click', (e) => {
            if (e.target.matches('.mobile-menu-overlay')) {
                this.toggleMenu();
            }
        });
    }
}

// Smooth Scrolling Enhancement
class SmoothScrollManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
    }

    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = element.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const target = link.getAttribute('href');
                this.smoothScrollTo(target);
            }
        });
    }
}

// Loading Animation Manager
class LoadingManager {
    constructor() {
        this.init();
    }

    init() {
        this.createLoader();
        this.hideLoaderWhenReady();
    }

    createLoader() {
        const loader = document.createElement('div');
        loader.className = 'loading';
        loader.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(loader);
    }

    hideLoader() {
        const loader = document.querySelector('.loading');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.remove();
            }, 500);
        }
    }

    hideLoaderWhenReady() {
        if (document.readyState === 'complete') {
            setTimeout(() => this.hideLoader(), 1000);
        } else {
            window.addEventListener('load', () => {
                setTimeout(() => this.hideLoader(), 1000);
            });
        }
    }
}

// Scroll Animations Manager
class ScrollAnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
        this.addScrollEffects();
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe car cards and other elements
        document.querySelectorAll('.car-card, .feature, .stat').forEach(el => {
            observer.observe(el);
        });
    }

    addScrollEffects() {
        // Add CSS for scroll animations
        const style = document.createElement('style');
        style.textContent = `
            .car-card,
            .feature,
            .stat {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .car-card.animate-in,
            .feature.animate-in,
            .stat.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .car-card:nth-child(even).animate-in {
                animation: slideInRight 0.6s ease forwards;
            }
            
            .car-card:nth-child(odd).animate-in {
                animation: slideInLeft 0.6s ease forwards;
            }
            
            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Header Scroll Effect
class HeaderScrollManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindScrollEvents();
    }

    bindScrollEvents() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
            
            // Update for dark mode
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                if (currentScrollY > 100) {
                    header.style.background = 'rgba(15, 23, 42, 0.98)';
                } else {
                    header.style.background = 'rgba(15, 23, 42, 0.95)';
                }
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

// Performance Optimization
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.optimizeAnimations();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    optimizeAnimations() {
        // Reduce animations on low-end devices
        if (navigator.hardwareConcurrency <= 2) {
            document.documentElement.style.setProperty('--animation-duration', '0.2s');
        }
    }
}

// Initialize all managers when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    window.themeManager = new ThemeManager();
    window.whatsappManager = new WhatsAppManager();
    window.mobileMenuManager = new MobileMenuManager();
    window.smoothScrollManager = new SmoothScrollManager();
    window.loadingManager = new LoadingManager();
    window.scrollAnimationManager = new ScrollAnimationManager();
    window.headerScrollManager = new HeaderScrollManager();
    window.performanceManager = new PerformanceManager();
    
    console.log('JEFFWORLDWIDE website initialized successfully! 🚗🌍');
});

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Website error:', e.error);
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        WhatsAppManager,
        MobileMenuManager,
        CONFIG
    };
}

