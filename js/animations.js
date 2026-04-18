document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SCROLL REVEAL LOGIC ---
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it enters the view
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once it's revealed, we can stop observing it
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Target elements from both index.html and AboutMe.html
    const selectors = '.project-card, .spec-card, .section-header, .bento-box, .about-intro, .reveal';
    const targets = document.querySelectorAll(selectors);
    
    targets.forEach(target => {
        target.classList.add('reveal'); 
        revealObserver.observe(target);
    });

    // FALLBACK: In case IntersectionObserver fails, show everything after 1 second
    setTimeout(() => {
        targets.forEach(t => t.classList.add('active'));
    }, 1000);

    // --- 2. FLOATING SHAPES LOGIC ---
    const bg = document.querySelector('.bg-visuals');
    const shapes = ['+', '□', '○'];
    
    function createShape() {
        if (!bg) return; // Exit if no background container found

        const el = document.createElement('div');
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        
        el.className = 'shape';
        el.innerText = shapeType;
        
        // Randomly assign a class for variety in look
        if(shapeType === '+') el.classList.add('plus');
        if(shapeType === '□') el.classList.add('square');
        if(shapeType === '○') el.classList.add('circle');
        
        // Random horizontal position and speed
        el.style.left = Math.random() * 100 + 'vw';
        const duration = 10 + Math.random() * 10;
        el.style.animation = `floatUp ${duration}s linear forwards`;
        
        bg.appendChild(el);
        
        // Remove from DOM when animation finishes to save memory
        setTimeout(() => { el.remove(); }, duration * 1000);
    }

    // Faster spawning for a more "active" background
    if (bg) {
        setInterval(createShape, 2000);
        // Create initial shapes so the page doesn't start empty
        for(let i=0; i<5; i++) createShape();
    }
});