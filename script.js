function animateProgressBars() {
            const progressBars = document.querySelectorAll('.progress-bar');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progressBar = entry.target;
                        const percentage = progressBar.getAttribute('data-progress');
                        const percentageElement = progressBar.parentElement.nextElementSibling;
                        
                        // Animate the progress bar
                        setTimeout(() => {
                            progressBar.style.width = percentage + '%';
                        }, 200);
                        
                        // Animate the percentage counter
                        let currentPercentage = 0;
                        const increment = percentage / 50; // Divide by 50 for smooth animation
                        const timer = setInterval(() => {
                            currentPercentage += increment;
                            if (currentPercentage >= percentage) {
                                currentPercentage = percentage;
                                clearInterval(timer);
                            }
                            percentageElement.textContent = Math.round(currentPercentage) + '%';
                        }, 40);
                        
                        observer.unobserve(progressBar);
                    }
                });
            }, { threshold: 0.5 });
            
            progressBars.forEach(bar => {
                observer.observe(bar);
            });
        }

        // Initialize animations when page loads
        document.addEventListener('DOMContentLoaded', function() {
            animateProgressBars();
        });

        // Mobile menu toggle and navbar active state
        const menuIcon = document.getElementById('menu-icon');
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.navbar a');
        
        if (menuIcon) {
            menuIcon.addEventListener('click', () => {
                navbar.classList.toggle('active');
            });
        }

        // Handle navbar active state
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Remove active class from all links
                navLinks.forEach(nav => nav.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
            });
        });

        // Handle scroll spy for navbar
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
          const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe contact items
        document.querySelectorAll('.info-item, .contact-form').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });

        // Add form submission handling
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Show success message (you can replace this with actual form submission)
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = 'linear-gradient(135deg, var(--text-color), var(--border-color))';
                this.reset();
            }, 3000);
        });

        // Add typing effect for placeholder
        const textarea = document.getElementById('message');
        const placeholderText = "Write your message here...";
        let currentPlaceholder = "";
        let isDeleting = false;
        let charIndex = 0;

        function typePlaceholder() {
            if (!isDeleting) {
                currentPlaceholder = placeholderText.slice(0, charIndex + 1);
                charIndex++;
                if (charIndex === placeholderText.length) {
                    setTimeout(() => isDeleting = true, 2000);
                }
            } else {
                currentPlaceholder = placeholderText.slice(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                }
            }
            
            if (textarea.value === '') {
                textarea.placeholder = currentPlaceholder;
            }
        }

        // Only run placeholder animation if textarea is empty and not focused
        setInterval(() => {
            if (textarea.value === '' && document.activeElement !== textarea) {
                typePlaceholder();
            }
        }, 150);

        textarea.addEventListener('focus', () => {
            textarea.placeholder = "Write your message here...";
        });