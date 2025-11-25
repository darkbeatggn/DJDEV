// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Smooth scroll for scroll-down button
document.addEventListener('DOMContentLoaded', function() {
    const scrollDownBtn = document.querySelector('.scroll-down-btn');
    
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Enhanced floating elements for mobile
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const randomX = Math.random() * 80 + 10;
        const randomY = Math.random() * 80 + 10;
        const randomDelay = Math.random() * 5;
        const randomDuration = Math.random() * 3 + 5;
        
        element.style.left = `${randomX}%`;
        element.style.top = `${randomY}%`;
        element.style.animationDelay = `${randomDelay}s`;
        element.style.animationDuration = `${randomDuration}s`;
        
        if (window.innerWidth <= 768) {
            element.style.opacity = '0.5';
            element.style.animationDuration = '8s';
        }
    });
    
    window.addEventListener('resize', function() {
        floatingElements.forEach(element => {
            if (window.innerWidth <= 768) {
                element.style.opacity = '0.5';
                element.style.animationDuration = '8s';
            } else {
                element.style.opacity = '0.7';
                element.style.animationDuration = '6s';
            }
        });
    });
});

// Google Drive Video Sources - EMBEDDED PLAYBACK
const videoSources = [
    'https://drive.google.com/file/d/1kq4fYczd30f4bZ5MD_i-P6Pb5_N3kT0S/preview',
    'https://drive.google.com/file/d/1NzaXcKeGI92g7pUTa0_naU_1bZGVwVRy/preview',
    'https://drive.google.com/file/d/1VAejMvlHcL3H8K52QxekKtSabYG59ffh/preview'
];

// Video Modal Functionality
const videoModal = document.getElementById('videoModal');
const modalVideoContainer = document.querySelector('.video-container');
const closeModal = document.querySelector('.close-modal');
const videoThumbnails = document.querySelectorAll('.video-thumbnail');

// Initialize video modal if elements exist
if (videoThumbnails.length > 0 && modalVideoContainer) {
    videoThumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            // Create iframe for Google Drive embedded player
            const iframe = document.createElement('iframe');
            iframe.src = videoSources[index];
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.frameBorder = '0';
            iframe.allow = 'autoplay; encrypted-media; fullscreen';
            iframe.allowFullscreen = true;
            
            // Clear previous content and add new iframe
            modalVideoContainer.innerHTML = '';
            modalVideoContainer.appendChild(iframe);
            
            // Show modal
            if (videoModal) {
                videoModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

// Close modal when clicking the X
if (closeModal) {
    closeModal.addEventListener('click', () => {
        if (videoModal) {
            videoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            // Clear iframe when closing
            if (modalVideoContainer) {
                modalVideoContainer.innerHTML = '';
            }
        }
    });
}

// Close modal when clicking outside the content
window.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Clear iframe when closing
        if (modalVideoContainer) {
            modalVideoContainer.innerHTML = '';
        }
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.style.display === 'block') {
        videoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Clear iframe when closing
        if (modalVideoContainer) {
            modalVideoContainer.innerHTML = '';
        }
    }
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
});

// Performance optimization: Throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
            scrollTimeout = null;
        }, 100);
    }
});

// Add scroll animations for sections
document.addEventListener('DOMContentLoaded', function() {
    // Create Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(function(section) {
        observer.observe(section);
    });
});

// Fix for any potential console errors
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dark Beats website loaded successfully!');
});