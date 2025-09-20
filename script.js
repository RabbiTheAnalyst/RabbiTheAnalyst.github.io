// ============== COMBINED SCRIPT FOR ALL ANIMATIONS (FINAL WITH ENHANCED VALIDATION) ==============

// Initialize Lucide Icons
lucide.createIcons();

// এই কোডটা স্লাইডারটাকে চালু করবে
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1, // ছোট স্ক্রিনে ১টা দেখাবে
    spaceBetween: 30,
    loop: true, // শেষ হলে আবার প্রথম থেকে শুরু হবে
    autoplay: {
        delay: 2500, // নিজে নিজে ২.৫ সেকেন্ড পর পর স্লাইড পরিবর্তন হবে
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
        992: { // বড় বা ডেস্কটপ স্ক্রিনে ৩টা করে দেখাবে
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
        delay: 3000, // সার্টিফিকেশন স্লাইডার থেকে একটু ভিন্ন সময়
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

// --- Navigation, Modal, GitHub Fetch, and Slideshow Logic ---
document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Auto-Highlight on Scroll (Scrollspy) ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    if (sections.length > 0 && navLinks.length > 0) {
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
    }
    // AI Recommendation Engine
const optionCards = document.querySelectorAll('.option-card');
if (optionCards.length > 0) {
    const resultContent = document.querySelector('.result-content');
    const resultPlaceholder = document.querySelector('.result-placeholder');
    const solutionFeatures = document.querySelector('.solution-features');
    const timelineDays = document.querySelector('.timeline-days');
    const timelineProgress = document.querySelector('.timeline-progress');
    
    const solutions = {
        dashboard: {
    features: [
        "Custom DAX measures & KPIs",
        "Advanced data modeling & ETL",
        "Interactive filters & bookmarks",
        "Cloud publishing & auto-refresh"
    ],
    timeline: 12 // আপনি চাইলে টাইমলাইনও পরিবর্তন করতে পারেন
},
        analysis: {
            features: [ "Data cleaning & preparation", "Statistical analysis", "Key trend identification", "Actionable business insights" ],
            timeline: 10
        },
        prediction: {
            features: [ "ML model development", "Historical data validation", "Future trend forecasting", "Model accuracy reporting" ],
            timeline: 21
        },
        report: {
            features: [ "Automated data pipeline", "Custom report design", "Scheduled delivery", "Key metric highlighting" ],
            timeline: 8
        }
    };
    
    optionCards.forEach(card => {
        card.addEventListener('click', function() {
            // কার্ড নির্বাচন হ্যান্ডেল করা
            optionCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            const solutionType = this.getAttribute('data-value');
            const solution = solutions[solutionType];
            
            // ফলাফল দেখানো
            resultPlaceholder.style.display = 'none';
            resultContent.classList.remove('hidden');
            resultContent.style.display = 'block';

            // ফিচারগুলো আপডেট করা
            solutionFeatures.innerHTML = '';
            solution.features.forEach(feature => {
                const featureItem = document.createElement('div');
                featureItem.className = 'feature-item';
                featureItem.innerHTML = `<i data-lucide="check-circle-2"></i><span>${feature}</span>`;
                solutionFeatures.appendChild(featureItem);
            });
            
            // টাইমলাইন আপডেট করা
            timelineDays.textContent = `${solution.timeline - 3} - ${solution.timeline} days`;
            
            // টাইমলাইন বারের অ্যানিমেশন রিসেট এবং চালু করা
            timelineProgress.style.width = '0%';
            setTimeout(() => {
                const maxTimeline = 21; // সব টাইমলাইনের মধ্যে সর্বোচ্চ দিন
                timelineProgress.style.width = `${(solution.timeline / maxTimeline) * 100}%`;
            }, 100);
            
            // Lucide আইকনগুলো রিফ্রেশ করা
            lucide.createIcons();
        });
    });
}
// Data Simulator JavaScript
const simulatorSection = document.getElementById('data-simulator');
if (simulatorSection) {
    const progressSteps = simulatorSection.querySelectorAll('.progress-step');
    const simulatorSteps = simulatorSection.querySelectorAll('.simulator-step');
    const prevBtn = simulatorSection.querySelector('.simulator-prev');
    const nextBtn = simulatorSection.querySelector('.simulator-next');
    const restartBtn = simulatorSection.querySelector('.simulator-restart');
    let currentStep = 1;
    let userChoices = {};

    const insightsData = {
        ecommerce: {
            clustering: { findings: ["Identified 5 distinct customer segments", "High-value segment: 22% of customers, 68% of revenue", "Recommended targeting strategy for each segment"], impact: { conversion: "15-30%", retention: "25%", roi: "18%" } },
            trend: { findings: ["Seasonal peak in sales during Q4", "Significant growth in mobile user traffic", "Identified underperforming product categories"], impact: { conversion: "10-20%", retention: "15%", roi: "12%" } },
            correlation: { findings: ["Strong correlation between page views and purchase amount", "Positive link between free shipping and cart size", "Negative correlation between cart abandonment and product reviews"], impact: { conversion: "12-25%", retention: "10%", roi: "20%" } }
        },
        saas: {
            clustering: { findings: ["Segmented users into 'Power Users', 'Trial Users', and 'Churn Risks'", "Power users utilize advanced features 3x more", "Churn risks show a 70% drop in activity before unsubscribing"], impact: { conversion: "20-35%", retention: "30%", roi: "22%" } },
            trend: { findings: ["Feature adoption rate increased by 40% after UI update", "User engagement peaks on Tuesdays", "Identified most and least used features"], impact: { conversion: "15-25%", retention: "20%", roi: "15%" } },
            correlation: { findings: ["Correlation between tutorial completion and user retention", "Users who invite team members have 2x higher lifetime value", "Positive link between using integration features and subscription upgrades"], impact: { conversion: "10-20%", retention: "40%", roi: "25%" } }
        },
        healthcare: {
            clustering: { findings: ["Grouped patients based on risk factors and lifestyle", "Identified high-risk group for proactive intervention", "Segmented hospital readmission rates by patient profile"], impact: { conversion: "N/A", retention: "30% reduction in readmissions", roi: "20% cost saving" } },
            trend: { findings: ["Seasonal spike in flu cases during winter", "Steady increase in telehealth appointments post-2020", "Analysis of patient waiting times and resource allocation"], impact: { conversion: "N/A", retention: "25% improvement in patient satisfaction", roi: "15% operational efficiency" } },
            correlation: { findings: ["Strong link between regular check-ups and lower emergency visits", "Correlation between medication adherence and health outcomes", "Identified demographic factors linked to specific chronic diseases"], impact: { conversion: "N/A", retention: "10% better patient outcomes", roi: "12% better resource use" } }
        }
    };

    function updateSimulatorView() {
        progressSteps.forEach(step => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            step.classList.remove('active', 'completed');
            if (stepNum === currentStep) step.classList.add('active');
            else if (stepNum < currentStep) step.classList.add('completed');
        });

        simulatorSteps.forEach(step => {
            step.classList.toggle('active', parseInt(step.getAttribute('data-step')) === currentStep);
        });

        prevBtn.disabled = currentStep === 1;
        nextBtn.classList.toggle('hidden', currentStep === 4);
        restartBtn.classList.toggle('hidden', currentStep !== 4);
    }

    function goToNextStep() {
        if (currentStep < 4) {
            currentStep++;
            if (currentStep === 4) generateInsights();
            updateSimulatorView();
            nextBtn.disabled = true;
        }
    }

    function goToPreviousStep() {
        if (currentStep > 1) {
            currentStep--;
            updateSimulatorView();
            nextBtn.disabled = false;
        }
    }

    function restartSimulator() {
        currentStep = 1;
        userChoices = {};
        document.querySelectorAll('.dataset-option, .analysis-option, .viz-option').forEach(o => o.classList.remove('selected'));
        simulatorSection.querySelector('.parameter-controls').classList.add('hidden');
        simulatorSection.querySelector('.dataset-description').textContent = 'Select a dataset to begin the analysis simulation';
        if (window.simulatorChartInstance) window.simulatorChartInstance.destroy();
        updateSimulatorView();
        nextBtn.disabled = true;
    }

    function generateInsights() {
        const dataset = userChoices.dataset || 'ecommerce';
        const method = userChoices.method || 'clustering';
        const insight = insightsData[dataset][method];

        const findingsList = simulatorSection.querySelector('.findings-list');
        const impactMetrics = simulatorSection.querySelector('.impact-metrics');

        findingsList.innerHTML = insight.findings.map(f => `<li><i data-lucide="check-circle"></i><span>${f}</span></li>`).join('');
        impactMetrics.innerHTML = `
            <div class="impact-metric"><span class="metric-value">${insight.impact.conversion}</span><span class="metric-label">Increase in conversion</span></div>
            <div class="impact-metric"><span class="metric-value">${insight.impact.retention}</span><span class="metric-label">Higher customer retention</span></div>
            <div class="impact-metric"><span class="metric-value">${insight.impact.roi}</span><span class="metric-label">ROI on marketing spend</span></div>
        `;
        lucide.createIcons();
    }

    function generateChartPreview(type) {
        const ctx = document.getElementById('simulatorChart').getContext('2d');
        const data = { /* Chart data from your provided snippet */ };
        // ... (The full chart data object from your snippet) ...
        if (window.simulatorChartInstance) window.simulatorChartInstance.destroy();
        window.simulatorChartInstance = new Chart(ctx, data[type]);
    }

    // Event Listeners
    prevBtn.addEventListener('click', goToPreviousStep);
    nextBtn.addEventListener('click', goToNextStep);
    restartBtn.addEventListener('click', restartSimulator);

    simulatorSection.querySelectorAll('.dataset-option').forEach(option => {
        option.addEventListener('click', function() {
            simulatorSection.querySelectorAll('.dataset-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            userChoices.dataset = this.getAttribute('data-dataset');
            simulatorSection.querySelector('.dataset-description').textContent = `Analyzing ${this.querySelector('span').textContent} dataset...`;
            nextBtn.disabled = false;
        });
    });

    simulatorSection.querySelectorAll('.analysis-option').forEach(option => {
        option.addEventListener('click', function() {
            simulatorSection.querySelectorAll('.analysis-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            userChoices.method = this.getAttribute('data-method');
            simulatorSection.querySelector('.parameter-controls').classList.remove('hidden');
            nextBtn.disabled = false;
        });
    });

    simulatorSection.querySelectorAll('.viz-option').forEach(option => {
        option.addEventListener('click', function() {
            simulatorSection.querySelectorAll('.viz-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            userChoices.viz = this.getAttribute('data-viz');
            // I am omitting the large 'data' object for chart generation for brevity, but you should include it.
            // You can copy it from the original snippet you provided.
            const chartData = { scatter: { type: 'scatter', data: { datasets: [{ label: 'Segment 1', data: [{x:25,y:450},{x:30,y:580}], backgroundColor: 'rgba(126, 87, 194, 0.7)' }, { label: 'Segment 2', data: [{x:55,y:1200},{x:60,y:1350}], backgroundColor: 'rgba(38, 166, 154, 0.7)' }] }, options:{scales:{x:{title:{display:true,text:'Age'}},y:{title:{display:true,text:'Spending ($)'}}}} }, cluster: { type: 'doughnut', data: { labels: ['Budget','Quality','Brand','Occasional','High Rollers'], datasets: [{ data: [25,20,15,30,10], backgroundColor: ['#7E57C2','#26A69A','#EF6C58','#F7C350','#64B5F6'] }] } }, bar: { type: 'bar', data: { labels: ['Q1','Q2','Q3','Q4'], datasets: [{ label: 'Seg A', data: [120,150,180,210], backgroundColor: '#7E57C2' }, { label: 'Seg B', data: [90,120,150,190], backgroundColor: '#26A69A' }] }, options:{scales:{y:{beginAtZero:true,title:{display:true,text:'Revenue ($K)'}}}} } };
            if (window.simulatorChartInstance) { window.simulatorChartInstance.destroy(); }
            window.simulatorChartInstance = new Chart(document.getElementById('simulatorChart').getContext('2d'), chartData[userChoices.viz]);
            nextBtn.disabled = false;
        });
    });

    simulatorSection.querySelector('.param-slider')?.addEventListener('input', function() {
        simulatorSection.querySelector('.param-value').textContent = `${this.value} segment${this.value > 1 ? 's' : ''}`;
    });

    updateSimulatorView();
    nextBtn.disabled = true;
}
    // --- Resume Modal Logic ---
    const viewResumeBtn = document.getElementById('viewResumeBtn');
    const resumeModal = document.getElementById('resumeModal');
    if (viewResumeBtn && resumeModal) {
        const closeModalBtn = resumeModal.querySelector('.close-btn');
        const modalOverlay = resumeModal.querySelector('.modal-overlay');
        const resumeFrame = document.getElementById('resumeFrame');
        const printResumeBtn = document.getElementById('printResumeBtn');
        const resumePath = 'Rabbi_Ali_Resume.pdf';

        const openModal = () => {
            if (resumeFrame.src !== resumePath) {
                resumeFrame.src = resumePath;
            }
            resumeModal.classList.add('show');
        };
        const closeModal = () => resumeModal.classList.remove('show');

        viewResumeBtn.addEventListener('click', openModal);
        closeModalBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);
        printResumeBtn.addEventListener('click', () => {
            try {
                resumeFrame.contentWindow.print();
            } catch (error) {
                alert("Could not print the resume. Please try downloading it instead.");
                console.error("Print error:", error);
            }
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && resumeModal.classList.contains('show')) {
                closeModal();
            }
        });
    }
    // Lazy loading ইমেজগুলোর জন্য Fade-in Effect
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
lazyImages.forEach(img => {
    // যদি ছবিটি আগেই লোড হয়ে থাকে (cache থেকে)
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        // ছবিটি অদৃশ্য রাখুন
        img.style.opacity = '0';
        // এবং লোড হওয়ার পর দৃশ্যমান করুন
        img.addEventListener('load', function() {
            this.style.transition = 'opacity 0.5s ease-in-out';
            this.style.opacity = '1';
        }, { once: true }); // event listener টি একবার চালানোর পর মুছে যাবে
    }
});

    // --- GitHub API Fetch Logic ---
    fetchGitHubData();

    // ★★★ START: CORRECTED PROJECT SLIDESHOW & FILTERING LOGIC ★★★
    const projectCards = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Slideshow initialization for each card
    projectCards.forEach(card => {
        const slideshow = card.querySelector('.project-slideshow');
        if (!slideshow) return;

        const images = slideshow.querySelectorAll('img');
        if (images.length <= 1) return;

        let currentIndex = 0;
        let intervalId = null;

        // Ensure the first image has the 'active' class on load
        images.forEach((img, index) => {
            if (index === 0) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });

        // Manual image rotation on hover
        card.addEventListener('mouseenter', function() {
            if (intervalId) clearInterval(intervalId); // Clear any existing interval
            intervalId = setInterval(() => {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
            }, 2000); // Change image every 2 seconds
        });

        card.addEventListener('mouseleave', function() {
            clearInterval(intervalId);
            intervalId = null;
            // Reset to the first image
            images[currentIndex].classList.remove('active');
            currentIndex = 0;
            images[currentIndex].classList.add('active');
        });
    });

    // Project Filtering Functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
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
    // ★★★ END: CORRECTED LOGIC ★★★
});

