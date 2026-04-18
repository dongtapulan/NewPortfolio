const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Attach to all cards and sections
document.querySelectorAll('.card, .art-card, .hero-text').forEach(el => {
    observer.observe(el);
});