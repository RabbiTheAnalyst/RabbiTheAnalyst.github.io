    // ============== COMBINED SCRIPT FOR ALL ANIMATIONS (FINAL WITH ENHANCED VALIDATION) ==============

    // Initialize Lucide Icons
    lucide.createIcons();
    // এই কোডটা স্লাইডারটাকে চালু করবে
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1, // ছোট স্ক্রিনে ১টা দেখাবে
        spaceBetween: 30,
        loop: true, // শেষ হলে আবার প্রথম থেকে শুরু হবে
        autoplay: {
            delay: 1500, // নিজে নিজে ৩.৫ সেকেন্ড পর পর স্লাইড পরিবর্তন হবে
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            640: { // ট্যাবলেট স্ক্রিনে ২টা করে দেখাবে
                slidesPerView: 2,
                spaceBetween: 20,
            },
            992: { // বড় বা ডেস্কটপ স্ক্রিনে ৩টা করে দেখাবে
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });
    // এই কোডটা নতুন স্কিল স্লাইডারটাকে চালু করবে
var skillSwiper = new Swiper(".skillSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 1500, // সার্টিফিকেশন স্লাইডার থেকে একটু ভিন্ন সময়
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        // ট্যাবলেট স্ক্রিনে ২টা করে দেখাবে
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        // বড় বা ডেস্কটপ স্ক্রিনে ৩টা করে দেখাবে
        992: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
});

    // --- Navigation Auto-Highlight on Scroll (Scrollspy) ---
    document.addEventListener('DOMContentLoaded', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        if (sections.length === 0 || navLinks.length === 0) return;
        const observerOptions = { rootMargin: '-150px 0px -50% 0px', threshold: 0 };
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        }, observerOptions);
        sections.forEach(section => sectionObserver.observe(section));
        const viewResumeBtn = document.getElementById('viewResumeBtn');
        const resumeModal = document.getElementById('resumeModal');
        const closeModalBtn = resumeModal.querySelector('.close-btn');
        const modalOverlay = resumeModal.querySelector('.modal-overlay');
        const resumeFrame = document.getElementById('resumeFrame');
        const printResumeBtn = document.getElementById('printResumeBtn');
        
        const resumePath = 'Rabbi_Ali_Resume.pdf'; // Your resume file name here

        // Function to open the modal
        const openModal = () => {
            if (resumeFrame.src !== resumePath) {
                resumeFrame.src = resumePath;
            }
            resumeModal.classList.add('show');
        };

        // Function to close the modal
        const closeModal = () => {
            resumeModal.classList.remove('show');
        };

        // Event listeners
        viewResumeBtn.addEventListener('click', openModal);
        closeModalBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);

        // Print functionality
        printResumeBtn.addEventListener('click', () => {
            try {
                resumeFrame.contentWindow.print();
            } catch (error) {
                alert("Could not print the resume. Please try downloading it instead.");
                console.error("Print error:", error);
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && resumeModal.classList.contains('show')) {
                closeModal();
            }
        });
    });
    // --- Project Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.projects-grid .project-card');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filter === 'all' || (categories && categories.includes(filter))) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Theme Toggle Functionality ---
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    function updateThemeIcon(theme) {
        themeIcon.setAttribute('name', theme === 'dark' ? 'sun' : 'moon');
        lucide.createIcons();
    }

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksList = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    menuToggle.addEventListener('click', () => {
        navLinksList.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when a link is clicked (on mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinksList.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // --- Number Count-Up & Skill Bars Animation ---
    function animateCountUp(element) {
        const finalCount = parseInt(element.getAttribute('data-final-value'), 10);
        const duration = 2000;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * finalCount);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                const originalText = element.getAttribute('data-final-value');
                element.textContent = originalText.includes('+') ? finalCount + '+' : originalText;
            }
        };
        window.requestAnimationFrame(step);
    }
    function animateSkillBars() {
    document.querySelectorAll('.skill-progress-bar').forEach(bar => {
        // প্রথমে width 0% সেট করুন
        bar.style.width = '0%';
        
        // তারপর 100ms পর আসল width-এ এনিমেট করুন
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = bar.getAttribute('data-width');
        }, 100);
    });
}

    // --- Chart.js Skill Chart Creation ---
    let skillsChartInstance;
    function createSkillsChart() {
        if (skillsChartInstance) { skillsChartInstance.destroy(); }
        const ctx = document.getElementById('skillsChart').getContext('2d');
        skillsChartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Python', 'SQL', 'Data Visualization', 'Machine Learning', 'Statistical Analysis', 'Excel', 'Data Cleaning'],
                datasets: [{ label: 'Skill Level', data: [80, 85, 90, 60, 84, 85, 87], backgroundColor: 'rgba(38, 166, 154, 0.2)', borderColor: 'rgba(38, 166, 154, 1)', pointBackgroundColor: 'rgba(38, 166, 154, 1)', pointBorderColor: '#fff', pointHoverBackgroundColor: '#fff', pointHoverBorderColor: 'rgba(38, 166, 154, 1)' }]
            },
            options: { scales: { r: { angleLines: { color: 'rgba(255, 255, 255, 0.2)' }, grid: { color: 'rgba(255, 255, 255, 0.2)' }, pointLabels: { color: 'var(--text-primary)', font: { size: 14 } }, ticks: { backdropColor: 'transparent', color: 'var(--text-secondary)' } } }, plugins: { legend: { labels: { color: 'var(--text-primary)' } } } }
        });
    }

    // --- NEW & ENHANCED CONTACT FORM SCRIPT ---