// --- Theme Toggle Functionality ---
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
if(themeToggle && body) {
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)')
.matches ? 'dark' : 'light');
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
        if(themeIcon) {
            themeIcon.setAttribute('name', theme === 'dark' ? 'sun' : 'moon');
            lucide.createIcons();
        }
    }
}


// --- Mobile Menu Toggle ---
const menuToggle = document.querySelector('.menu-toggle');
const navLinksList = document.querySelector('.nav-links');
if (menuToggle && navLinksList) {
    const navLinksItems = navLinksList.querySelectorAll('a');
    menuToggle.addEventListener('click', () => {
        navLinksList.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinksList.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
}


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
        bar.style.width = '0%';
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
            labels: ['Excel', 'Power BI', 'SQL', 'Python', 'Statistical Analysis', 'Machine Learning', 'Data Cleaning', 'PowerPoint', 'Canva'],
            datasets: [{
                label: 'Proficiency Level (out of 100)',
                data: [85, 88, 85, 80, 84, 75, 87, 85, 85],
                backgroundColor: 'rgba(38, 166, 154, 0.2)',
                borderColor: 'rgba(38, 166, 154, 1)',
                pointBackgroundColor: 'rgba(38, 166, 154, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(38, 166, 154, 1)'
            }]
        },
        options: {
    animation: {
        duration: 3000,       // অ্যানیمেশনটি ২ সেকেন্ড ধরে চলবে
        easing: 'easeOutQuart' // শুরু হবে দ্রুত এবং শেষে ধীরে শেষ হবে
    },
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
                    grid: { color: 'rgba(255, 255, 255, 0.2)' },
                    pointLabels: { color: 'var(--text-primary)', font: { size: 14 } },
                    ticks: { backdropColor: 'transparent', color: 'var(--text-secondary)' }
                }
            },
            plugins: {
                legend: {
                    labels: { color: 'var(--text-primary)' }
                }
            }
        }
    });
}

