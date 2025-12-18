/**
 * Bokra Website - Vanilla JavaScript
 * Handles scroll animations, mobile menu, and smooth interactions
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    function init() {
        // ============================================
        // Mobile Menu Toggle
        // ============================================
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-menu a');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ============================================
    // Navbar Scroll Effect
    // ============================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    function handleNavbarScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }

    // Throttle scroll event for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleNavbarScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // ============================================
    // Smooth Scrolling for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default if it's just "#"
            if (href === '#' || href === '#!') {
                return;
            }

            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (mobileMenuToggle && navMenu) {
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // ============================================
    // Scroll Animations for Screenshots
    // ============================================
    const screenshotCards = document.querySelectorAll('.screenshot-card');

    function checkVisibility() {
        screenshotCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible) {
                card.classList.add('visible');
            }
        });
    }

    // Check on scroll
    let scrollTicking = false;
    window.addEventListener('scroll', function() {
        if (!scrollTicking) {
            window.requestAnimationFrame(function() {
                checkVisibility();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });

    // Check on load
    checkVisibility();

    // ============================================
    // Intersection Observer for Fade-in Animations
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-card, .feature-card, .step-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // Hero Image Animation on Load
    // ============================================
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('load', function() {
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'translateY(30px)';
            heroImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(function() {
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'translateY(0)';
            }, 200);
        });
    }

    // ============================================
    // Button Hover Effects Enhancement
    // ============================================
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ============================================
    // Card Hover Effects
    // ============================================
    const cards = document.querySelectorAll('.about-card, .feature-card, .step-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // ============================================
    // Image Loading Handler
    // ============================================
    function handleImageLoad(img) {
        img.classList.add('loaded');
    }

    // Handle lazy loaded images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        if (img.complete) {
            handleImageLoad(img);
        } else {
            img.addEventListener('load', () => handleImageLoad(img));
            img.addEventListener('error', () => {
                console.warn('Image failed to load:', img.src);
                img.style.opacity = '1'; // Show broken image placeholder
            });
        }
    });

    // Preload critical images
    const criticalImages = document.querySelectorAll('.hero-image img, .phone-mockup img');
    criticalImages.forEach(img => {
        if (img.complete) {
            handleImageLoad(img);
        } else {
            img.addEventListener('load', () => handleImageLoad(img));
        }
    });

    // ============================================
    // Performance: Debounce Function
    // ============================================
    function debounce(func, wait) {
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

    // ============================================
    // Handle Window Resize
    // ============================================
    const handleResize = debounce(function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }, 250);

    window.addEventListener('resize', handleResize);

    // ============================================
    // Patient/Doctor Toggle
    // ============================================
    const patientToggle = document.getElementById('patientToggle');
    const doctorToggle = document.getElementById('doctorToggle');
    const patientFeatures = document.getElementById('patientFeatures');
    const doctorFeatures = document.getElementById('doctorFeatures');

    if (patientToggle && doctorToggle && patientFeatures && doctorFeatures) {
        patientToggle.addEventListener('click', function() {
            patientToggle.classList.add('active');
            doctorToggle.classList.remove('active');
            patientFeatures.style.display = 'block';
            doctorFeatures.style.display = 'none';
            patientFeatures.classList.add('fade-in');
        });

        doctorToggle.addEventListener('click', function() {
            doctorToggle.classList.add('active');
            patientToggle.classList.remove('active');
            doctorFeatures.style.display = 'block';
            patientFeatures.style.display = 'none';
            doctorFeatures.classList.add('fade-in');
        });
    }

    // ============================================
    // Scroll Reveal Animation
    // ============================================
    const revealElements = document.querySelectorAll('.about-card, .feature-card, .step-card, .section-header');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // ============================================
    // Parallax Effect for Hero
    // ============================================
    const hero = document.getElementById('hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent && scrolled < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.5;
            }
        });
    }

    // ============================================
    // Counter Animation for Stats
    // ============================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + '+';
            }
        }, 16);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (number) {
                        animateCounter(stat, number);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.trust-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // ============================================
    // Enhanced Smooth Scroll with Offset
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Add active state to nav link
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                });
                if (this.classList.contains('nav-link') || this.closest('.nav-menu')) {
                    this.classList.add('active');
                }
            }
        });
    });

    // ============================================
    // Cursor Effect (Desktop Only)
    // ============================================
    if (window.matchMedia('(min-width: 968px) and (pointer: fine)').matches) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Add hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .card, .feature-card, .about-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
        
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }

    // ============================================
    // Download Button Analytics
    // ============================================
    const patientDownloadLink = document.getElementById('patientDownloadLink');
    const doctorDownloadLink = document.getElementById('doctorDownloadLink');

    if (patientDownloadLink && window.firebaseLogEvent && window.firebaseAnalytics) {
        patientDownloadLink.addEventListener('click', function() {
            window.firebaseLogEvent(window.firebaseAnalytics, 'download_click', {
                app_type: 'patient',
                platform: 'android'
            });
        });
    }

    if (doctorDownloadLink && window.firebaseLogEvent && window.firebaseAnalytics) {
        doctorDownloadLink.addEventListener('click', function() {
            window.firebaseLogEvent(window.firebaseAnalytics, 'download_click', {
                app_type: 'doctor',
                platform: 'android'
            });
        });
    }

    } // End of init function

    // ============================================
    // Initialize when DOM is ready
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM is already ready
        init();
    }

    // ============================================
    // Loading Animation - Run immediately
    // ============================================
    function hideLoader() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }

    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        hideLoader();
    });

    // Fallback: Hide loader after 3 seconds even if load event doesn't fire
    setTimeout(() => {
        hideLoader();
    }, 3000);

    // ============================================
    // Console Welcome Message
    // ============================================
    console.log('%cBokra - Your Doctor, Just One Click Away', 'color: #003285; font-size: 20px; font-weight: bold;');
    console.log('%cModern healthcare platform built with care.', 'color: #666; font-size: 12px;');

})();

