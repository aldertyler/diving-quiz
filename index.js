let score = 0;
let currentQuestion = 0;

let questions = [
  {
    title:
      "If a flexible air-filled container at 30 meters of sea water has a volume of 6 liters, what would be the volume if it were transported to the surface?",
    answers: ["6 liters", "12 liters", "18 liters", "24 liters"],
    correct: 3
  },
  {
    title: `Dalton's Law can be paraphrased as:`,
    answers: [
      "The total pressure of a mixture of gases equals the sum of the partial pressures",
      "The total pressure of the water surrounding a diver",
      "The percentage of nitrogen that causes decompression sickness",
      "The pressure of the water plus 1 bar"
    ],
    correct: 0
  },
  {
    title: "The major, and most common, symptom of decompression sickness is:",
    answers: [
      "Respiratory failure",
      "Joint pain",
      "A feeling of euphoria",
      "Puffiness in the neck and shoulder areas"
    ],
    correct: 1
  },
  {
    title:
      "Which of the following overexpansion injuries can be characterized by swelling in the neck area with crackling sensation upon touching the swollen area?",
    answers: [
      "Pneumothorax",
      "Mediastinal emphysema",
      "Subcutaneous emphysema",
      "Arterial gas embolism"
    ],
    correct: 2
  },
  {
    title: "Diving at altitude or flying after diving:",
    answers: [
      "Allows the diver to ignore the no-decompression limits",
      "Requires special diving computer functions, altitude tables and/or refraining from flying for at least 24 hours",
      "Allows the diver to spend a greater amount of time at depth without exceeding the no decompression limits",
      "Does not require any special considerations for the diver"
    ],
    correct: 1
  },
  {
    title: "The only accepted treatment for Arterial Gas Embolism is:",
    answers: [
      "Stabilize the victim in the nearest medical facility and transport to a decompression chamber for recompression",
      "Immediate recompression by taking the victim underwater to relieve the symptoms",
      "Surgery to repair the ruptured lung",
      "All are accepted treatments"
    ],
    correct: 0
  },
  {
    title:
      "Which of the following overexpansion injuries can be characterized by chest pain, breathing difficulties, weakness, and cyanosis of the lips and nail beds?",
    answers: [
      "Rupture of the eardrum",
      "Bends",
      "Mediastinal emphysema and pneumothorax",
      "Subcutaneous emphysema"
    ],
    correct: 2
  },
  {
    title:
      "Which of the following would be inappropriate treatment for a diver evidencing symptoms of Decompression Sickness?",
    answers: [
      "Administering CPR",
      "Treating for shock",
      "Taking the victim back underwater",
      "Administering pure oxygen"
    ],
    correct: 2
  }
];

$(".start").click(function(e) {
  e.preventDefault();
  $(".start-screen").hide();
  $(".question-screen").show();
  $(".quiz-status").show();
  showQuestion();
});

$(".submit").click(function(e) {
  e.preventDefault();
  let selectedAnswer = $("input[name=radio]:checked").val();
  if (selectedAnswer) {
    checkAnswer();
  } else {
    alert("Please select an answer.");
  }
});

$(".next").click(function(e) {
  e.preventDefault();
  $(".feedback").hide();
  $(".question-screen").show();
  $("quiz-status").show();
  showQuestion();
});

$(".restart").click(function(e) {
  e.preventDefault();
  location.reload();
});

function showQuestion() {
  let question = questions[currentQuestion];
  $("#question-text").text(question.title);
  $(".question-screen form fieldset").html("");
  for (let i = 0; i < question.answers.length; i++) {
    $(".question-screen form fieldset").append(`
        <div class="container">
            <input class="radio" id="${i}" type="radio" name="radio" value="${i}" />
            <label>${question.answers[i]}</label>
            <span class="checkmark"></span>
        </div>       
    `);
  }
  updateProgress();
}

function checkAnswer() {
  let question = questions[currentQuestion];
  let selectedAnswer = $("input[name=radio]:checked").val();
  if (selectedAnswer == question.correct) {
    score++;
    $(".question-screen").hide();
    $(".feedback").show();
    $(".correct").show();
    $(".incorrect").hide();
  } else {
    $(".incorrect").text(
      `That is incorrect. The correct answer is: ${
        question.answers[question.correct]
      }.`
    );
    $(".question-screen").hide();
    $(".feedback").show();
    $(".incorrect").show();
    $(".correct").hide();
  }
  updateProgress();
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    updateResults();
    $(".next").hide();
    $(".quiz-status").hide();
    $(".results").show();
  }
}

function updateProgress() {
  $(".js-quiz-status").text(`Question Number: ${currentQuestion + 1}/8`);
  $(".js-running-score").text(`Score: ${score}/8`);
}

function updateResults() {
  $(".final-score").text(`Final Score: ${score}/8`);
}
