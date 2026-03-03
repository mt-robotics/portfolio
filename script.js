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

// Mobile nav hamburger
const hamburger = document.getElementById('navHamburger');
const navLinksList = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    const isOpen = navLinksList.classList.toggle('open');
    hamburger.textContent = isOpen ? '✕' : '☰';
});

navLinksList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksList.classList.remove('open');
        hamburger.textContent = '☰';
    });
});
