// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.style.color = link.getAttribute('href') === `#${id}`
                        ? '#e8e8f0'
                        : '';
                });
            }
        });
    },
    { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => observer.observe(s));
