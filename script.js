// 1. Navigation Switching with Smooth Transition 
const navButtons = document.querySelectorAll('.nav-btn');
const tabs = document.querySelectorAll('.tab-content');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        navButtons.forEach(b => b.classList.remove('active'));
        tabs.forEach(t => t.classList.remove('active'));

        // Add active class to clicked
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        
        targetElement.classList.add('active');
        
        // Scroll to top of container smoothly on mobile
        if(window.innerWidth <= 576) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

// 2. Optimized Typewriter Effect
const textElement = document.getElementById('dynamic-text');
const roles = ["Frontend Developer","ML Explorer", "Freelancer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        textElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 70 : 150;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at full word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Initial call
document.addEventListener('DOMContentLoaded', type);
let lastScrollY = window.scrollY;
const navBar = document.querySelector('.floating-nav');

window.addEventListener('scroll', () => {
    // Only run logic if on mobile view
    if (window.innerWidth <= 768) {
        const currentScrollY = window.scrollY;

        // 1. Hide on Scroll Down (after scrolling at least 50px)
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
            navBar.classList.add('nav-hidden');
        } 
        // 2. Show on Scroll Up
        else if (currentScrollY < lastScrollY) {
            navBar.classList.remove('nav-hidden');
        }

        // 3. Always show when at the very top of the page
        if (currentScrollY <= 10) {
            navBar.classList.remove('nav-hidden');
        }

        lastScrollY = currentScrollY;
    }
}, { passive: true });
