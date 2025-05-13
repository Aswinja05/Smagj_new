window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const cont_btn = document.querySelector('#contact-us-toggle');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        cont_btn.classList.add('added');
    } else {
        navbar.classList.remove('scrolled');
        cont_btn.classList.remove('added');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Hero slider functionality
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let isAnimating = false;
let slideshowInterval;

function showSlide(index) {
    if (isAnimating) return;
    isAnimating = true;

    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));

    // Add active class to target slide
    slides[index].classList.add('active');

    // Update current slide index
    currentSlide = index;

    // Reset animation lock after transition completes
    setTimeout(() => {
        isAnimating = false;
    }, 1200); // Match this with your CSS transition time
}

function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
}

// Initialize autoplay
function startSlideshow() {
    stopSlideshow();
    slideshowInterval = setInterval(nextSlide, 5000);
}

function stopSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
}

// Event listeners for manual navigation
document.getElementById('nextSlide').addEventListener('click', function () {
    nextSlide();
    startSlideshow(); // Reset the timer
});

document.getElementById('prevSlide').addEventListener('click', function () {
    prevSlide();
    startSlideshow(); // Reset the timer
});

// Start the slideshow automatically when the page loads
document.addEventListener('DOMContentLoaded', function () {
    showSlide(0);         // Show the first slide initially
    startSlideshow();     // Start the automatic slideshow
});

// Pause slideshow when hovering over the hero section
const heroSection = document.querySelector('.hero');
heroSection.addEventListener('mouseenter', stopSlideshow);
heroSection.addEventListener('mouseleave', startSlideshow);
// Touchscreen swipe support
let touchStartX = 0;
let touchEndX = 0;
heroSection.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});
heroSection.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});
function handleSwipe() {
    const threshold = 50;
    if (touchEndX - touchStartX > threshold) {
        // Swipe right - show previous slide
        prevSlide();
        startSlideshow();
    } else if (touchStartX - touchEndX > threshold) {
        // Swipe left - show next slide
        nextSlide();
        startSlideshow();
    }
}
// Start the slideshow initially
document.addEventListener('DOMContentLoaded', function() {
    // Make sure first slide is active
    if (!slides[0].classList.contains('active')) {
        slides[0].classList.add('active');
    }
    startSlideshow();
});
// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        startSlideshow();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        startSlideshow();
    }
});
// Pause slideshow when page is not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopSlideshow();
    } else {
        startSlideshow();
    }
});

// Scroll animation
const fadeElems = document.querySelectorAll('.fade-in');

function checkFade() {
    fadeElems.forEach(elem => {
        const elemTop = elem.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight * 0.8;
        
        if (elemTop < triggerBottom) {
            elem.classList.add('appear');
        }
    });
}

window.addEventListener('scroll', checkFade);
window.addEventListener('load', checkFade);

// Testimonial slider
const testimonials = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

dots.forEach(dot => {
    dot.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        showTestimonial(index);
    });
});

function nextTestimonial() {
    const next = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(next);
}

// Change testimonial every 7 seconds
setInterval(nextTestimonial, 7000);

// // Dark mode toggle
// const darkModeToggle = document.querySelector('.dark-mode-toggle');

// darkModeToggle[0].addEventListener('click', function() {
//     document.body.classList.toggle('dark-mode');
    
//     // Save preference to local storage
//     if (document.body.classList.contains('dark-mode')) {
//         localStorage.setItem('darkMode', 'enabled');
//         darkModeToggle.textContent = '☀️';
//     } else {
//         localStorage.setItem('darkMode', null);
//         darkModeToggle.textContent = '🌓';
//     }
// });

// // Check for saved dark mode preference
// if (localStorage.getItem('darkMode') === 'enabled') {
//     document.body.classList.add('dark-mode');
//     darkModeToggle.textContent = '☀️';
// }

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Handle contact button click
document.querySelector('.contact-btn').addEventListener('click', function() {
    window.location.href = '/contact';
});
document.querySelector('#contact-us-toggle').addEventListener('click', function() {
    window.location.href = '/contact';
});
const prevSlideBtn = document.getElementById('prevSlide');
const nextSlideBtn = document.getElementById('nextSlide');

// Testimonial navigation buttons
const prevTestimonialBtn = document.getElementById('prevTestimonial');
const nextTestimonialBtn = document.getElementById('nextTestimonial');

// prevTestimonialBtn.addEventListener('click', function() {
//     const prev = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
//     showTestimonial(prev);
//     resetTestimonialInterval();
// });

// nextTestimonialBtn.addEventListener('click', function() {
//     nextTestimonial();
//     resetTestimonialInterval();
// });

// Variable to track auto-rotation
let testimonialInterval = setInterval(nextTestimonial, 7000);

// Reset interval when manual navigation occurs
function resetTestimonialInterval() {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(nextTestimonial, 7000);
}