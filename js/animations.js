/**
 * animations.js - Minimal & Efficient
 * Handles scroll reveal animations and floating background shapes
 */

(function() {
    'use strict';

    // --- 1. SCROLL REVEAL (Intersection Observer) ---
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll('.project-card, .spec-card, .section-header, .bento-box, .about-intro, .reveal');
        
        if (revealElements.length === 0) return;

        // Add .reveal class to any element missing it
        revealElements.forEach(el => {
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
            }
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Stop observing once revealed
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        revealElements.forEach(el => observer.observe(el));

        // Fallback: reveal everything after 1.5s (ensures content shows if observer fails)
        setTimeout(() => {
            revealElements.forEach(el => el.classList.add('active'));
        }, 1500);
    };

    // --- 2. FLOATING BACKGROUND SHAPES (Minimal & Performant) ---
    const initFloatingShapes = () => {
        const bgContainer = document.querySelector('.bg-visuals');
        if (!bgContainer) return;

        const shapeChars = ['+', '□', '○'];
        const shapeClasses = ['plus', 'square', 'circle'];

        const createShape = () => {
            const shape = document.createElement('div');
            const randomIndex = Math.floor(Math.random() * shapeChars.length);
            
            shape.textContent = shapeChars[randomIndex];
            shape.classList.add('shape', shapeClasses[randomIndex]);
            
            // Random position & animation duration
            shape.style.left = Math.random() * 100 + '%';
            const duration = 8 + Math.random() * 12; // 8-20 seconds
            shape.style.animation = `floatUp ${duration}s linear forwards`;
            
            bgContainer.appendChild(shape);
            
            // Auto-remove after animation completes
            shape.addEventListener('animationend', () => shape.remove(), { once: true });
        };

        // Spawn shapes periodically
        const interval = setInterval(createShape, 2200);
        
        // Spawn initial batch (5 shapes)
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createShape(), i * 300);
        }
        
        // Cleanup interval on page unload (optional, but good practice)
        window.addEventListener('beforeunload', () => clearInterval(interval));
    };

    // --- 3. INITIALIZE ON DOM READY ---
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initScrollReveal();
            initFloatingShapes();
        });
    } else {
        initScrollReveal();
        initFloatingShapes();
    }

})();