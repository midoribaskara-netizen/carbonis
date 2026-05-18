const questions = [
  {
    question: "Quelle est la capitale de la France ?",
    propositions : ["Londres", "Berlin", "Paris", "Madrid"],
    bonne: 2
  },
  {
    question: "Quelle planète est la plus proche du soleil ?",
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
      autoplay: {
        delay: 3000,
      },
    });
}