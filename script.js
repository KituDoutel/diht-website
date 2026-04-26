// Loading Screen
window.addEventListener('load', () => {
    const loaderWrapper = document.getElementById('loaderWrapper');
    const loaderProgressBar = document.getElementById('loaderProgressBar');
    
    // Simulate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        
        loaderProgressBar.style.width = progress + '%';
        
        if (progress === 100) {
            clearInterval(progressInterval);
            
            // Add fade-out class after a short delay
            setTimeout(() => {
                loaderWrapper.classList.add('fade-out');
                
                // Remove loader from DOM after transition
                setTimeout(() => {
                    loaderWrapper.style.display = 'none';
                }, 500);
            }, 300);
        }
    }, 200);
});

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out-cubic'
});

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const backToTop = document.getElementById('backToTop');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Navbar background
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button
    if (currentScroll > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Active link highlighting
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    lastScroll = currentScroll;
});

// Back to top
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form Validation and Submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset previous messages and error states
    formMessage.style.display = 'none';
    formMessage.className = 'form-message';
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const subjectInput = document.getElementById('subject');
    
    // Remove error classes
    [nameInput, emailInput, messageInput, subjectInput].forEach(input => {
        input.classList.remove('error');
    });
    
    // Get form values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();
    
    // Validation flags
    let isValid = true;
    let errorMessages = [];
    
    // Name validation
    if (!name) {
        nameInput.classList.add('error');
        errorMessages.push('Please enter your name');
        isValid = false;
    } else if (name.length < 2) {
        nameInput.classList.add('error');
        errorMessages.push('Name must be at least 2 characters');
        isValid = false;
    }
    
    // Email validation
    if (!email) {
        emailInput.classList.add('error');
        errorMessages.push('Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email)) {
        emailInput.classList.add('error');
        errorMessages.push('Please enter a valid email address');
        isValid = false;
    }
    
    // Message validation
    if (!message) {
        messageInput.classList.add('error');
        errorMessages.push('Please enter your message');
        isValid = false;
    } else if (message.length < 10) {
        messageInput.classList.add('error');
        errorMessages.push('Message must be at least 10 characters');
        isValid = false;
    }
    
    // Show validation errors
    if (!isValid) {
        showMessage(errorMessages.join('. '), 'error');
        return;
    }
    
    // If validation passes, simulate form submission
    submitForm({ name, email, subject, message });
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show message helper
function showMessage(message, type) {
    formMessage.innerHTML = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Add icon based on type
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    formMessage.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-hide success messages
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Simulate form submission
function submitForm(formData) {
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call (replace with actual API endpoint)
    setTimeout(() => {
        console.log('Form submitted:', formData);
        
        // Show success message
        showMessage('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
    }, 1500);
}

// Particle Effect (Simple)
function createParticles() {
    const container = document.getElementById('particlesBackground');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 5 + 3) + 's';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

// Initialize particles after loading
window.addEventListener('load', () => {
    setTimeout(createParticles, 1000);
});

// Console welcome message
console.log(`
    ╔═══════════════════════════════════════════╗
    ║   🚀 Digital Innovation Hub Timor (DIHT)  ║
    ║   Inspire, Learn, Lead                   ║
    ║   Made with ❤️ for Timor-Leste            ║
    ╚═══════════════════════════════════════════╝
`);