const questions = [
  {
    question: "Quelle est la principale problématique abordée par le projet ?",
    propositions : ["Le manque d’électricité dans les villes", "L’excès de CO₂ dans l’atmosphère", "Le manque d’eau potable", "La disparition des forêts tropicales"],
    bonne: 1
  },
  {
    question: "Quel est l’objectif principal du projet Carbonis ?",
    propositions : ["Vénus","Mars","Terre","Mercure"],
    bonne: 3
  },
  {
    question : "Qui a peint la Joconde ?",
    propositions : ["Picasso", "Michel-Ange", "Léonard de Vinci","Raphaël"],
    bonne: 2
  },
  { 
    question: "Quelle est la couleur du ciel ?",
    propositions : ["Jaune","Vert","Rouge","Bleu"],
    bonne: 3
  }
];

// --- PAGE QUIZZ ---
const quizzSwiperEl = document.querySelector('.quizz-carrousel');

if (quizzSwiperEl) {
    const wrapper = quizzSwiperEl.querySelector('.swiper-wrapper');
    
    // Slides dynamique du quizz
    questions.forEach((q, index) => {
        wrapper.innerHTML += `
            <div class="swiper-slide">
                <div class="carte-contenu">
                    <p class="carte-numero">Question ${index + 1}/${questions.length}</p>
                    <h2 class="carte-question">${q.question}</h2>
                    <div class="propositions">
                        ${q.propositions.map((p, pi) => `
                            <button class="prop" onclick="choisir(this, ${pi}, ${q.bonne})">
                                ${p}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    });

    // Initialisation du Swiper Quizz
    const swiperQuizz = new Swiper(".quizz-carrousel", {
        effect: "cards",
        grabCursor: false,
        allowTouchMove: false,
        cardsEffect: {
            slideShadows: false,
        }
    });

    let reponseDonnee = false;

    window.choisir = function(btn, choix, bonne) {
        if (reponseDonnee) return;
        reponseDonnee = true;

        const slide = btn.closest('.swiper-slide');
        const props = slide.querySelectorAll('.prop');

        props.forEach((p, i) => {
            p.disabled = true;
            if (i === bonne) p.classList.add('correct');
            else if (i === choix) p.classList.add('incorrect');
        });

        setTimeout(() => {
            swiperQuizz.allowTouchMove = true;
            swiperQuizz.once('slideChange', () => {
                swiperQuizz.allowTouchMove = false;
                reponseDonnee = false;
            });
        }, 800);
    }
}


// --- PAGE D'ACCUEIL (Carrousel photos) ---
if (document.querySelector('.main-carrousel')) {
    const swiperPhotos = new Swiper('.main-carrousel', {
      loop: true,

      speed:1000,
      
      autoplay: {
        delay: 4000,
      },
    });
}