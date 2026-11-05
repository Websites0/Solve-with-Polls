const quizData = [
    {
        question: "বাংলাদেশের রাজধানী কী?",
        options: ["ঢাকা", "চট্টগ্রাম", "সিলেট", "রাজশাহী"],
        correct: 0
    },
    {
        question: "জাতীয় ফল কোনটি?",
        options: ["আম", "কাঁঠাল", "লিচু", "জাম"],
        correct: 1
    },
    {
        question: "জাতীয় পাখি কোনটি?",
        options: ["দোয়েল", "কাক", "ময়না", "কোকিল"],
        correct: 0
    }
];

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const submitBtn = document.getElementById('submit-btn');
const resultEl = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;

    optionsEl.innerHTML = '';
    currentQuizData.options.forEach((option, index) => {
        const optionHTML = `
            <label class="option">
                <input type="radio" name="answer" value="${index}">
                ${option}
            </label>
        `;
        optionsEl.innerHTML += optionHTML;
    });
}

function deselectAnswers() {
    const answerEls = document.querySelectorAll('input[name="answer"]');
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer = undefined;
    const answerEls = document.querySelectorAll('input[name="answer"]');
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = parseInt(answerEl.value);
        }
    });
    return answer;
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();

    if(answer !== undefined) {
        if(answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;

        if(currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            questionEl.innerText = 'পরীক্ষা শেষ!';
            optionsEl.innerHTML = '';
            submitBtn.classList.add('hide');
            resultEl.innerText = `আপনি ${quizData.length} এর মধ্যে ${score} পেয়েছেন।`;
            resultEl.classList.remove('hide');
            restartBtn.classList.remove('hide');
        }
    } else {
        alert('দয়া করে একটি উত্তর নির্বাচন করুন!');
    }
});

restartBtn.addEventListener('click', () => {
    currentQuiz = 0;
    score = 0;
    resultEl.classList.add('hide');
    restartBtn.classList.add('hide');
    submitBtn.classList.remove('hide');
    loadQuiz();
});
