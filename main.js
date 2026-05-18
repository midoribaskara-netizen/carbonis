const questions= [
  {
    question: "Quelle est la capitale de la france ?",
    propositions : ["londre", "berlin", "paris", "madrid"],
    bonne: 2
  },
  {
    question: "quelle planete est la plus porche du soleil ?",
    propositions : ["venus","mars","terre","mercure"],
    bonne: 3
  },
  {
    question : "qui a peint la joconde ?",
    propositions : ["picasso", "michel ange", "leonard de vinci","raphael"],
    bonne: 2
  },
  { 
    question: "quelle est la couleur du ciel ?",
    propositions : ["jaune","vert","rouge","bleu"],
    bonne: 3
  }
];

//  slides dynamique
const wrapper = document.querySelector('.swiper-wrapper');
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

let reponseDonnee = false;

const swiper = new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: false,
    allowTouchMove: false, // bloque le swipe tant qu'on n'a pas répondu
    cardsEffect: {
        slideShadows: false,
    }
});

function choisir(btn, choix, bonne) {
    if (reponseDonnee) return;
    reponseDonnee = true;

    const slide = btn.closest('.swiper-slide');
    const props = slide.querySelectorAll('.prop');

    props.forEach((p, i) => {
        p.disabled = true;
        if (i === bonne) p.classList.add('correct');
        else if (i === choix) p.classList.add('incorrect');
    });

    // Débloquer le swipe après réponse
    setTimeout(() => {
        swiper.allowTouchMove = true;
        swiper.once('slideChange', () => {
            swiper.allowTouchMove = false;
            reponseDonnee = false;
        });
    }, 800);
}
