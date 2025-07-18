document.addEventListener('DOMContentLoaded', () => {

    // --- GESTION DU THÈME SOMBRE/CLAIR ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const applyTheme = (theme) => {
        body.classList.toggle('dark-theme', theme === 'dark');
        themeToggle.textContent = theme === 'dark' ? '☀️' : '☾';
    };
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- EFFET 3D SUR LES CARTES (SAUF PAGE CONTACT) ---
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".card-3d"), {
            max: 15, speed: 400, glare: true, "max-glare": 0.5
        });
    }

    // --- NOUVELLE ANIMATION DE TEXTE (PAGE ACCUEIL) ---
    const textContainer = document.getElementById('animated-text-container');
    const heroButton = document.getElementById('hero-button');

    if (textContainer && heroButton) {
        const lines = [
            { text: "Votre Partenaire en Solutions Digitales", type: 'h1' },
            { text: "Nous transformons vos idées en réalité numérique avec expertise et passion.", type: 'p' }
        ];

        let lineIndex = 0;
        let charIndex = 0;

        const typeLine = () => {
            if (lineIndex < lines.length) {
                const currentLine = lines[lineIndex];
                if (charIndex === 0) {
                    // Crée l'élément (h1 ou p) au début de la ligne
                    const element = document.createElement(currentLine.type);
                    element.className = `animated-text-${currentLine.type}`;
                    textContainer.appendChild(element);
                }

                const textElement = textContainer.lastChild;
                if (charIndex < currentLine.text.length) {
                    textElement.textContent += currentLine.text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeLine, 10); // Vitesse de frappe
                } else {
                    // Passe à la ligne suivante
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(typeLine, 500); // Délai entre les lignes
                }
            } else {
                // Fin de l'animation, on affiche le bouton
                heroButton.style.opacity = '1';
                heroButton.style.transform = 'translateY(0)';
            }
        };

        // Démarrer l'animation
        typeLine();
    }


    // --- CARROUSEL D'AVIS (PAGE ACCUEIL) ---
    const slider = document.querySelector('.testimonial-container');
    const dotsContainer = document.querySelector('.testimonial-dots');
    if (slider && dotsContainer) {
        const testimonials = document.querySelectorAll('.testimonial');
        let currentIndex = 0;

        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.index = index;
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');
        
        const updateSlider = (index) => {
            slider.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach(d => d.classList.remove('active'));
            if(dots[index]) dots[index].classList.add('active');
            currentIndex = index;
        };

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                updateSlider(parseInt(e.target.dataset.index));
            });
        });
    }
});