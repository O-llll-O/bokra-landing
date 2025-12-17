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

    // App Type Selection
    const patientBtn = document.getElementById('patientBtn');
    const doctorBtn = document.getElementById('doctorBtn');
    const downloadLink = document.getElementById('downloadLink');
    const appName = document.getElementById('appName');
    const appDescription = document.getElementById('appDescription');
    
    // App download URLs - Update these with your actual GitHub release URLs
    const appUrls = {
        patient: 'https://github.com/USERNAME/REPO/releases/latest/download/patient-app.apk',
        doctor: 'https://github.com/USERNAME/REPO/releases/latest/download/doctor-app.apk'
    };
    
    const appNames = {
        patient: 'BOKRA Patient',
        doctor: 'BOKRA Doctor'
    };
    
    const appDescriptions = {
        patient: 'Healthcare Booking Platform for Patients',
        doctor: 'Healthcare Booking Platform for Doctors'
    };
    
    function updateAppSelection(appType) {
        // Update active button
        patientBtn.classList.toggle('active', appType === 'patient');
        doctorBtn.classList.toggle('active', appType === 'doctor');
        
        // Update download link
        downloadLink.href = appUrls[appType];
        downloadLink.download = `bokra-${appType}.apk`;
        
        // Update app name and description
        appName.textContent = appNames[appType];
        appDescription.textContent = appDescriptions[appType];
    }
    
    if (patientBtn && doctorBtn) {
        patientBtn.addEventListener('click', function() {
            updateAppSelection('patient');
        });
        
        doctorBtn.addEventListener('click', function() {
            updateAppSelection('doctor');
        });
    }
    
    // Download button click tracking with Firebase Analytics
    const downloadBtn = document.querySelector('.btn-download');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const currentAppType = patientBtn.classList.contains('active') ? 'patient' : 'doctor';
            
            // Track download button click in Firebase Analytics
            if (window.firebaseAnalytics && window.firebaseLogEvent) {
                try {
                    window.firebaseLogEvent(window.firebaseAnalytics, 'download_button_click', {
                        button_name: 'apk_download',
                        app_type: currentAppType,
                        page_location: window.location.href
                    });
                    console.log('📊 Download event tracked in Firebase Analytics');
                } catch (error) {
                    console.log('Analytics tracking error:', error);
                }
            }
            console.log(`Download button clicked for ${currentAppType} app`);
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