const contactForm = document.getElementById('contactForm');
const formInputs = contactForm.querySelectorAll('input[required], textarea[required]');

// Create notification container if it doesn't exist
if (!document.getElementById('notification-container')) {
    const notificationContainer = document.createElement('div');
    notificationContainer.id = 'notification-container';
    document.body.appendChild(notificationContainer);
}

formInputs.forEach(input => {
    input.addEventListener('blur', (e) => validateField(e.target));
    input.addEventListener('input', (e) => clearError(e.target));
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    clearError(field);
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    }
    
    if (field.type === 'email' && value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }
    
    if (!isValid) {
        showError(field, errorMessage);
    }
    
    return isValid;
}

function showError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
    field.setAttribute('aria-invalid', 'true');
}

function clearError(field) {
    const error = field.parentNode.querySelector('.error-message');
    if (error) { error.remove(); }
    field.removeAttribute('aria-invalid');
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isFormValid = true;
    
    formInputs.forEach(input => {
        if (!validateField(input)) { isFormValid = false; }
    });

    if (!isFormValid) {
        const firstErrorField = contactForm.querySelector('[aria-invalid="true"]');
        if (firstErrorField) { firstErrorField.focus(); }
        showNotification('Please correct the errors before submitting.', 'error');
        return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);
    
    try {
        const response = await fetch(contactForm.action, { 
            method: 'POST', 
            body: formData, 
            headers: { 'Accept': 'application/json' } 
        });
        
        if (response.ok) {
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
        } else {
            showNotification('There was an error sending your message. Please try again.', 'error');
        }
    } catch (error) {
        showNotification('Network error. Please check your connection.', 'error');
    } finally {
        setTimeout(() => {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }, 3000);
    }
});

function showNotification(message, type) {
    const notificationContainer = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notificationContainer.appendChild(notification);
    
    setTimeout(() => { notification.classList.add('show'); }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => { notification.remove(); }, 300);
    }, 5000);
}

    // --- Main Intersection Observer for All Scroll Animations ---
    const mainObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const statsGrid = entry.target.querySelector('.stats-grid');
                if (statsGrid && !statsGrid.hasAttribute('data-animated')) {
                    statsGrid.querySelectorAll('.stat-number').forEach(number => {
                        const finalValue = number.textContent;
                        number.setAttribute('data-final-value', finalValue);
                        number.textContent = '0';
                        animateCountUp(number);
                    });
                    statsGrid.setAttribute('data-animated', 'true');
                }
                const skillBars = entry.target.querySelector('.skill-bars');
                if (skillBars && !skillBars.hasAttribute('data-animated')) {
    // স্কিল বারগুলো দৃশ্যমান হলে এনিমেট করুন
    setTimeout(() => {
        animateSkillBars();
        skillBars.setAttribute('data-animated', 'true');
    }, 300);
}
                const chartContainer = entry.target.querySelector('.chart-container');
                if (chartContainer && !chartContainer.hasAttribute('data-animated')) {
                    if (typeof Chart !== 'undefined') { createSkillsChart(); }
                    chartContainer.setAttribute('data-animated', 'true');
                }
                mainObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach((el) => mainObserver.observe(el));
// --- Preloader Hiding Script ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    // Add a small delay for a better feel, then hide
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('hidden');
        }
    }, 200); // 200ms delay
}); 