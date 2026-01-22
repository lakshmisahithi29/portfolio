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
const roles = ["Frontend Developer", "ML Engineer", "Freelancer"];
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
window.addEventListener('scroll', () => {
    const skillsSection = document.getElementById('skills');
    const navBar = document.querySelector('.floating-nav');
    
    // Only target mobile/tablet view
    if (window.innerWidth <= 768) {
        // Only trigger this if the Skills tab is currently open
        if (skillsSection.classList.contains('active')) {
            
            // Get the position of the skills section relative to the viewport
            const rect = skillsSection.getBoundingClientRect();
            
            // 50px threshold: If the top of the section is near the top of the screen, show nav.
            // If the user has scrolled down more than 50px into the section, hide nav.
            if (rect.top < -50) {
                navBar.classList.add('nav-hidden-mobile');
            } else {
                navBar.classList.remove('nav-hidden-mobile');
            }
        } else {
            // Always show nav for other sections unless you want them to hide too
            navBar.classList.remove('nav-hidden-mobile');
        }
    }
});