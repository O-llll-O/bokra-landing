// BOKRA Landing Page - JavaScript
// Minimal JavaScript for interactivity

(function() {
    'use strict';

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 50, 133, 0.1)';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 50, 133, 0.05)';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        }
        
        lastScroll = currentScroll;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and role cards
    document.querySelectorAll('.feature-card, .role-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(card);
    });

    // Download buttons tracking with Firebase Analytics
    const patientDownloadLink = document.getElementById('patientDownloadLink');
    const doctorDownloadLink = document.getElementById('doctorDownloadLink');
    
    if (patientDownloadLink) {
        patientDownloadLink.addEventListener('click', function() {
            // Track patient app download
            if (window.firebaseAnalytics && window.firebaseLogEvent) {
                try {
                    window.firebaseLogEvent(window.firebaseAnalytics, 'download_button_click', {
                        button_name: 'patient_app_download',
                        app_type: 'patient',
                        page_location: window.location.href
                    });
                    console.log('📊 Patient app download tracked in Firebase Analytics');
                } catch (error) {
                    console.log('Analytics tracking error:', error);
                }
            }
            console.log('Patient app download clicked');
        });
    }
    
    if (doctorDownloadLink) {
        doctorDownloadLink.addEventListener('click', function() {
            // Track doctor app download
            if (window.firebaseAnalytics && window.firebaseLogEvent) {
                try {
                    window.firebaseLogEvent(window.firebaseAnalytics, 'download_button_click', {
                        button_name: 'doctor_app_download',
                        app_type: 'doctor',
                        page_location: window.location.href
                    });
                    console.log('📊 Doctor app download tracked in Firebase Analytics');
                } catch (error) {
                    console.log('Analytics tracking error:', error);
                }
            }
            console.log('Doctor app download clicked');
        });
    }

    // Handle mobile menu visibility on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Animate stats on scroll
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const finalValue = stat.textContent;
                    const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                    if (!isNaN(numericValue) && numericValue > 0) {
                        let current = 0;
                        const increment = numericValue / 50;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= numericValue) {
                                stat.textContent = finalValue;
                                clearInterval(timer);
                            } else {
                                stat.textContent = Math.floor(current) + finalValue.replace(/\d/g, '');
                            }
                        }, 30);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

})();

