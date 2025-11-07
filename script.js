/* ===================================
   EVERCENTAURY HEALTHCARE WEBSITE by Devory
   JavaScript Functionality
   =================================== */

// ===================================
// NAVIGATION & SCROLL FUNCTIONALITY
// ===================================

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navigation shadow effect on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });

    // Button interaction animations
    document.querySelectorAll('.about-btn, .contact-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===================================
// TECHNOLOGY CARDS FUNCTIONALITY
// ===================================

/**
 * Initialize interactive technology cards
 */
function initTechnologyCards() {
    const techCards = document.querySelectorAll('.tech-card');
    
    // Card titles for inactive card labels
    const cardTitles = [
        'Hospital Catering',
        'Healthcare Staffing', 
        'Facility Management',
        'Residential Catering',
        'Home Care Services'
    ];
    
    // Set up card interactions
    techCards.forEach((card, index) => {
        card.setAttribute('data-title', cardTitles[index]);
        
        // Click handler for card activation
        card.addEventListener('click', function() {
            // Remove active class from all cards
            techCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
        });
        
        // Hover effects for inactive cards
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.filter = 'brightness(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });
    
    // Auto-rotate through cards
    let currentIndex = 0;
    const autoRotate = setInterval(() => {
        techCards.forEach(c => c.classList.remove('active'));
        techCards[currentIndex].classList.add('active');
        currentIndex = (currentIndex + 1) % techCards.length;
    }, 5000);
    
    // Pause auto-rotation on hover
    const container = document.querySelector('.tech-cards-container');
    if (container) {
        container.addEventListener('mouseenter', () => clearInterval(autoRotate));
    }
}

// ===================================
// TESTIMONIALS SLIDER FUNCTIONALITY
// ===================================

/**
 * Initialize desktop testimonials slider
 */
function initTestimonialsSlider() {
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const cards = document.querySelectorAll('.testimonial-card');
    
    if (!track || !prevBtn || !nextBtn || !cards.length) return;
    
    let currentIndex = 0;
    
    // Helper functions for responsive behavior
    function getCardWidth() {
        if (window.innerWidth <= 768) {
            return window.innerWidth - 40; // Full width minus padding on mobile
        } else if (window.innerWidth <= 968) {
            return window.innerWidth - 60;
        } else {
            return 430; // Desktop width
        }
    }
    
    function getVisibleCards() {
        if (window.innerWidth <= 968) {
            return 1; // Show one card at a time on mobile/tablet
        } else {
            return Math.floor(window.innerWidth / 430);
        }
    }
    
    // Update slider position and button states
    function updateSlider() {
        const cardWidth = getCardWidth();
        const gap = window.innerWidth <= 768 ? 20 : 30;
        const translateX = -currentIndex * (cardWidth + gap);
        
        track.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= cards.length - getVisibleCards();
    }
    
    // Navigation functions
    function goToNext() {
        const maxIndex = cards.length - getVisibleCards();
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    }
    
    function goToPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    }
    
    // Event listeners for navigation buttons
    nextBtn.addEventListener('click', goToNext);
    prevBtn.addEventListener('click', goToPrev);
    
    // Auto-play slider (pause on mobile)
    let autoPlay;
    if (window.innerWidth > 968) {
        autoPlay = setInterval(goToNext, 4000);
    }
    
    // Pause auto-play on hover
    track.addEventListener('mouseenter', () => {
        if (autoPlay) clearInterval(autoPlay);
    });
    
    track.addEventListener('mouseleave', () => {
        if (window.innerWidth > 968) {
            autoPlay = setInterval(goToNext, 4000);
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const maxIndex = cards.length - getVisibleCards();
        if (currentIndex > maxIndex) {
            currentIndex = Math.max(0, maxIndex);
        }
        updateSlider();
        
        // Restart/stop autoplay based on screen size
        if (autoPlay) clearInterval(autoPlay);
        if (window.innerWidth > 968) {
            autoPlay = setInterval(goToNext, 4000);
        }
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        if (autoPlay) clearInterval(autoPlay);
    });
    
    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                goToNext();
            } else {
                goToPrev();
            }
        }
        
        if (window.innerWidth > 968) {
            autoPlay = setInterval(goToNext, 4000);
        }
    });
    
    // Initialize slider
    updateSlider();
}

/**
 * Initialize mobile testimonials functionality
 */
function initMobileTestimonials() {
    // Testimonials data
    const mobileTestimonials = [
        {
            text: "Evercentaury's catering services have transformed our hospital operations. Their consistent quality and reliability in delivering 4,000+ meals daily is unmatched in Malta.",
            name: "Dr. Maria Camilleri",
            title: "Hospital Administrator, Mater Dei",
            image: "assets/persons/download (2).jpeg"
        },
        {
            text: "The professionalism and expertise of Evercentaury's nursing staff is exceptional. They've become an integral part of our healthcare delivery system.",
            name: "Joseph Grech",
            title: "Director of Nursing, Gozo General Hospital",
            image: "assets/persons/download (6).jpeg"
        },
        {
            text: "During COVID-19, Evercentaury's rapid deployment of testing and vaccination personnel was crucial to our national response. Their agility saved lives.",
            name: "Hon. Chris Fearne",
            title: "Former Deputy Prime Minister & Health Minister",
            image: "assets/persons/download (7).jpeg"
        }
    ];

    let currentMobileIndex = 0;
    
    // Update testimonial content
    function updateMobileTestimonial() {
        const current = mobileTestimonials[currentMobileIndex];
        const textEl = document.getElementById('mobileTestimonialText');
        const nameEl = document.getElementById('mobileAuthorName');
        const titleEl = document.getElementById('mobileAuthorTitle');
        const imgEl = document.getElementById('mobileAuthorImg');
        
        if (textEl) textEl.textContent = current.text;
        if (nameEl) nameEl.textContent = current.name;
        if (titleEl) titleEl.textContent = current.title;
        if (imgEl) {
            imgEl.src = current.image;
            imgEl.alt = current.name;
        }
        
        // Update dots
        document.querySelectorAll('.mobile-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentMobileIndex);
        });
    }
    
    // Create navigation dots
    function createMobileDots() {
        const dotsContainer = document.getElementById('mobileDots');
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = ''; // Clear existing dots
        mobileTestimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'mobile-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentMobileIndex = index;
                updateMobileTestimonial();
            });
            dotsContainer.appendChild(dot);
        });
    }
    
    // Initialize mobile testimonials
    createMobileDots();
    updateMobileTestimonial();
    
    // Auto-rotate every 4 seconds
    setInterval(() => {
        currentMobileIndex = (currentMobileIndex + 1) % mobileTestimonials.length;
        updateMobileTestimonial();
    }, 4000);
}

