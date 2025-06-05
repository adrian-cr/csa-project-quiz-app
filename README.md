# Project: Quiz App
This project contains the code to run "Quizzy", a simple yet visually attractive quiz application that fetches JavaScript-related multiple-choice questions from [Open Trivia Database](https://opentdb.com)'s API. Users can test their general knowledge through a series of questions, get immediate scores, and restart the quiz for another attempt.

## Page Components
* **Home Screen**: A welcoming start screen with title, description, and a "Start Quiz" button
* **Dynamic Questions**: Questions fetched from TriviaAPI in real time with randomized options and a single correct answer
* **Navigation Controls**:
  * "Previous", "Next", and "Finish" buttons
  * Buttons conditionally appear/hide based on quiz state
* **Answer Tracking**: Automatic save for user's selected answers as quiz progresses.
* **Score Calculation**: Percentage score and complementary stats
* **Restart Option**: Button on result screen to start over
* **Responsive Design**: Clean and user-friendly interface across devices

## Technologies Used
* HTML5
* CSS3
* JavaScript (ES6)
* TriviaAPI ([https://opentdb.com](https://opentdb.com))

## Getting Started
1. **Clone the repository**:

   ```bash
   git clone https://github.com/adrian-cr/csa-project-quiz-app
   cd csa-project-quiz-app
   ```

2. **Open the `index.html` file in your browser**:

   ```
   Open index.html with any web browser
   ```

No build tools or servers required. Everything runs client-side.
