

// ----- DARK MODE ------
const toggleInput = document.getElementById("darkModeToggle");

if (toggleInput) {
    // 2. Synchroniser le bouton
    toggleInput.checked = document.documentElement.classList.contains("dark");

    toggleInput.addEventListener("change", () => {
        document.documentElement.classList.toggle("dark");
        
        // 3. Sauvegarder le choix
        const mode = document.documentElement.classList.contains("dark") ? "dark" : "light";
        localStorage.setItem("theme", mode);
// Relancer le binaire seulement après un léger délai pour laisser le CSS respirer
    setTimeout(() => {
        if (typeof generateBinary === 'function') {
            generateBinary();
        }
    }, 50);
});
}



// ----- ANIMATION SCROLL ----- 
function initAnimations() {
    const faders = document.querySelectorAll(".fade-in");

    const appearOptions = {
        threshold: 0.15, // Déclenche quand 15% de la carte est visible
        rootMargin: "0px 0px -20px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); 
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
}

// Lancer au chargement
document.addEventListener("DOMContentLoaded", initAnimations);


// FIX affichage au chargement
window.addEventListener("load", () => {
    faders.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add("show");
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".fade-in").forEach(el => {
        el.classList.add("show");
    });
});






// --- GESTION DE LA MODALE  ---

function openModal() {
    const modal = document.getElementById("contactModal");
    if (modal) {
        modal.style.display = "flex"; // "flex" pour que le centrage CSS fonctionne
        document.body.style.overflow = "hidden"; // Bloque le scroll
    }
}

function closeModal() {
    const modal = document.getElementById("contactModal");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Réactive le scroll
    }
}

// Fermer si on clique à côté de la boîte
window.onclick = function(event) {
    const modal = document.getElementById("contactModal");
    if (event.target === modal) {
        closeModal();
    }
}


//----- CSS Dégradé en Représentation Binaire ------
const bg = document.getElementById('binary-bg');

function generateBinary() {
    bg.innerHTML = ''; 
    
    // On calcule la largeur de la fenêtre
    const columnCount = Math.floor(window.innerWidth / 40); 
    // On prend la hauteur totale de TOUTE la page
    const fullHeight = Math.max(
        document.body.scrollHeight, 
        document.documentElement.scrollHeight
    );
    const rowCount = Math.floor(fullHeight / 22); 

    for (let i = 0; i < columnCount; i++) {
        const column = document.createElement('div');
        column.className = 'binary-column';
        
        let columnContent = '';
        for (let j = 0; j < rowCount; j++) {
            columnContent += Math.round(Math.random()) + '<br>';
        }
        
        column.innerHTML = columnContent;
        bg.appendChild(column);
    }
}

// Lancer la génération
generateBinary();

// Relancer si on redimensionne la fenêtre
window.onresize = generateBinary;