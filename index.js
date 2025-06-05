/* CONSTANTS */
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const controlsContainer = document.getElementById('controls');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const submitBtn = document.getElementById('submitBtn');
const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('startBtn');

/* VARIABLES */
let questions = [];
let currentQuestion = 0;
let userAnswers = [];

/* FUNCTIONS */
async function fetchQuestions() {
  try {
    const response = await fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple');
    const data = await response.json();
    questions = data.results.map(q => {
      const allAnswers = [...q.incorrect_answers, q.correct_answer];
      const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
      return {
        question: decodeHTML(q.question),
        options: shuffledAnswers.map(decodeHTML),
        correct: decodeHTML(q.correct_answer),
      };
    });
    displayQuestion(currentQuestion);
  } catch (error) {
    quizContainer.innerHTML = `<p>Error loading quiz data. Please try again later.</p>`;
    console.error(error);
  }
}
function decodeHTML(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}
function displayQuestion(index) {
  const q = questions[index];
  if (!q) return;

  quizContainer.innerHTML = '';

  const questionEl = document.createElement('div');
  questionEl.innerHTML = `<h3>${q.question}</h3>`;
  quizContainer.appendChild(questionEl);

  q.options.forEach(option => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="radio" name="option" value="${option}" ${userAnswers[index] === option ? 'checked' : ''}/>${option}`;
    quizContainer.appendChild(label);
    quizContainer.appendChild(document.createElement('br'));
  });
  prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
  nextBtn.style.display = index === questions.length - 1 ? 'none' : 'inline-block';
  submitBtn.style.display = index === questions.length - 1 ? 'inline-block' : 'none';
}
function captureAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (selected) {
    userAnswers[currentQuestion] = selected.value;
    return true;
  } else {
    alert('Please select an option before continuing.');
    return false;
  }
}

/* EVENT LISTENERS: */
startBtn.addEventListener('click', () => {
  startScreen.style.display = 'none';
  controlsContainer.style.display = 'flex';
  fetchQuestions();
});
nextBtn.addEventListener('click', () => {
  if (captureAnswer()) {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      displayQuestion(currentQuestion);
    }
  }
});
prevBtn.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    displayQuestion(currentQuestion);
  }
});
submitBtn.addEventListener('click', () => {
  if (!captureAnswer()) return;

  let score = 0;
  let correct = 0;
  let incorrect = 0;
  questions.forEach((q, index) => {
    if (userAnswers[index] === q.correct) {
      score++;
      correct++;
    } else {
      incorrect++;
    }
  });
  const percentage = ((score / questions.length) * 100).toFixed(2);

  quizContainer.style.display = "none";
  controlsContainer.style.display = 'none';

  resultContainer.style.display = "block";
  resultContainer.innerHTML = `
    <div id="result">
      <p>Your score:</p>
      <h3 id="score">${percentage}%</h3>
      <div id="stats-wrapper">
        <p>Total Questions: ${questions.length}</p>
        <p>Correct Answers: ${correct}</p>
        <p>Incorrect Answers: ${incorrect}</p>
      </div>
    </div>
  `;
  const restartBtn = document.createElement('button');
  restartBtn.textContent = 'Restart Quiz';
  restartBtn.id = 'restartBtn';
  restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    userAnswers = [];
    resultContainer.innerHTML = '';
    resultContainer.style.display = "none";
    restartBtn.remove();
    startScreen.style.display = 'none';
    controlsContainer.style.display = 'flex';
    fetchQuestions();
    quizContainer.style.display = "block";
  });
  resultContainer.insertAdjacentElement("beforeend", restartBtn);
});
