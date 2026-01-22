// 1. Navigation Switching
const navButtons = document.querySelectorAll('.nav-btn');
const tabs = document.querySelectorAll('.tab-content');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        navButtons.forEach(b => b.classList.remove('active'));
        tabs.forEach(t => t.classList.remove('active'));

        btn.classList.add('active');
        const target = btn.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
    });
});

// 2. Typewriter Effect
const textElement = document.getElementById('dynamic-text');
const roles = ["Frontend developer","ML Engineer","Freelancer"];
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

    let typeSpeed = isDeleting ? 100 : 200;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(type, typeSpeed);
}
type();

// 3. Reactive Send Button Logic
const contactForm = document.getElementById('contact-form');
const sendBtn = document.getElementById('send-btn');
const btnText = sendBtn.querySelector('.btn-text');
const btnIcon = sendBtn.querySelector('.btn-icon i');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Loading State
    sendBtn.classList.add('loading');
    btnText.textContent = 'Sending...';
    btnIcon.className = 'fa-solid fa-spinner fa-spin';

    // Simulate Network Delay
    setTimeout(() => {
        sendBtn.classList.remove('loading');
        sendBtn.classList.add('success');
        btnText.textContent = 'Sent Successfully!';
        btnIcon.className = 'fa-solid fa-check';

        // Reset Form
        setTimeout(() => {
            sendBtn.classList.remove('success');
            btnText.textContent = 'Send Message';
            btnIcon.className = 'fa-solid fa-paper-plane';
            contactForm.reset();
        }, 3000);
    }, 2000);
});