// --- NEW & ENHANCED CONTACT FORM SCRIPT ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input[required], textarea[required]');
    if (!document.getElementById('notification-container')) {
        const notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        document.body.appendChild(notificationContainer);
    }
    formInputs.forEach(input => {
        input.addEventListener('blur', (e) => validateField(e.target));
        input.addEventListener('input', (e) => clearError(e.target));
    });
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
}
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
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('hidden');
        }
    }, 200);
});

// --- GitHub Data Fetching Function ---
// ======================= ধাপ ৩: পুরনো ফাংশন ডিলিট করে এই নতুনটি বসান =======================
async function fetchGitHubData() {
    const username = 'RabbiTheAnalyst';
    const userApiUrl = `https://api.github.com/users/${username}`;
    const reposApiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=3`; // 3টি রিপো দেখাবে

    const repoList = document.getElementById('gh-repo-list');
    const userRepos = document.getElementById('gh-repos');
    const userFollowers = document.getElementById('gh-followers');
    const userFollowing = document.getElementById('gh-following');

    try {
        // Fetch user data and repositories in parallel for better performance
        const [userResponse, reposResponse] = await Promise.all([
            fetch(userApiUrl),
            fetch(reposApiUrl)
        ]);

        if (!userResponse.ok) throw new Error('User data could not be fetched.');
        if (!reposResponse.ok) throw new Error('Repository data could not be fetched.');

        const userData = await userResponse.json();
        const reposData = await reposResponse.json();

        // Update stats
        if(userRepos) userRepos.textContent = userData.public_repos || '0';
        if(userFollowers) userFollowers.textContent = userData.followers || '0';
        if(userFollowing) userFollowing.textContent = userData.following || '0';

        // Display repositories
        if(repoList) {
            repoList.innerHTML = ''; // Clear skeleton loaders

            reposData.forEach(repo => {
                const updatedAt = new Date(repo.updated_at).toLocaleDateString('en-GB'); // DD/MM/YYYY format

                const repoCard = document.createElement('div');
                repoCard.className = 'repo-card';
                repoCard.innerHTML = `
                    <div class="repo-header">
                        <h4>${repo.name}</h4>
                        <div class="repo-stats">
                            <span class="repo-stat">
                                <i data-lucide="star"></i>
                                ${repo.stargazers_count}
                            </span>
                            <span class="repo-stat">
                                <i data-lucide="git-fork"></i> ${repo.forks_count}
                            </span>
                        </div>
                    </div>
                    <p>${repo.description || 'No description available.'}</p>
                    ${repo.topics && repo.topics.length > 0 ? `
                        <div class="repo-topics">
                            ${repo.topics.slice(0, 3).map(topic => 
                                `<span class="repo-topic">${topic}</span>`
                            ).join('')}
                        </div>
                    ` : ''}
                    <div class="repo-footer">
                        <span class="repo-updated">Updated: ${updatedAt}</span>
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-link">
                            View Code <i data-lucide="arrow-right"></i>
                        </a>
                    </div>
                `;
                repoList.appendChild(repoCard);
            });
        }

        // Refresh icons after adding new content
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } catch (error) {
        console.error('GitHub Fetch Error:', error);
        if (repoList) {
            repoList.innerHTML = '<p style="color: #ff4d4d; text-align: center;">Could not fetch GitHub data. Please check the console for more details.</p>';
        }
    }
}
// ======================= JavaScript এর কাজ শেষ =======================
// =================================================================
// ============== LOCATION, MAP, WEATHER & TIME SCRIPT =============
// =================================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Initialize Interactive Map (Leaflet.js) ---
    function initMap() {
        const mapContainer = document.getElementById('location-map');
        // ম্যাপ যদি আগেই তৈরি হয়ে থাকে, তবে আবার তৈরি করা থেকে বিরত থাকবে
        if (mapContainer && mapContainer._leaflet_id) {
            return;
        }
        
        // Mirpur-10 এর Coordinates
        const lat = 23.8069;
        const lon = 90.3687;

        const map = L.map('location-map').setView([lat, lon], 15); // 15 = Zoom level

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([lat, lon]).addTo(map)
            .bindPopup(
                `
                    <div style="text-align: center;">
                        <img 
                            src="images/rabbi.jpg" 
                            alt="Md. Rabbi Ali" 
                            style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-bottom: 10px; border: 2px solid #26A69A;"
                        >
                        <h4 style="margin: 5px 0; color: #333;">Md. Rabbi Ali</h4> 
                        <p style="margin: 0; font-size: 0.9rem; color: #555;">I am here !</p> 
                    </div>
                `, {
                    minWidth: 200,
                    maxWidth: 250
                }
            )
            .openPopup();
    }

    // --- Fetch Live Weather Data (OpenWeather API Alternative) ---
    async function fetchWeather() {
        const tempElement = document.getElementById('live-temp');
        if (!tempElement) return;

        // OpenWeather API এর পরিবর্তে আমরা একটি free alternative API ব্যবহার করছি
        const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=23.81&longitude=90.41&current=temperature_2m';
        
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Weather data could not be fetched.');
            }
            const data = await response.json();
            const temperature = Math.round(data.current.temperature_2m);
            tempElement.textContent = `${temperature}°C`;

        } catch (error) {
            console.error("Weather Fetch Error:", error);
            // Fallback: Show a static temperature value
            tempElement.textContent = '28°C'; // Dhaka-এর গড় তাপমাত্রা
        }
    }

    // --- Display Live Local Time ---
    function updateLiveTime() {
        const timeElement = document.getElementById('live-time');
        if (!timeElement) return;
        
        function setTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                hour12: true,
                timeZone: 'Asia/Dhaka'
            });
            timeElement.textContent = timeString;
        }
        setTime(); // প্রথমবার দেখানোর জন্য
        setInterval(setTime, 1000); // প্রতি সেকেন্ডে আপডেট করার জন্য
    }

    // --- Run all functions for the location section ---
    if (document.getElementById('location')) {
        initMap();
        fetchWeather();
        updateLiveTime();
        // নতুন আইকনগুলো লোড করার জন্য
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
});
// আপনার existing script.js ফাইলে নিচের কোডটি যোগ করুন
var writingsSwiper = new Swiper(".writingsSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 3000,
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
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
});
  var swiper = new Swiper(".myTestimonials", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });