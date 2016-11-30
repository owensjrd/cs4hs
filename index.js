var allQuestions = [{
  question: "What does HTML stand for?",
  choices: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Marking Language"],
  correctAnswer: 0
}, {
  question: "Tags are surrounded by what symbol?",
  choices: ["[ ]", "( )", "{ }", "< >"],
  correctAnswer: 3
}, {
  question: "Which pair is Correct?",
  choices: ["html and /html", "<html> and </html>", "<html> and <html>", "<html> and <html/>"],
  correctAnswer: 1
}, {
  question: "The <h3> heading will make text that is bigger than the <h5> heading?",
  choices: ["False", "True"],
  correctAnswer: 1
}];

function Quiz(options) {
  var elem = options.elem;
  var allQuestions = options.questions;
  var q_number = allQuestions.length;

  var answers = [];
  var questions = [];

  var correct_answers = 0;
  var current_number;

  generateQuestions(allQuestions);
  
  initQuiz();

  function generateQuestions(q) {
    for (var i = 0; i < q_number; i++) {
      var question = document.createElement('div');
      question.classList.add('question');
      question.id = 'question';

      var title = document.createElement('h2');
      title.textContent = q[i].question;

      question.appendChild(title);

      var list = document.createElement('ul');

      for (var j = 0, len = q[i].choices.length; j < len; j++) {
        var choice = document.createElement('li');

        var check = document.createElement('input');
        check.setAttribute('type', 'radio');
        check.setAttribute('name', 'question');

        var choice_text = document.createElement('label');
        choice_text.setAttribute('for', check.name);
        choice_text.textContent = q[i].choices[j];

        choice.appendChild(check);
        choice.appendChild(choice_text);

        list.appendChild(choice);
      }

      var prev_button = document.createElement('button');
      prev_button.textContent = 'Previous Question';
      prev_button.addEventListener('click', prevQuestion);

      var next_button = document.createElement('button');

      if (i === q_number - 1) {
        next_button.textContent = 'Check Answers';
        next_button.addEventListener('click', finishQuiz);
      } else {
        next_button.textContent = 'Next Question';
        next_button.addEventListener('click', nextQuestion);
      }

      question.appendChild(list);

      if (i > 0) question.appendChild(prev_button);
      question.appendChild(next_button);

      questions.push(question);
    }
  }

  function render_question(number) {
    var warning = elem.getElementsByClassName('warning')[0];
    if (warning) {
      elem.removeChild(warning);
    }
    elem.appendChild(questions[number]);
    $('#question').hide().fadeIn(500);
  }

  function initQuiz() {
    current_number = 0;
    render_question(current_number);
  }

  function checkAnswers() {
    for (var i = 0; i < q_number; i++) {
      if (answers[i] === allQuestions[i].correctAnswer) {
        correct_answers++;
      }
    }
  }

  function validateAnswer() {
    var list_items = elem.getElementsByTagName('input');
    var answered = false;
    for (var i = 0, len = list_items.length; i < len; i++) {
      if (list_items[i].checked) {
        answers.push(i);
        answered = true;
        break;
      }
    }
    if (!answered && !elem.getElementsByClassName('warning')[0]) {
      var warning = document.createElement('span');
      warning.textContent = "Answer the question before you proceed, please.";
      warning.classList.add('warning');

      elem.appendChild(warning);
    }
    return answered;
  }

  function nextQuestion() {
    if (validateAnswer()) {
      elem.removeChild(questions[current_number]);
      current_number++;
      render_question(current_number);
    }
  }

  function prevQuestion() {
    elem.removeChild(questions[current_number]);
    answers.pop();
    current_number--;
    render_question(current_number);
  }

  function finishQuiz() {
    if (validateAnswer()) {
      checkAnswers();
      elem.removeChild(questions[current_number]);
      var result = document.createElement('p');
      if (correct_answers === 0) {
        result.textContent = "Thank you for taking this quiz! Sorry, but none of your answers were right :( Try again if you want to improve your score.";
      } else {
        result.textContent = "Thank you for taking this quiz! Your final score is: " + correct_answers + " correct answers!";
      }
      elem.appendChild(result);
    }
  }
}

var quiz = new Quiz({
  elem: document.getElementById('quiz'),
  questions: allQuestions
});