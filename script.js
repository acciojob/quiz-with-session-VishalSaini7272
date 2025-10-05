// Get references to DOM elements
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Quiz questions array
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Load progress from sessionStorage
let userAnswers = {};
const savedProgress = sessionStorage.getItem("progress");
if (savedProgress) {
  userAnswers = JSON.parse(savedProgress);
}

// Function to render questions
function renderQuestions() {
  questionsElement.innerHTML = "";

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    const qText = document.createElement("p");
    qText.textContent = q.question;
    div.appendChild(qText);

    q.choices.forEach((choice) => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${index}`;
      input.value = choice;

      // Restore previous selections
      if (userAnswers[index] === choice) {
        input.checked = true;
        input.setAttribute("checked", "true"); // Important for Cypress check
      }

      input.addEventListener("change", () => {
        userAnswers[index] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const label = document.createElement("label");
      label.textContent = choice;

      div.appendChild(input);
      div.appendChild(label);
      div.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(div);
  });
}

// Render all questions
renderQuestions();

// Handle quiz submission
submitBtn.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) {
      score++;
    }
  });

  // Display score
  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;

  // Save score to localStorage
  localStorage.setItem("score", score.toString());
});
