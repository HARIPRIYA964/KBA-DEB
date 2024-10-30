// Quiz Data
const quizData = [
    { question: "What is the capital of France?", choices: ["Berlin", "Madrid", "Paris", "Rome"], correct: "Paris" },
    { question: "Which planet is known as the Red Planet?", choices: ["Earth", "Mars", "Jupiter", "Saturn"], correct: "Mars" },
    { question: "What is the largest ocean on Earth?", choices: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: "Pacific" }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimit = 15; // seconds

// DOM elements
const questionElement = document.getElementById('question');
const choicesContainer = document.getElementById('choices-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const timerElement = document.getElementById('timer');
const scoreFeedback = document.getElementById('score-feedback');

// Initialize Quiz
function startQuiz() {
    loadQuestion();
    prevBtn.disabled = true; // Disable previous button on first question
    resetTimer();
}

// Load Question and Choices
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    
    // Clear previous choices
    choicesContainer.innerHTML = '';

    // Create radio buttons for choices
    currentQuestion.choices.forEach(choice => {
        const label = document.createElement('label');
        label.classList.add('block', 'bg-gray-200', 'p-2', 'rounded-lg');

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.value = choice;
        input.classList.add('mr-2');

        label.appendChild(input);
        label.appendChild(document.createTextNode(choice));

        choicesContainer.appendChild(label);
    });

    // Update navigation buttons
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === quizData.length - 1;

    // Handle showing the submit button for the last question
    if (currentQuestionIndex === quizData.length - 1) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
}

// Move to the next question
function nextQuestion() {
    saveAnswer();
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
        resetTimer();
    }
}

// Move to the previous question
function prevQuestion() {
    saveAnswer();
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
        resetTimer();
    }
}

// Save the user's answer
let answers = {};

function saveAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        answers[currentQuestionIndex] = selectedOption.value;
    }
}

// Submit quiz and calculate score
function submitQuiz() {
    saveAnswer();
    score = 0;
    quizData.forEach((question, index) => {
        if (answers[index] === question.correct) {
            score++;
        }
    });

    // Display feedback
    questionElement.textContent = '';
    choicesContainer.innerHTML = '';
    scoreFeedback.textContent = `You scored ${score} out of ${quizData.length}`;
    scoreFeedback.classList.remove('hidden');
    submitBtn.classList.add('hidden');
}

// Timer logic
function resetTimer() {
    clearInterval(timer);
    let timeLeft = timeLimit;
    timerElement.textContent = `Time left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion(); // Automatically go to the next question if time runs out
        }
    }, 1000);
}

// Event listeners
nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', prevQuestion);
submitBtn.addEventListener('click', submitQuiz);

// Start the quiz
startQuiz();
