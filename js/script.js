// EPL Express Website JavaScript
// Professional animations and interactive features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initScrollAnimations();
    initMobileMenu();
    initHeaderScroll();
    initSmoothScrolling();
    initWhatsAppButton();
    initFormValidation();
    initLazyLoading();
});

// Scroll Reveal Animations
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Add staggered animation for multiple elements
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                entry.target.style.transitionDelay = `${delay}ms`;
            }
        });
    }, observerOptions);
    
    // Add reveal class to elements that should animate
    const elementsToAnimate = [
        '.hero-content > *',
        '.section-header',
        '.about-content',
        '.service-card',
        '.value-item',
        '.contact-item',
        '.contact-cta'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('reveal');
            observer.observe(element);
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Animate hamburger menu
            const hamburgers = mobileToggle.querySelectorAll('.hamburger');
            hamburgers.forEach((hamburger, index) => {
                if (mobileToggle.classList.contains('active')) {
                    if (index === 0) hamburger.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) hamburger.style.opacity = '0';
                    if (index === 2) hamburger.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    hamburger.style.transform = 'none';
                    hamburger.style.opacity = '1';
                }
            });
        });
        
        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileToggle.classList.remove('active');
                
                // Reset hamburger animation
                const hamburgers = mobileToggle.querySelectorAll('.hamburger');
                hamburgers.forEach(hamburger => {
                    hamburger.style.transform = 'none';
                    hamburger.style.opacity = '1';
                });
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
                nav.classList.remove('active');
                mobileToggle.classList.remove('active');
                
                // Reset hamburger animation
                const hamburgers = mobileToggle.querySelectorAll('.hamburger');
                hamburgers.forEach(hamburger => {
                    hamburger.style.transform = 'none';
                    hamburger.style.opacity = '1';
                });
            }
        });
    }
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// WhatsApp Button Enhancements
function initWhatsAppButton() {
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Track WhatsApp clicks (optional analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'WhatsApp',
                    event_label: 'Contact Button'
                });
            }
        });
    });
}

// Form Validation (if forms are added later)
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    showError(input, 'Este campo é obrigatório');
                } else {
                    input.classList.remove('error');
                    hideError(input);
                }
            });
            
            if (isValid) {
                // Form is valid, proceed with submission
                showSuccess('Mensagem enviada com sucesso!');
                form.reset();
            }
        });
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Utility Functions
function showError(input, message) {
    hideError(input);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#cf2928';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    input.parentNode.appendChild(errorDiv);
}

function hideError(input) {
    const errorDiv = input.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #25d366;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => successDiv.remove(), 300);
    }, 3000);
}

// Add CSS animations for success messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .error {
        border-color: #cf2928 !important;
        box-shadow: 0 0 0 2px rgba(207, 41, 40, 0.2) !important;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations are handled by IntersectionObserver
}, 16)); // ~60fps

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add fade-in animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const nav = document.getElementById('nav');
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileToggle.classList.remove('active');
            
            // Reset hamburger animation
            const hamburgers = mobileToggle.querySelectorAll('.hamburger');
            hamburgers.forEach(hamburger => {
                hamburger.style.transform = 'none';
                hamburger.style.opacity = '1';
            });
        }
    }
});

// Add focus management for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add CSS for keyboard navigation
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #003881 !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(keyboardStyle);

console.log('EPL Express website loaded successfully! 🚀');

