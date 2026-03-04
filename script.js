// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const heroLogo = document.getElementById('heroLogo');
const sections = document.querySelectorAll('section.section');
const detailButtons = document.querySelectorAll('.open-details');
const detailsModal = document.getElementById('detailsModal');
const modalCloseButton = document.getElementById('closeDetailsModal');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalDescription = document.getElementById('modalDescription');
const modalFeatures = document.getElementById('modalFeatures');

// Logo scroll effect
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    if (!heroLogo) return;

    if (scrollPosition > 50) {
        heroLogo.classList.add('scrolled');
    } else {
        heroLogo.classList.remove('scrolled');
    }
});

// Toggle hamburger menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Close hamburger menu
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');

        // Get section from data attribute
        const section = link.dataset.section;
        scrollToSection(section);
    });
});

function updateActiveNav(sectionId) {
    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === sectionId);
    });
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbar = document.querySelector('.navbar');
        const navbarOffset = navbar ? navbar.offsetHeight : 0;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY - navbarOffset;

        window.scrollTo({ top: sectionTop, behavior: 'smooth' });
        updateActiveNav(sectionId);
    }
}

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;

        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            company: formData.get('company'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        try {
            // Show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Send to backend
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Show success message
                formMessage.textContent = '✓ Message sent successfully! We will get back to you soon.';
                formMessage.classList.remove('error');
                formMessage.classList.add('success');

                // Reset form
                contactForm.reset();

                // Clear message after 5 seconds
                setTimeout(() => {
                    formMessage.classList.remove('success');
                    formMessage.textContent = '';
                }, 5000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            // Show error message
            formMessage.textContent = '✗ Error sending message. Please try again or contact us directly.';
            formMessage.classList.remove('success');
            formMessage.classList.add('error');

            console.error('Error:', error);
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}

function openDetailsModal(title, subtitle, description, features) {
    if (!detailsModal) return;

    modalTitle.textContent = title;
    modalSubtitle.textContent = subtitle || '';
    modalDescription.textContent = description || '';
    modalFeatures.innerHTML = features
        .map(feature => `<li>${feature}</li>`)
        .join('');

    detailsModal.classList.add('active');
    detailsModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeDetailsModal() {
    if (!detailsModal) return;

    detailsModal.classList.remove('active');
    detailsModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

detailButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.showcase-card, .product-card');
        if (!card) return;

        const title = card.querySelector('h3')?.textContent?.trim() || 'Offering';
        const subtitle = card.querySelector('.product-subtitle')?.textContent?.trim() || 'Service details';
        const description = card.querySelector('.product-description, .showcase-card p')?.textContent?.trim() || '';
        const features = Array.from(card.querySelectorAll('.features li, .product-features li'))
            .map(item => item.textContent.trim())
            .filter(Boolean);

        openDetailsModal(title, subtitle, description, features);
    });
});

if (modalCloseButton) {
    modalCloseButton.addEventListener('click', closeDetailsModal);
}

if (detailsModal) {
    detailsModal.addEventListener('click', (e) => {
        if (e.target === detailsModal) {
            closeDetailsModal();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDetailsModal();
    }
});

if (sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    updateActiveNav(entry.target.id);
                }
            });
        },
        {
            root: null,
            rootMargin: '-35% 0px -50% 0px',
            threshold: 0
        }
    );

    sections.forEach(section => sectionObserver.observe(section));
}

updateActiveNav('home');

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});
