/* -------------------------------------------------------------------------- */
/*                    EMAILJS INITIALIZATION (Free Service)                  */
/* -------------------------------------------------------------------------- */
/*
  HOW TO SET UP:
  1. Go to https://www.emailjs.com/
  2. Create a FREE account
  3. Get your Service ID and Public Key
  4. Replace the values below in the code
  5. Add an email service (Gmail recommended)
  6. Create an email template with variables:
     - {{from_name}} - User's name
     - {{from_email}} - User's email
     - {{phone}} - User's phone
     - {{subject}} - Message subject
     - {{message}} - Message body
     - {{contact_method}} - Preferred contact method
*/

// Replace these with your EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_xxxxxxx'; // Get from EmailJS Dashboard
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx'; // Get from EmailJS Dashboard
const EMAILJS_PUBLIC_KEY = 'xxxxxxxxxxxxxxx'; // Get from EmailJS Account

// Initialize EmailJS (Uncomment after adding your credentials)
// emailjs.init(EMAILJS_PUBLIC_KEY);

/* -------------------------------------------------------------------------- */
/*                          TYPING ANIMATION FUNCTION                         */
/* -------------------------------------------------------------------------- */
const words = ['Shruti'];
const typingText = document.getElementById('typing-text');

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      setTimeout(() => (isDeleting = true), 1200);
    }
  } else {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  const speed = isDeleting ? 80 : 140;
  setTimeout(typeLoop, speed);
}

typeLoop();

/* -------------------------------------------------------------------------- */
/*                        HAMBURGER MENU FUNCTIONALITY                       */
/* -------------------------------------------------------------------------- */

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

document.addEventListener('click', (e) => {
  const isClickInsideNav = navMenu.contains(e.target);
  const isClickOnHamburger = hamburger.contains(e.target);

  if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

/* -------------------------------------------------------------------------- */
/*                            SMOOTH SCROLLING                               */
/* -------------------------------------------------------------------------- */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

/* -------------------------------------------------------------------------- */
/*                        SKILLS PROGRESS ANIMATION                          */
/* -------------------------------------------------------------------------- */

const progressBars = document.querySelectorAll('.progress-fill');

const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const value = entry.target.getAttribute('data-value');
      entry.target.style.width = value + '%';
    }
  });
}, observerOptions);

progressBars.forEach((bar) => {
  observer.observe(bar);
});

/* -------------------------------------------------------------------------- */
/*                          CONTACT FORM HANDLER                             */
/* -------------------------------------------------------------------------- */

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form data
  const formData = {
    from_name: document.getElementById('name').value,
    from_email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
    contact_method: document.getElementById('contact-method').value,
  };

  // Show loading state
  const submitBtn = contactForm.querySelector('.submit-btn');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
      // Fallback: Save to localStorage and show instructions
      saveFormLocally(formData);
      showMessage(
        'Email service not configured yet. Form saved locally. Contact details: shrutijoshi1481995@gmail.com',
        'success'
      );
    } else {
      // Send via EmailJS
      const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData);

      if (response.status === 200) {
        showMessage(
          'Message sent successfully! I will get back to you within 24 hours.',
          'success'
        );
        contactForm.reset();
      }
    }
  } catch (error) {
    console.error('Error:', error);
    showMessage(
      'Error sending message. Please try again or contact directly: shrutijoshi1481995@gmail.com',
      'error'
    );
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});

// Save form data locally for demo
function saveFormLocally(data) {
  const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  messages.push({
    ...data,
    timestamp: new Date().toLocaleString(),
  });
  localStorage.setItem('contactMessages', JSON.stringify(messages));
  console.log('Form saved locally:', data);
}

// Show form message
function showMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;

  setTimeout(() => {
    formMessage.className = 'form-message';
  }, 5000);
}

/* -------------------------------------------------------------------------- */
/*                        HEADER SHADOW ON SCROLL                            */
/* -------------------------------------------------------------------------- */

const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
});

/* -------------------------------------------------------------------------- */
/*                         FADE IN ON SCROLL                                 */
/* -------------------------------------------------------------------------- */

const cards = document.querySelectorAll('.card, .skill-card, .project-card');

const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn 0.6s ease forwards';
        fadeInObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

cards.forEach((card) => {
  fadeInObserver.observe(card);
});

// Add fade in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

/* -------------------------------------------------------------------------- */
/*                        FORM INPUT VALIDATION                              */
/* -------------------------------------------------------------------------- */

const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach((input) => {
  input.addEventListener('blur', () => {
    if (input.value.trim() === '' && input.hasAttribute('required')) {
      input.style.borderColor = '#ea8679';
    } else {
      input.style.borderColor = '#e5e7eb';
    }
  });
});

/* -------------------------------------------------------------------------- */
/*                        SCROLL ACTIVE NAV LINK                             */
/* -------------------------------------------------------------------------- */

window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section, main');

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-menu a').forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});
