// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    // Update theme icon
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('light-theme')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const phrases = ['Full Stack Developer', 'UI/UX Designer', 'Creative Coder'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 150);
    }
}

type();

// Project Card Hover Effects with Parallax
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--mouse-x', '0px');
        card.style.setProperty('--mouse-y', '0px');
    });
});

// Skill Category Hover Effects
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(category => {
    category.addEventListener('mouseenter', () => {
        category.style.transform = 'translateY(-5px)';
    });
    
    category.addEventListener('mouseleave', () => {
        category.style.transform = 'translateY(0)';
    });
});

// Experience Timeline Animation
const experienceItems = document.querySelectorAll('.experience-item');
experienceItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const responsibilities = item.querySelectorAll('.responsibilities li');
        responsibilities.forEach((li, index) => {
            setTimeout(() => {
                li.style.opacity = '1';
                li.style.transform = 'translateX(0)';
            }, index * 100);
        });
    });
    
    item.addEventListener('mouseleave', () => {
        const responsibilities = item.querySelectorAll('.responsibilities li');
        responsibilities.forEach(li => {
            li.style.opacity = '0';
            li.style.transform = 'translateX(-20px)';
        });
    });
});

// Contact Form Handling with Validation
const contactForm = document.getElementById('contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--primary-color)';
    });
    
    input.addEventListener('blur', () => {
        input.style.borderColor = '';
    });
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    let isValid = true;
    formInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
        }
    });
    
    if (!isValid) {
        alert('Please fill in all fields!');
        return;
    }
    
    // Here you would typically send the data to your backend
    console.log('Form submitted:', data);
    
    // Reset form
    contactForm.reset();
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
});

// Add scroll progress indicator
const progressIndicator = document.createElement('div');
progressIndicator.className = 'scroll-progress';
document.body.appendChild(progressIndicator);

window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressIndicator.style.width = `${scrollPercentage}%`;
});

// Add scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'translateY(20px)';
    }
});

// Add styles for new elements
const style = document.createElement('style');
style.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        width: 0;
        z-index: 1001;
    }

    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
        border: none;
        color: var(--background-color);
        cursor: pointer;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 1001;
    }

    .scroll-to-top:hover {
        transform: translateY(-5px);
    }

    .scroll-to-top i {
        font-size: 1.5rem;
    }

    .scroll-down {
        transform: translateY(-100%);
        transition: transform 0.3s ease;
    }

    .scroll-up {
        transform: translateY(0);
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);
