document.addEventListener("DOMContentLoaded", function() {

    const content = document.getElementById("content");
    const btn = document.getElementById("btn");
    const navItems = document.querySelectorAll(".nav-item-hover");
    const footerLinks = document.querySelectorAll(".footer-link");


    document.body.classList.add('dark-mode');
    btn.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('darkMode', 'enabled');


    if (localStorage.getItem('darkMode') === 'disabled') {
        document.body.classList.add('light-mode');
        btn.innerHTML = '<i class="fas fa-moon"></i>';
    }

    btn.addEventListener("click", function() {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('darkMode', 'disabled');
            btn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            localStorage.setItem('darkMode', 'enabled');
            btn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });


    const loadSection = async (section, path) => {
        try {
            const response = await fetch(`/section/${section}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const html = await response.text();

            content.innerHTML = html;
            history.pushState({ section }, "", path);

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            updateActiveNavItem(section);
            setup3DHoverEffects();
            observeAnimations();
        } catch (error) {
            console.error('Error loading section:', error);
        }
    };


    const updateActiveNavItem = (currentSection) => {
        navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-section') === currentSection);
        });
    };


    document.addEventListener("click", function (e) {
        const el = e.target.closest("[data-section]");
        if (el) {
            e.preventDefault();
            loadSection(
                el.getAttribute("data-section"),
                el.getAttribute("data-path")
            );
        }
    });


    window.addEventListener("popstate", (e) => {
        const section = (e.state?.section) || "index";
        loadSection(section, `/${section}`);
    });


    const observeAnimations = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(entry.target.dataset.animate);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

        document.querySelectorAll('.animate__animated').forEach(el => {
            observer.observe(el);
        });
    };

    const setup3DHoverEffects = () => {
        const cards = document.querySelectorAll('.skill-card, .project-card, .certification-card, .timeline-card');

        const handleMouseMove = (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            e.currentTarget.style.transform = `perspective(1000px) rotateX(${(y - centerY) / 20}deg) rotateY(${(centerX - x) / 20}deg)`;
        };

        const handleMouseLeave = (e) => {
            e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        };

        cards.forEach(card => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
        });
    };

    const observerForNewContent = new MutationObserver((mutations) => {
        mutations.forEach(() => {
            setup3DHoverEffects();
            observeAnimations();
        });
    });

    observerForNewContent.observe(content, {
        childList: true,
        subtree: true
    });


    document.addEventListener('contextmenu', (e) => e.preventDefault());

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

const originalTitle = document.title;
const comebackTitle = "Please come back😢";


document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = comebackTitle;
    } else {
        document.title = originalTitle;
    }
});

window.addEventListener('blur', function() {
    document.title = comebackTitle;
});

window.addEventListener('focus', function() {
    document.title = originalTitle;
});
document.addEventListener('keydown', function(e) {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && e.key === 'I') ||
    (e.ctrlKey && e.shiftKey && e.key === 'J') ||
    (e.ctrlKey && e.key === 'U')
  ) {
    e.preventDefault();

  }
});

    const initialSection = window.location.pathname.replace("/", "") || "index";
    loadSection(initialSection, window.location.pathname);
});
