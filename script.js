// Initialize AOS with responsive settings
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    disable: 'mobile'
});

// Handle viewport changes
function handleViewportChange(e) {
    if (window.innerWidth <= 768) {
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.removeAttribute('data-aos');
        });
    }
}

// Add viewport change listener
window.addEventListener('resize', handleViewportChange);
window.addEventListener('orientationchange', handleViewportChange);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navList.classList.contains('active')) {
                toggleMenu();
            }
        }
    });
});

// Detect if device supports hover
const supportsHover = window.matchMedia('(hover: hover)').matches;
if (!supportsHover) {
    document.body.classList.add('touch-device');
}

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const body = document.querySelector('body');

// Create overlay
const overlay = document.createElement('div');
overlay.classList.add('overlay');
body.appendChild(overlay);

// Toggle menu
function toggleMenu() {
    hamburger.classList.toggle('active');
    navList.classList.toggle('active');
    overlay.classList.toggle('active');
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking outside
overlay.addEventListener('click', toggleMenu);

// Close menu when clicking escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList.classList.contains('active')) {
        toggleMenu();
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navList.classList.remove('active');
    });
});

// Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');

// Apply saved theme on load
document.documentElement.setAttribute('data-theme', currentTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Handle menu on device rotation
window.addEventListener('orientationchange', () => {
    if (navList.classList.contains('active')) {
        toggleMenu();
    }
});

// Handle responsive images
function handleResponsiveImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (window.innerWidth <= 768) {
            img.loading = 'lazy';
        }
    });
}

// Call on load and resize
window.addEventListener('load', handleResponsiveImages);
window.addEventListener('resize', handleResponsiveImages);

// Handle touch events for mobile
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    const menuItems = document.querySelectorAll('.nav-list a');
    menuItems.forEach(item => {
        item.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.click();
        });
    });
}