// ===================================
// FAQ FUNCTIONALITY
// ===================================

/**
 * Initialize FAQ accordion functionality
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // If this item wasn't active, open it
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Services Section Tab Functionality
function initServicesSection() {
    const tabs = document.querySelectorAll('.service-tab');
    const contents = document.querySelectorAll('.service-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const service = tab.getAttribute('data-service');

            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const activeContent = document.querySelector(`.service-content[data-service="${service}"]`);
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initServicesSection);

// ===================================
// SCROLL ANIMATIONS
// ===================================

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animateElements = document.querySelectorAll('.animate-on-scroll, .animate-stagger');
    animateElements.forEach(el => observer.observe(el));
}

/**
 * Initialize hero section load animations
 */
function initHeroAnimations() {
    window.addEventListener('load', () => {
        const heroElements = document.querySelectorAll('.hero .animate-on-load');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 200);
        });
    });
}

// ===================================
// FORM HANDLING
// IMPORTANT NOTE: Read README.md - we've set up everything you just have to change your endpoint at the bottom I marked it. Otherwise success modal .etc is all automatically set up.
// ===================================
/**
 * Initialize contact form functionality with backend integration
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.firstName || !data.lastName || !data.email || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            try {
                // REPLACE THIS URL WITH YOUR BACKEND ENDPOINT -- IMPORTANT!!!
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                if (response.ok) {
                    // Success - show modal and reset form
                    showSuccessModal();
                    form.reset();
                } else {
                    throw new Error('Failed to send message');
                }
                
            } catch (error) {
                console.error('Error:', error);
                alert('Sorry, there was an error sending your message. Please try again.');
            }
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }
}

/**
 * Show success modal
 */
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('show');
}

/**
 * Close success modal
 */
function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
}

// ===================================
// DOT MATRIX VISUALIZATION
// ===================================

/**
 * Initialize dot matrix visualization for stats
 */
function initDotMatrix() {
    const dotMatrices = document.querySelectorAll('.dot-matrix');

    dotMatrices.forEach(matrix => {
        // Always use same grid: 20x15 = 300 dots (looks perfect on both desktop and mobile)
        const totalDots = 300;
        const activeDots = totalDots; // Show ALL dots

        // Create dots
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot-matrix-dot';
            matrix.appendChild(dot);
        }

        // Activate dots with animation
        const dots = matrix.querySelectorAll('.dot-matrix-dot');
        let activated = 0;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && activated === 0) {
                    // Activate dots with staggered animation
                    const interval = setInterval(() => {
                        if (activated < activeDots) {
                            dots[activated].classList.add('active');
                            activated++;
                        } else {
                            clearInterval(interval);
                        }
                    }, 10);
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(matrix);
    });
}

// ===================================
// INITIALIZATION
// ===================================

/**
 * Initialize all functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initTechnologyCards();
    initTestimonialsSlider();
    initScrollAnimations();
    initHeroAnimations();
    initFAQ();
    initContactForm();
    initDotMatrix();

    // Initialize mobile testimonials with slight delay to ensure DOM is ready
    setTimeout(initMobileTestimonials, 100);
});

/* ===================================
   CERTIFICATES TAB FUNCTIONALITY
   =================================== */

// Add this to your existing script.js file

document.addEventListener('DOMContentLoaded', function() {
    // Certificate tabs functionality
    const certTabs = document.querySelectorAll('.cert-tab');
    const certContents = document.querySelectorAll('.cert-company-content');
    
    certTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const company = this.getAttribute('data-company');
            
            // Remove active class from all tabs and contents
            certTabs.forEach(t => t.classList.remove('active'));
            certContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.querySelector(`.cert-company-content[data-company="${company}"]`).classList.add('active');
        });
    });
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Debounce function for performance optimization
 */
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

/**
 * Throttle function for scroll events
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================
// PERFORMANCE OPTIMIZATIONS
// ===================================

/**
 * Optimize scroll events with throttling
 */
window.addEventListener('scroll', throttle(() => {
    // Any additional scroll-based functionality can be added here
}, 16)); // ~60fps

/**
 * Handle window resize events
 */
window.addEventListener('resize', debounce(() => {
    // Any resize-based functionality can be added here
}, 250));

// ===================================
// SCROLL TO TOP BUTTON
// ===================================

/**
 * Initialize scroll to top button
 */
function initScrollToTop() {
    const scrollButton = document.getElementById('scrollToTop');

    if (!scrollButton) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    // Scroll to top on click
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
initScrollToTop();