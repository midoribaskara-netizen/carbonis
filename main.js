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

const questions = [
    {question: "Quelle est la principale problématique abordée par le projet ?",
        answers: [
            {text: "Le manque d’électricité dans les villes", correct: false},
            {text: "L’excès de CO₂ dans l’atmosphère", correct: true},
            {text: "Le manque d’eau potable", correct: false},
            {text:"La disparition des forêts tropicales", correct: false},

        ]
    },
    {
        question: "Quel est l’objectif principal du projet Carbonis ?",
        answers: [
            {text: "Produire du pétrole", correct: false},
            {text: "Construire des fusées", correct: false},
            {text: "Transformer le CO₂ en matériau de construction", correct: true},
            {text:"Créer de nouvelle espèces végétales", correct: false},

        ]
    },
     {
        question: "Quel matériau polluant le projet souhaite remplacer ?",
        answers: [
            {text: "Le plastique", correct: false},
            {text: "Le béton", correct: true},
            {text: "Le verre", correct: false},
            {text:"L'acier", correct: false},

        ]
    },
     {
        question: "Que devient le CO₂ après compression et chauffage ?",
        answers: [
            {text: "De l'eau", correct: false},
            {text: "Du carburant", correct: false},
            {text: "Des blocs de pierre noire super denses", correct: true},
            {text:"Du plastique recyclable", correct: false},

        ]
    },
     {
        question: "Quel est l’objectif final prévu pour l’atmosphère ?",
        answers: [
            {text: "Créer davantage d’oxygène", correct: false},
            {text: "Supprimer totalement les océans", correct: false},
            {text: "Nettoyer complètement l’atmosphère d’ici 2150", correct: true},
            {text:"Transformer l'air en énergie", correct: false},

        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Ton score ${score} sur ${questions.length}!`;
    nextButton.innerHTML = "rejouer";
    nextButton.style.display = "block";
}


function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();

