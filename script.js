// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = '#fff';
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply fade-in animation to elements
document.querySelectorAll('.feature-card, .tool-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(element);
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.setAttribute('aria-expanded', 
                this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close mobile menu when window is resized above mobile breakpoint
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

// Add hover effect to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add click effect to cards
document.querySelectorAll('.feature-card, .tool-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'translateY(-5px)';
        }, 200);
    });
});

// Show only 6 links by default in each pf-card, expand/collapse on More/Less
function setupCardLinkToggles() {
    document.querySelectorAll('.pf-card ul').forEach(ul => {
        const items = ul.querySelectorAll('li');
        if (items.length > 6) {
            // Hide all but first 6
            for (let i = 6; i < items.length - 1; i++) {
                items[i].style.display = 'none';
            }
            // Style the last li (More >)
            const toggleLi = items[items.length - 1];
            const toggleLink = toggleLi.querySelector('a');
            toggleLink.classList.add('toggle-more');
            toggleLink.textContent = 'More >';
            toggleLink.style.cursor = 'pointer';
            toggleLink.addEventListener('click', function(e) {
                e.preventDefault();
                const expanded = ul.getAttribute('data-expanded') === 'true';
                if (!expanded) {
                    // Show all
                    for (let i = 6; i < items.length - 1; i++) {
                        items[i].style.display = '';
                    }
                    toggleLink.textContent = 'Less <';
                    ul.setAttribute('data-expanded', 'true');
                } else {
                    // Hide again
                    for (let i = 6; i < items.length - 1; i++) {
                        items[i].style.display = 'none';
                    }
                    toggleLink.textContent = 'More >';
                    ul.setAttribute('data-expanded', 'false');
                    // Scroll into view if collapsed
                    ul.parentElement.scrollIntoView({behavior: 'smooth', block: 'nearest'});
                }
            });
        }
    });
}

// Run after DOM is loaded
window.addEventListener('DOMContentLoaded', function() {
    setupCardLinkToggles();
});

// Add touch-friendly interactions for mobile
document.addEventListener('DOMContentLoaded', function() {
    const touchElements = document.querySelectorAll('button, .nav-links a, .fincept-footer-col a');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}); 