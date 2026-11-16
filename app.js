// ============================================================
// QPI - QUIZ PERFORMANCE IMPROVEMENT
// GRADE 11 - GENERAL MATHEMATICS
// COMPLETE APP.JS
// ============================================================


// ============================================================
// GLOBAL VARIABLES
// ============================================================

let studentName = "";
let studentSection = "";

let currentQuiz = "";
let currentQuestion = 0;
let score = 0;

let selectedAnswer = null;
let answerSubmitted = false;

let currentQuestions = [];
let userAnswers = [];

function shuffleArray(items) {
    const array = [...items];

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function prepareQuestionForQuiz(question) {
    const shuffledChoices = shuffleArray(question.choices);
    const correctChoice = question.choices[question.answer];

    return {
        ...question,
        choices: shuffledChoices,
        answer: shuffledChoices.indexOf(correctChoice)
    };
}


// ============================================================
// SECTION LIST
// ============================================================

const sections = [
    "APHRODITE",
    "APOLLO",
    "DEMETER",
    "ATHENA",
    "HADES",
    "HERMES",
    "ARTEMIS",
    "ZEUS",
    "POSEIDON",
    "EROS",
    "HERA",
    "ARES"
];

let currentLearningLevel = 1;
let currentDiscussionDay = 0;

function getLearningState() {
    try {
        return JSON.parse(localStorage.getItem("qpiLearningState") || "{}");
    } catch (error) {
        return {};
    }
}

function saveLearningState(state) {
    localStorage.setItem("qpiLearningState", JSON.stringify(state));
}

function formatDateKey(date) {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        .toISOString()
        .slice(0, 10);
}

function getUnlockedLearningLevel() {
    const state = getLearningState();

    if (!state.startDate) {
        state.startDate = formatDateKey(new Date());
        saveLearningState(state);
    }

    const startDate = new Date(`${state.startDate}T00:00:00`);
    const today = new Date();
    const daysSinceStart = Math.floor(
        (new Date(formatDateKey(today)).getTime() - startDate.getTime()) / 86400000
    );

    return Math.min(
        Math.max(daysSinceStart + 1, 1),
        learningLevels.length
    );
}

function renderLearningLevels() {
    const container = document.getElementById("learningLevels");

    if (!container) {
        return;
    }

    const unlockedLevel = getUnlockedLearningLevel();

    container.innerHTML = "";
    container.classList.remove("hidden");

    const label = document.createElement("p");
    label.textContent = "Daily Quiz Levels";
    container.appendChild(label);

    const emptyMessage = document.createElement("p");
    emptyMessage.id = "dailyQuizStatus";
    emptyMessage.textContent = "One new level unlocks each day. Quiz questions have not been added yet.";
    container.appendChild(emptyMessage);

    learningLevels.forEach(level => {
        const button = document.createElement("button");
        const hasQuestions = Array.isArray(level.questions) && level.questions.length > 0;
        const isUnlocked = level.id <= unlockedLevel;

        button.type = "button";
        button.textContent = isUnlocked
            ? hasQuestions
                ? `Level ${level.id}: ${level.title}`
                : `Level ${level.id} - Open (Empty)`
            : `🔒 Level ${level.id} - Opens Day ${level.id}`;
        button.disabled = !isUnlocked;

        if (isUnlocked) {
            button.onclick = () => startLearningLevel(level.id);
        }

        container.appendChild(button);
    });

    const backButton = document.createElement("button");
    backButton.type = "button";
    backButton.textContent = "Back to Menu";
    backButton.className = "secondary";
    backButton.onclick = () => backToMenu();
    container.appendChild(backButton);
}

function hideLearningLevels() {
    const container = document.getElementById("learningLevels");
    if (container) {
        container.classList.add("hidden");
        container.innerHTML = "";
    }
}

function startLearningLevel(levelId) {
    const level = learningLevels.find(item => item.id === levelId);

    if (!level) {
        return;
    }

    if (levelId > getUnlockedLearningLevel()) {
        return;
    }

    if (!Array.isArray(level.questions) || !level.questions.length) {
        const status = document.getElementById("dailyQuizStatus");
        if (status) {
            status.textContent = `Level ${levelId} is open, but quiz questions have not been added yet.`;
        }
        return;
    }

    currentLearningLevel = levelId;
    currentQuiz = "practice";
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    answerSubmitted = false;
    userAnswers = [];

    const questionCount = Math.min(5, level.questions.length);

    currentQuestions = shuffleArray(level.questions)
        .slice(0, questionCount)
        .map(prepareQuestionForQuiz);

    document.getElementById("quizType").textContent =
        `${getQuizName("practice")} • ${level.title}`;

    showScreen("quizScreen");
    loadQuestion();
}

function retryLearningLevel() {
    startLearningLevel(currentLearningLevel);
}

function reviewMistakes() {
    const mistakes = userAnswers.filter(answer => !answer.correct);

    if (!mistakes.length) {
        document.getElementById("performanceMessage").innerHTML =
            "<p>You answered everything correctly. Great job!</p>";
        return;
    }

    const content = mistakes.map((answer, index) => {
        const question = currentQuestions.find(item => item.question === answer.question) || currentQuestions[0];
        const correctAnswerText = question && question.choices && question.choices[answer.correctAnswer]
            ? question.choices[answer.correctAnswer]
            : "Unknown";

        return `
            <div class="progressItem">
                <p><strong>${index + 1}.</strong> ${answer.question}</p>
                <p>Your answer: ${answer.selectedAnswer !== null && question ? question.choices[answer.selectedAnswer] : "No answer"}</p>
                <p>Correct answer: ${correctAnswerText}</p>
            </div>
        `;
    }).join("");

    document.getElementById("performanceMessage").innerHTML = `
        <h3>Review Mistakes</h3>
        ${content}
    `;
}


// ============================================================
// RANDOM VARIABLES QUESTION BANK
// 40 QUESTIONS
// ============================================================

function createRandomVariableQuestion(question, choices, explanation) {
    return { question, choices, answer: 0, explanation };
}

const questionBank = [
    createRandomVariableQuestion("What is a random variable?", ["A rule that assigns a number to each outcome of a chance experiment", "A number chosen without an experiment", "A list of non-numerical descriptions", "A result that never changes"], "A random variable assigns numerical values to outcomes of a chance experiment."),
    createRandomVariableQuestion("Which letter is commonly used to name a random variable?", ["A capital letter such as X", "A lowercase letter such as x only", "The symbol %", "A question mark"], "Random variables are usually named with capital letters such as X or Y."),
    createRandomVariableQuestion("What does a random variable map?", ["Outcomes of an experiment to numbers", "Numbers to colors", "Questions to students", "Measurements to units only"], "A random variable maps each outcome in the sample space to a numerical value."),
    createRandomVariableQuestion("Which situation is a chance experiment?", ["Tossing a coin", "Writing a fixed name", "Reading a number already printed", "Measuring a ruler that is not moving"], "A coin toss has an outcome determined by chance."),
    createRandomVariableQuestion("What is the sample space for tossing two coins?", ["{HH, HT, TH, TT}", "{H, T}", "{0, 1, 2, 3}", "{HHH, TTT}"], "Each coin can land heads or tails, giving HH, HT, TH, and TT."),
    createRandomVariableQuestion("Two coins are tossed. X is the number of heads. What values can X take?", ["{0, 1, 2}", "{H, T}", "{1, 2, 3}", "{0, 1, 2, 3, 4}"], "Two tosses can produce zero, one, or two heads."),
    createRandomVariableQuestion("For two coin tosses, if X counts heads, what is X for HH?", ["2", "1", "0", "4"], "HH contains two heads, so X = 2."),
    createRandomVariableQuestion("For two coin tosses, if X counts heads, what is X for TT?", ["0", "1", "2", "4"], "TT contains no heads, so X = 0."),
    createRandomVariableQuestion("Three coins are tossed. Y is the number of tails. What are the possible values of Y?", ["{0, 1, 2, 3}", "{H, T}", "{1, 2, 3, 4}", "{0, 1}"], "There can be zero, one, two, or three tails in three tosses."),
    createRandomVariableQuestion("For three coin tosses, if Y counts tails, what is Y for HTH?", ["1", "0", "2", "3"], "HTH contains one tail, so Y = 1."),
    createRandomVariableQuestion("For three coin tosses, if Y counts tails, what is Y for TTT?", ["3", "2", "1", "0"], "TTT contains three tails, so Y = 3."),
    createRandomVariableQuestion("In an experiment with three coin tosses, what does the outcome HHT represent?", ["Two heads and one tail", "One head and two tails", "Three heads", "Three tails"], "HHT records heads on the first two tosses and tails on the third."),
    createRandomVariableQuestion("When one fair die is rolled, which set gives all possible results?", ["{1, 2, 3, 4, 5, 6}", "{0, 1}", "{2, 4, 6}", "{1, 2, 3}"], "A standard die has six possible outcomes, numbered 1 through 6."),
    createRandomVariableQuestion("A die is rolled. X is the result when it is an even number. Which values are possible?", ["{2, 4, 6}", "{1, 3, 5}", "{0, 2, 4, 6}", "{2, 3, 4}"], "The even outcomes on a standard die are 2, 4, and 6."),
    createRandomVariableQuestion("Which is an example of a random variable that counts outcomes?", ["The number of heads in several coin tosses", "The color of a coin", "The name of a student", "The shape of a die"], "The number of heads is numerical and can be counted."),
    createRandomVariableQuestion("A die is rolled twice and W is the sum of the results. What are the possible values of W?", ["{2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12}", "{1, 2, 3, 4, 5, 6}", "{0, 1}", "{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12}"], "The smallest sum is 1 + 1 = 2 and the largest is 6 + 6 = 12; every integer in between is possible."),
    createRandomVariableQuestion("A discrete random variable has values that are usually what?", ["Countable", "Measured on a continuous scale", "Always fractions", "Impossible to list"], "Discrete random-variable values are countable."),
    createRandomVariableQuestion("Which quantity is discrete?", ["Number of books in a library", "Height of a learner", "Time to finish an exam", "Temperature of a room"], "Books are counted in whole items, making the number discrete."),
    createRandomVariableQuestion("Which quantity is discrete?", ["Number of text messages sent", "Weight of a newborn", "Distance to school", "Speed of a car"], "Messages are counted, so their number is discrete."),
    createRandomVariableQuestion("Why is the number of pencils in a box discrete?", ["Pencils are counted in whole items", "Pencil length is measured", "The number can be any decimal", "It changes continuously"], "A count of individual pencils takes countable whole-number values."),
    createRandomVariableQuestion("A continuous random variable is based on values obtained through what?", ["Measurement", "Counting objects only", "Naming outcomes", "Sorting letters"], "Continuous random-variable values are obtained through measurement."),
    createRandomVariableQuestion("Which quantity is continuous?", ["Height of a learner", "Number of teachers", "Number of books", "Number of pencils"], "Height is measured and can take decimal values."),
    createRandomVariableQuestion("Which quantity is continuous?", ["Weight of a newborn child", "Number of messages", "Number of students", "Number of cars"], "Weight is measured and can vary continuously."),
    createRandomVariableQuestion("Which quantity is continuous?", ["Time to finish an exam", "Number of questions answered", "Number of books read", "Number of phone calls"], "Time is measured and may take fractional values."),
    createRandomVariableQuestion("The distance from home to school is usually classified as what?", ["Continuous, because it is measured", "Discrete, because it is counted", "Neither countable nor measurable", "A sample space"], "Distance is a measurement and can take decimal values."),
    createRandomVariableQuestion("The speed of a moving car is which type of quantity?", ["Continuous", "Discrete", "A coin-toss outcome", "A count of objects"], "Speed is measured and can vary continuously."),
    createRandomVariableQuestion("The temperature of a room is which type of quantity?", ["Continuous", "Discrete", "A count", "A sample space"], "Temperature is measured, so it is continuous."),
    createRandomVariableQuestion("The number of teachers in a school is which type of quantity?", ["Discrete", "Continuous", "Measured only", "A decimal interval"], "Teachers are counted in whole people, so the number is discrete."),
    createRandomVariableQuestion("A powder's weight Y is between 0 mg and 80 mg. Which classification fits Y?", ["Continuous, because weight is measured", "Discrete, because every value is a count", "Neither, because it has bounds", "A sample space"], "Weight is measured and may take decimal values between 0 mg and 80 mg."),
    createRandomVariableQuestion("A student's score on a 10-item test can be 0 through 10. Which classification fits the score?", ["Discrete, because the possible scores are countable", "Continuous, because all decimals are possible", "Neither, because the score has a maximum", "A measurement of time"], "The possible scores are the finite set {0, 1, ..., 10}, so the variable is discrete."),
    createRandomVariableQuestion("Which statement best distinguishes discrete and continuous variables?", ["Discrete values are counted; continuous values are measured", "Discrete values are measured; continuous values are counted", "Both types must be whole numbers", "Only continuous variables have numerical values"], "Countable values are discrete; values obtained through measurement are continuous."),
    createRandomVariableQuestion("A measured quantity can often take which kind of values?", ["Decimal values within a range", "Only the numbers 0 and 1", "Only whole-number counts", "Only letters"], "A measurement can take decimal values within its possible range."),
    createRandomVariableQuestion("Two balls are drawn without replacement, with colors red (R) or blue (B). What is the sample space?", ["{RR, RB, BR, BB}", "{R, B}", "{0, 1, 2, 3}", "{HH, HT, TH, TT}"], "For two draws, the ordered color outcomes are RR, RB, BR, and BB."),
    createRandomVariableQuestion("Two balls are drawn. Z counts the number of blue balls. What are the possible values of Z?", ["{0, 1, 2}", "{R, B}", "{1, 2, 3}", "{0, 1}"], "The two draws can contain zero, one, or two blue balls."),
    createRandomVariableQuestion("For two draws, if Z counts blue balls, what is Z for outcome RB?", ["1", "0", "2", "3"], "RB contains one blue ball, so Z = 1."),
    createRandomVariableQuestion("For two draws, if Z counts blue balls, what is Z for outcome RR?", ["0", "1", "2", "3"], "RR contains no blue balls, so Z = 0."),
    createRandomVariableQuestion("A learner's height is recorded in centimeters. Is the value countable or measurable?", ["Measurable", "Countable", "Neither", "A sample-space outcome"], "Height is obtained by measurement."),
    createRandomVariableQuestion("The number of books in a library is recorded. Is the value countable or measurable?", ["Countable", "Measurable", "Neither", "A continuous interval"], "Books are counted as individual items."),
    createRandomVariableQuestion("The weight of a newborn child is recorded. Is the value countable or measurable?", ["Measurable", "Countable", "Neither", "A coin-toss outcome"], "Weight is obtained through measurement."),
    createRandomVariableQuestion("The number of text messages sent is recorded. Is the value countable or measurable?", ["Countable", "Measurable", "Neither", "A continuous interval"], "Text messages are counted as separate items.")
];

const levelTitles = [
    "Random Variables", "Outcomes and Sample Spaces", "Two Coin Tosses", "Three Coin Tosses",
    "Discrete Variables", "Countable Quantities", "Continuous Variables", "Measured Quantities",
    "Classifying Variables", "Applying Random Variables"
];
const learningLevels = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    title: levelTitles[index],
    questions: questionBank.slice(index * 4, (index + 1) * 4)
}));


// ============================================================
// REVIEW CONTENT
// ============================================================

const reviewData = {
    randomVariables: {
        title: "Random Variables",
        content: `
            <h3>What Is a Random Variable?</h3>
            <p>A random variable assigns a numerical value to each outcome of a chance experiment. It is usually represented by a capital letter such as <strong>X</strong>.</p>
            <div class="example"><strong>Example:</strong> Toss two coins and let X be the number of heads. HH → 2, HT → 1, TH → 1, TT → 0.</div>
            <p>The possible values are <strong>X = {0, 1, 2}</strong>.</p>
        `
    },

    sampleSpace: {
        title: "Outcomes and Sample Spaces",
        content: `
            <h3>Outcomes and Sample Spaces</h3>
            <p>A sample space lists every possible outcome of a chance experiment. Apply the rule defining the random variable to each outcome to find its value.</p>
            <div class="example"><strong>Two coin tosses</strong><br>Sample space: {HH, HT, TH, TT}<br>If X counts heads, the corresponding values are 2, 1, 1, and 0.</div>
            <div class="formula">Outcome → apply the rule → numerical value</div>
        `
    },

    twoCoins: {
        title: "Example: Two Coin Tosses",
        content: `
            <h3>Two Coins: Count the Heads</h3>
            <p>Let X represent the number of heads when two coins are tossed.</p>
            <div class="example">HH → X = 2<br>HT → X = 1<br>TH → X = 1<br>TT → X = 0</div>
            <p>Collect the distinct values: <strong>X = {0, 1, 2}</strong>.</p>
            <p>Notice that different outcomes (HT and TH) can produce the same random-variable value.</p>
        `
    },

    threeCoins: {
        title: "Example: Three Coin Tosses",
        content: `
            <h3>Three Coins: Count the Tails</h3>
            <p>Let Y represent the number of tails when three coins are tossed.</p>
            <div class="example">HHH → Y = 0<br>HHT, HTH, THH → Y = 1<br>HTT, THT, TTH → Y = 2<br>TTT → Y = 3</div>
            <p>The possible values are <strong>Y = {0, 1, 2, 3}</strong>.</p>
        `
    },

    twoBalls: {
        title: "Example: Drawing Two Balls",
        content: `
            <h3>Two Balls: Count the Blue Balls</h3>
            <p>Two balls are drawn in succession without replacement from a box containing red and blue balls. Let Z be the number of blue balls drawn.</p>
            <div class="example">Sample space: {RR, RB, BR, BB}<br>RR → Z = 0<br>RB or BR → Z = 1<br>BB → Z = 2</div>
            <p>The possible values are <strong>Z = {0, 1, 2}</strong>.</p>
        `
    },

    discrete: {
        title: "Discrete Random Variables",
        content: `
            <h3>Discrete Random Variables</h3>
            <p>A discrete random variable has values that are countable. Its values often come from counting separate items or events.</p>
            <ul><li>Number of text messages sent</li><li>Number of books in a library</li><li>Number of pencils in a box</li><li>Number of even outcomes when a die is rolled: {2, 4, 6}</li></ul>
            <div class="formula">Countable values → discrete</div>
        `
    },

    continuous: {
        title: "Continuous Random Variables",
        content: `
            <h3>Continuous Random Variables</h3>
            <p>A continuous random variable has values obtained by measurement. It can take any value within a range, including decimal values.</p>
            <ul><li>Height of a learner</li><li>Weight of a newborn child or a powder</li><li>Time to finish an exam</li><li>Distance from home to school</li><li>Speed of a moving car</li><li>Temperature of a room</li></ul>
            <div class="example"><strong>Example:</strong> A powder's weight can be any measured amount from 0 mg up to 80 mg, including values such as 42.6 mg.</div>
            <div class="formula">Measured values → continuous</div>
        `
    },

    classify: {
        title: "Countable or Measurable?",
        content: `
            <h3>Classify a Variable</h3>
            <p>Ask how the value is obtained: is it counted or measured?</p>
            <div class="example"><strong>Countable → discrete</strong><br>Books in a library, text messages sent, pencils in a box, and teachers in a school.</div>
            <div class="example"><strong>Measurable → continuous</strong><br>Height, weight, time, distance, speed, and temperature.</div>
            <p>A score on a 10-item test has possible values {0, 1, 2, ..., 10}; because these values are countable, the score is discrete.</p>
            <div class="formula">Count it? Discrete.<br>Measure it? Continuous.</div>
        `
    }
};

// ============================================================
// ENTER QPI
// ============================================================

function enterQPI() {

    const nameInput = document.getElementById("studentName");
    const sectionInput = document.getElementById("studentSection");

    const name = nameInput.value.trim();
    const section = sectionInput.value;

    if (name === "") {
        alert("Please enter your name.");
        nameInput.focus();
        return;
    }

    if (section === "") {
        alert("Please select your Grade 11 section.");
        sectionInput.focus();
        return;
    }

    studentName = name;
    studentSection = section;

    localStorage.setItem("qpiStudentName", studentName);
    localStorage.setItem("qpiStudentSection", studentSection);

    document.getElementById("welcomeMessage").textContent =
        `Welcome, ${studentName}! Section ${studentSection}.`;

    hideLearningLevels();
    showScreen("menuScreen");
}

const dayOneReviewerTitle = "Random Variables and Possible Values";
const dayOneReviewer = `# DAY 1 REVIEWER
${dayOneReviewerTitle}

1. Random Variables
A random variable assigns a numerical value to each outcome of a chance experiment. It is usually named with a capital letter such as X.

2. Two Coin Tosses
Sample space: {HH, HT, TH, TT}
Let X be the number of heads:
HH → 2, HT → 1, TH → 1, TT → 0
The possible values are X = {0, 1, 2}.

3. Three Coin Tosses
If Y is the number of tails, its possible values are Y = {0, 1, 2, 3}.`;

const dayTwoReviewerTitle = "Discrete and Continuous Random Variables";
const dayTwoReviewer = `# DAY 2 REVIEWER
${dayTwoReviewerTitle}

1. Discrete Random Variables
A discrete random variable has countable possible values. Counts such as the number of books, text messages, or heads are discrete.

2. Continuous Random Variables
A continuous random variable is measured and can take any value within a range, including decimal values. Height, weight, time, distance, speed, and temperature are continuous measurements.

3. Examples
The score on a 10-item test can be {0, 1, 2, ..., 10}, so it is discrete.
A powder's weight from 0 to 80 mg is measured, so it is continuous.

Ask: Is the quantity counted or measured? Counted values are discrete; measured values are continuous.`;

function getDiscussionMaterial(day, materials) {
    const material = materials[day] || {};
    const reviewer = {
        1: { title: dayOneReviewerTitle, text: dayOneReviewer },
        2: { title: dayTwoReviewerTitle, text: dayTwoReviewer }
    }[day];

    if (!reviewer) {
        return material;
    }

    return {
        ...material,
        title: material.title || reviewer.title,
        text: Object.prototype.hasOwnProperty.call(material, "text")
            ? material.text
            : reviewer.text
    };
}

function getDiscussionState() {
    try {
        const state = JSON.parse(localStorage.getItem("qpiDiscussionState") || "{}");
        state.unlockedDay = Math.min(Math.max(Number(state.unlockedDay) || 1, 1), 10);
        state.completedDays = Array.isArray(state.completedDays) ? state.completedDays : [];
        return state;
    } catch (error) {
        return { unlockedDay: 1, completedDays: [] };
    }
}

function requireDayOneEncoding() {
    if (getDiscussionState().completedDays.includes(1)) {
        return true;
    }

    openEncoding();
    document.getElementById("discussionUnlockStatus").textContent =
        "Complete Encode Day 1 and mark it as read before opening Storing or the Retrieval Test.";
    return false;
}

function saveDiscussionState(state) {
    localStorage.setItem("qpiDiscussionState", JSON.stringify(state));
}

function getDayTwoRequirements() {
    try {
        const requirements = JSON.parse(
            localStorage.getItem("qpiDayTwoRequirements") || "{}"
        );
        const passedActivities = Array.isArray(requirements.passedActivities)
            ? requirements.passedActivities
            : requirements.wordSearchComplete === true
                ? ["wordsearch"]
                : [];

        return {
            passedActivities,
            wordSearchComplete: passedActivities.includes("wordsearch"),
            retrievalTestComplete: requirements.retrievalTestComplete === true
        };
    } catch (error) {
        return {
            passedActivities: [],
            wordSearchComplete: false,
            retrievalTestComplete: false
        };
    }
}

function hasPassedStoringActivity() {
    return getDayTwoRequirements().passedActivities.length > 0;
}

function updateDayTwoUnlock() {
    const requirements = getDayTwoRequirements();
    const state = getDiscussionState();
    const isReady = state.completedDays.includes(1)
        && hasPassedStoringActivity()
        && requirements.retrievalTestComplete;

    if (isReady && state.unlockedDay < 2) {
        state.unlockedDay = 2;
        saveDiscussionState(state);
    }

    renderDiscussionDays();
}

function completeDayTwoRequirement(requirement) {
    const requirements = getDayTwoRequirements();

    if (requirement === "wordSearchComplete") {
        if (!requirements.passedActivities.includes("wordsearch")) {
            requirements.passedActivities.push("wordsearch");
        }
    } else {
        requirements[requirement] = true;
    }

    requirements.wordSearchComplete = requirements.passedActivities.includes("wordsearch");
    localStorage.setItem("qpiDayTwoRequirements", JSON.stringify(requirements));
    updateDayTwoUnlock();
}

function completeStoringActivity(activity, scorePercentage) {
    const requirements = getDayTwoRequirements();
    const passed = scorePercentage >= 80;

    requirements.passedActivities = requirements.passedActivities.filter(
        passedActivity => passedActivity !== activity
    );

    if (passed) {
        requirements.passedActivities.push(activity);
    }

    requirements.wordSearchComplete = requirements.passedActivities.includes("wordsearch");
    localStorage.setItem("qpiDayTwoRequirements", JSON.stringify(requirements));
    updateDayTwoUnlock();

    return passed;
}

function renderStoringActivityResult(activityName, scorePercentage, onRetry) {
    const container = document.getElementById("wordSearchPuzzle");
    container.innerHTML = "";

    const section = document.createElement("section");
    section.className = "wordSearch studyActivity";

    const heading = document.createElement("h3");
    heading.textContent = `${activityName} Score: ${scorePercentage}%`;

    const message = document.createElement("p");
    message.className = "wordSearchStatus";
    message.textContent = scorePercentage >= 80
        ? "Passing score! This Storing activity is complete, so you may take the Retrieval Test."
        : "You need at least 80% to pass. Review the material and try this activity again, or choose another Storing activity.";

    const retryButton = document.createElement("button");
    retryButton.type = "button";
    retryButton.className = "secondary";
    retryButton.textContent = "Try Again";
    retryButton.onclick = onRetry;

    section.append(heading, message, retryButton);
    container.appendChild(section);
}

function getDiscussionMaterials() {
    try {
        return JSON.parse(localStorage.getItem("qpiDiscussionMaterials") || "{}");
    } catch (error) {
        return {};
    }
}

function getLearningActivities() {
    try {
        return JSON.parse(localStorage.getItem("qpiLearningActivities") || "{}");
    } catch (error) {
        return {};
    }
}

function openEncoding() {
    renderDiscussionDays();
    showScreen("encodeScreen");
}

function openStoredMaterials(message = "") {
    if (wordSearchTimerId !== null) {
        clearInterval(wordSearchTimerId);
        wordSearchTimerId = null;
    }

    if (!requireDayOneEncoding()) {
        return;
    }

    document.getElementById("storingStatus").textContent = message;
    renderStoredMaterials();
    showScreen("storeScreen");
}

function renderStoringActivity(activity, message = "") {
    if (!requireDayOneEncoding()) {
        return;
    }

    if (activity !== "wordsearch" && wordSearchTimerId !== null) {
        clearInterval(wordSearchTimerId);
        wordSearchTimerId = null;
    }

    document.querySelectorAll("#storingActivityChoices button").forEach(button => {
        const isSelected = button.getAttribute("onclick").includes(`'${activity}'`);
        button.classList.toggle("secondary", !isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
    });

    const activityTitles = {
        wordsearch: "Word Search",
        flashcards: "Flash Cards",
        mnemonics: "Mnemonics"
    };
    document.getElementById("storingActivityTitle").textContent =
        activityTitles[activity] || "Storing Activity";

    if (activity === "wordsearch") {
        renderWordSearch(message);
    } else if (activity === "flashcards") {
        renderStoringFlashcards();
    } else if (activity === "mnemonics") {
        renderStoringMnemonics();
    } else {
        return;
    }

    document.getElementById("storingStatus").textContent = "";
    showScreen("storingActivityScreen");
}

function backToStoringChoices() {
    if (wordSearchTimerId !== null) {
        clearInterval(wordSearchTimerId);
        wordSearchTimerId = null;
    }
    showScreen("storeScreen");
}

const wordSearchWords = [
    "RANDOM", "VARIABLE", "DISCRETE", "CONTINUOUS", "COUNTABLE",
    "MEASURABLE", "OUTCOME", "SAMPLESPACE", "EXPERIMENT", "MEASUREMENT"
];
let wordSearchTimerId = null;
let currentStoringFlashcard = 0;
let storingFlashcardRatings = [];

const storingFlashcards = [
    { front: "What is a random variable?", back: "A rule that assigns a number to each outcome of a chance experiment." },
    { front: "How are random variables usually named?", back: "With a capital letter, usually X or Y." },
    { front: "What is the sample space for two coin tosses?", back: "{HH, HT, TH, TT}." },
    { front: "Two coins are tossed. X counts heads. What values can X take?", back: "X = {0, 1, 2}." },
    { front: "Three coins are tossed. Y counts tails. What values can Y take?", back: "Y = {0, 1, 2, 3}." },
    { front: "What is a discrete random variable?", back: "A random variable with countable possible values, often describing a count." },
    { front: "What is a continuous random variable?", back: "A random variable whose values are obtained through measurement and may include decimals." },
    { front: "Give two examples of discrete quantities.", back: "Number of books in a library; number of text messages sent." },
    { front: "Give two examples of continuous quantities.", back: "Height and weight; time, distance, speed, or temperature." },
    { front: "How can you quickly distinguish discrete from continuous?", back: "Counted or countable values are discrete; measured values are continuous." }
];
function renderStoringFlashcards() {
    const container = document.getElementById("wordSearchPuzzle");
    if (wordSearchTimerId !== null) {
        clearInterval(wordSearchTimerId);
        wordSearchTimerId = null;
    }

    currentStoringFlashcard = 0;
    storingFlashcardRatings = Array(storingFlashcards.length).fill(null);
    renderStoringFlashcard();
}

function renderStoringFlashcard(showAnswer = false) {
    const container = document.getElementById("wordSearchPuzzle");
    const card = storingFlashcards[currentStoringFlashcard];
    container.innerHTML = "";

    const section = document.createElement("section");
    section.className = "wordSearch studyActivity";

    const heading = document.createElement("h3");
    heading.textContent = "Flash Cards";

    const progress = document.createElement("p");
    progress.className = "wordSearchInstructions";
    progress.textContent =
        `Card ${currentStoringFlashcard + 1} of ${storingFlashcards.length}`;

    const cardContent = document.createElement("div");
    cardContent.className = "flashcard";
    cardContent.setAttribute("aria-live", "polite");
    cardContent.textContent = showAnswer ? card.back : card.front;

    const flipButton = document.createElement("button");
    flipButton.type = "button";
    flipButton.textContent = showAnswer ? "Show Question" : "Flip Card";
    flipButton.onclick = () => renderStoringFlashcard(!showAnswer);

    const navigation = document.createElement("div");
    navigation.className = "flashcardNavigation";

    if (showAnswer) {
        const gotItButton = document.createElement("button");
        gotItButton.type = "button";
        gotItButton.textContent = "I knew it";
        gotItButton.onclick = () => rateStoringFlashcard(true);

        const reviewButton = document.createElement("button");
        reviewButton.type = "button";
        reviewButton.className = "secondary";
        reviewButton.textContent = "Need to review";
        reviewButton.onclick = () => rateStoringFlashcard(false);
        navigation.append(gotItButton, reviewButton);
    }

    section.append(heading, progress, cardContent, flipButton, navigation);
    container.appendChild(section);
}

function rateStoringFlashcard(knewAnswer) {
    storingFlashcardRatings[currentStoringFlashcard] = knewAnswer;

    if (currentStoringFlashcard < storingFlashcards.length - 1) {
        currentStoringFlashcard++;
        renderStoringFlashcard();
        return;
    }

    const scorePercentage = Math.round(
        (storingFlashcardRatings.filter(Boolean).length / storingFlashcards.length) * 100
    );
    completeStoringActivity("flashcards", scorePercentage);
    renderStoringActivityResult(
        "Flash Cards",
        scorePercentage,
        renderStoringFlashcards
    );
}

const mnemonicQuizQuestions = [
    { question: "A discrete random variable has values that are usually what?", choices: ["Countable", "Measured", "Only negative", "Non-numerical"], answer: 0 },
    { question: "A continuous random variable is obtained through what?", choices: ["Measurement", "Counting separate objects", "Naming outcomes", "Sorting a list"], answer: 0 },
    { question: "Which is discrete?", choices: ["Number of pencils in a box", "Weight of a child", "Height of a learner", "Time to travel"], answer: 0 },
    { question: "Which is continuous?", choices: ["Distance from home to school", "Number of students", "Number of books", "Number of calls"], answer: 0 },
    { question: "Two coins are tossed and X counts heads. Which set is X's possible values?", choices: ["{0, 1, 2}", "{H, T}", "{1, 2, 3}", "{0, 1}"], answer: 0 },
    { question: "What does a random variable assign to each chance outcome?", choices: ["A numerical value", "A color", "A student name", "A unit of measurement"], answer: 0 }
];
function renderStoringMnemonics() {
    const container = document.getElementById("wordSearchPuzzle");
    if (wordSearchTimerId !== null) {
        clearInterval(wordSearchTimerId);
        wordSearchTimerId = null;
    }

    const section = document.createElement("section");
    section.className = "wordSearch studyActivity";

    const heading = document.createElement("h3");
    heading.textContent = "Random Variables: Memory Tips";
    section.appendChild(heading);

    const memoryTips = [
        ["Random variable", "A capital letter such as X assigns numerical values to outcomes of a chance experiment."],
        ["Discrete = countable", "Counts of books, messages, pencils, or teachers are discrete."],
        ["Continuous = measured", "Height, weight, time, distance, speed, and temperature are continuous."],
        ["Find the possible values", "List the experiment outcomes, apply the random-variable rule to each outcome, then collect the numbers."]
    ];
    memoryTips.forEach(([title, description]) => {
        const item = document.createElement("article");
        item.className = "mnemonicItem";
        const itemHeading = document.createElement("h4");
        itemHeading.textContent = title;
        const text = document.createElement("p");
        text.innerHTML = description;
        item.append(itemHeading, text);
        section.appendChild(item);
    });

    const beginButton = document.createElement("button");
    beginButton.type = "button";
    beginButton.textContent = "Take Mnemonics Check";
    beginButton.onclick = () => renderMnemonicQuiz();
    section.appendChild(beginButton);
    container.replaceChildren(section);
}

function renderMnemonicQuiz(questionIndex = 0, answers = []) {
    const container = document.getElementById("wordSearchPuzzle");
    const question = prepareQuestionForQuiz(mnemonicQuizQuestions[questionIndex]);
    let selectedAnswer = null;

    const section = document.createElement("section");
    section.className = "wordSearch studyActivity";

    const heading = document.createElement("h3");
    heading.textContent = "Mnemonics Check";

    const prompt = document.createElement("p");
    prompt.textContent = `Question ${questionIndex + 1} of ${mnemonicQuizQuestions.length}: ${question.question}`;

    const choices = document.createElement("div");
    const submit = document.createElement("button");
    submit.type = "button";
    submit.textContent = questionIndex === mnemonicQuizQuestions.length - 1
        ? "Finish Check"
        : "Submit and Continue";
    submit.disabled = true;

    question.choices.forEach((choice, index) => {
        const choiceButton = document.createElement("button");
        choiceButton.type = "button";
        choiceButton.className = "secondary";
        choiceButton.textContent = choice;
        choiceButton.onclick = () => {
            selectedAnswer = index;
            choices.querySelectorAll("button").forEach((button, buttonIndex) => {
                button.classList.toggle("selected", buttonIndex === index);
            });
            submit.disabled = false;
        };
        choices.appendChild(choiceButton);
    });

    submit.onclick = () => {
        if (selectedAnswer === null) {
            return;
        }

        answers.push(selectedAnswer === question.answer);
        if (questionIndex < mnemonicQuizQuestions.length - 1) {
            renderMnemonicQuiz(questionIndex + 1, answers);
            return;
        }

        const scorePercentage = Math.round(
            (answers.filter(Boolean).length / mnemonicQuizQuestions.length) * 100
        );
        completeStoringActivity("mnemonics", scorePercentage);
        renderStoringActivityResult(
            "Mnemonics Check",
            scorePercentage,
            renderStoringMnemonics
        );
    };

    section.append(heading, prompt, choices, submit);
    container.replaceChildren(section);
}

function createWordSearchGrid() {
    const size = 12;
    const directions = [
        [0, 1], [1, 0], [0, -1], [-1, 0],
        [1, 1], [-1, -1], [1, -1], [-1, 1]
    ];

    for (let gridAttempt = 0; gridAttempt < 30; gridAttempt++) {
        const grid = Array.from({ length: size }, () => Array(size).fill(""));
        let allWordsPlaced = true;

        const wordsByLength = shuffleArray(wordSearchWords)
            .sort((first, second) => second.length - first.length);

        for (const word of wordsByLength) {
            let placed = false;

            for (let attempt = 0; attempt < 1000 && !placed; attempt++) {
                const [rowStep, columnStep] = directions[
                    Math.floor(Math.random() * directions.length)
                ];
                const row = Math.floor(Math.random() * size);
                const column = Math.floor(Math.random() * size);
                const endRow = row + rowStep * (word.length - 1);
                const endColumn = column + columnStep * (word.length - 1);

                if (endRow < 0 || endRow >= size || endColumn < 0 || endColumn >= size) {
                    continue;
                }

                const canPlace = [...word].every((letter, index) => {
                    const existing = grid[row + rowStep * index][column + columnStep * index];
                    return !existing || existing === letter;
                });

                if (!canPlace) {
                    continue;
                }

                [...word].forEach((letter, index) => {
                    grid[row + rowStep * index][column + columnStep * index] = letter;
                });
                placed = true;
            }

            if (!placed) {
                allWordsPlaced = false;
                break;
            }
        }

        if (allWordsPlaced) {
            return grid.map(row => row.map(letter =>
                letter || String.fromCharCode(65 + Math.floor(Math.random() * 26))
            ));
        }
    }

    throw new Error("Could not generate a complete word search puzzle.");
}

function renderWordSearch(message = "") {
    const container = document.getElementById("wordSearchPuzzle");
    if (wordSearchTimerId !== null) {
        clearInterval(wordSearchTimerId);
        wordSearchTimerId = null;
    }

    const grid = createWordSearchGrid();
    const foundWords = new Set();
    let selectionStart = null;
    let remainingSeconds = 3 * 60;
    let puzzleFinished = false;

    container.innerHTML = "";

    const section = document.createElement("section");
    section.className = "wordSearch";

    const heading = document.createElement("h3");
    heading.textContent = "Word Search: Random Variables";

    const instructions = document.createElement("p");
    instructions.className = "wordSearchInstructions";
    instructions.textContent =
        "Find the lesson terms in the letter grid. Tap the first and last letter of a word in a straight line. Words may run in any direction.";

    const timer = document.createElement("p");
    timer.className = "wordSearchTimer";
    timer.setAttribute("role", "timer");
    timer.setAttribute("aria-live", "off");

    const updateTimer = () => {
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        timer.textContent = `Time remaining: ${minutes}:${String(seconds).padStart(2, "0")}`;
    };

    updateTimer();

    const status = document.createElement("p");
    status.className = "wordSearchStatus";
    status.setAttribute("role", "status");
    status.textContent = message
        ? `${message} Found 0 of ${wordSearchWords.length} words.`
        : `Found 0 of ${wordSearchWords.length} words.`;

    const gridWrapper = document.createElement("div");
    gridWrapper.className = "wordSearchGridWrapper";

    const gridElement = document.createElement("div");
    gridElement.className = "wordSearchGrid";
    gridElement.setAttribute("aria-label", "Word search letter grid");

    const wordList = document.createElement("ul");
    wordList.className = "wordSearchWords";

    wordSearchWords.forEach(word => {
        const item = document.createElement("li");
        item.textContent = word;
        item.dataset.word = word;
        wordList.appendChild(item);
    });

    const newPuzzleButton = document.createElement("button");
    newPuzzleButton.type = "button";
    newPuzzleButton.className = "secondary";
    newPuzzleButton.textContent = "New Puzzle";
    newPuzzleButton.onclick = renderWordSearch;

    wordSearchTimerId = setInterval(() => {
        remainingSeconds--;
        updateTimer();

        if (remainingSeconds <= 0) {
            clearInterval(wordSearchTimerId);
            wordSearchTimerId = null;
            puzzleFinished = true;
            gridElement.querySelectorAll(".wordSearchCell").forEach(cell => {
                cell.disabled = true;
            });
            status.textContent = `Time is up. You found ${foundWords.size} of ${wordSearchWords.length} words.`;
        }
    }, 1000);

    grid.forEach((rowLetters, rowIndex) => {
        rowLetters.forEach((letter, columnIndex) => {
            const cell = document.createElement("button");
            cell.type = "button";
            cell.className = "wordSearchCell";
            cell.textContent = letter;
            cell.setAttribute("aria-label", `Row ${rowIndex + 1}, column ${columnIndex + 1}: ${letter}`);
            cell.dataset.row = rowIndex;
            cell.dataset.column = columnIndex;
            cell.onclick = () => {
                if (puzzleFinished) {
                    return;
                }

                if (!selectionStart) {
                    gridElement.querySelectorAll(".selected").forEach(item =>
                        item.classList.remove("selected")
                    );
                    selectionStart = { row: rowIndex, column: columnIndex };
                    cell.classList.add("selected");
                    status.textContent = "Now tap the last letter of the word.";
                    return;
                }

                const rowDifference = rowIndex - selectionStart.row;
                const columnDifference = columnIndex - selectionStart.column;
                const length = Math.max(
                    Math.abs(rowDifference),
                    Math.abs(columnDifference)
                ) + 1;
                const isStraight = rowDifference === 0
                    || columnDifference === 0
                    || Math.abs(rowDifference) === Math.abs(columnDifference);

                if (isStraight && length > 1) {
                    const rowStep = Math.sign(rowDifference);
                    const columnStep = Math.sign(columnDifference);
                    const selectedLetters = Array.from({ length }, (_, index) => {
                        const selectedRow = selectionStart.row + rowStep * index;
                        const selectedColumn = selectionStart.column + columnStep * index;
                        return grid[selectedRow][selectedColumn];
                    }).join("");
                    const matchingWord = wordSearchWords.find(word =>
                        !foundWords.has(word)
                        && (word === selectedLetters || word === [...selectedLetters].reverse().join(""))
                    );

                    if (matchingWord) {
                        foundWords.add(matchingWord);
                        for (let index = 0; index < length; index++) {
                            const selectedRow = selectionStart.row + rowStep * index;
                            const selectedColumn = selectionStart.column + columnStep * index;
                            gridElement.querySelector(
                                `[data-row="${selectedRow}"][data-column="${selectedColumn}"]`
                            ).classList.add("found");
                        }
                        wordList.querySelector(`[data-word="${matchingWord}"]`).classList.add("foundWord");
                        status.textContent = foundWords.size === wordSearchWords.length
                            ? "You found every word. Great work!"
                            : `Found ${matchingWord}. ${foundWords.size} of ${wordSearchWords.length} words found.`;
                        if (foundWords.size === wordSearchWords.length) {
                            puzzleFinished = true;
                            clearInterval(wordSearchTimerId);
                            wordSearchTimerId = null;
                            timer.textContent = `Completed with ${timer.textContent.replace("Time remaining: ", "")} remaining.`;
                            newPuzzleButton.disabled = false;
                            completeDayTwoRequirement("wordSearchComplete");
                        }
                    } else {
                        status.textContent = "No matching word there. Try another line.";
                    }
                } else {
                    status.textContent = "Choose two letters in the same row, column, or diagonal.";
                }

                selectionStart = null;
                gridElement.querySelectorAll(".selected").forEach(item =>
                    item.classList.remove("selected")
                );
            };
            gridElement.appendChild(cell);
        });
    });

    gridWrapper.appendChild(gridElement);
    section.append(heading, instructions, timer, gridWrapper, wordList, status, newPuzzleButton);
    container.appendChild(section);
}

function renderStoredMaterials() {
    const container = document.getElementById("storedMaterialsContent");
    const materials = getDiscussionMaterials();
    const activities = getLearningActivities();
    const typeNames = {
        puzzle: "Math Puzzle",
        flashcards: "Flashcards",
        crossword: "Crossword",
        wordsearch: "Word Search"
    };

    container.innerHTML = "";

    let hasStoredContent = false;

    for (let day = 1; day <= 10; day++) {
        const material = getDiscussionMaterial(day, materials);
        const dayActivities = Array.isArray(activities[day]) ? activities[day] : [];
        const showDiscussionMaterial = day !== 1 && day !== 2;

        if ((!showDiscussionMaterial || (!material.title && !material.text)) && !dayActivities.length) {
            continue;
        }

        hasStoredContent = true;

        const daySection = document.createElement("section");
        daySection.className = "storedDay";

        if (showDiscussionMaterial) {
            const heading = document.createElement("h3");
            heading.textContent = `Day ${day}${material.title ? `: ${material.title}` : ""}`;
            daySection.appendChild(heading);

            if (material.text) {
                const discussion = document.createElement("p");
                discussion.className = "storedDiscussionText";
                discussion.textContent = material.text;
                daySection.appendChild(discussion);
            }
        }

        dayActivities.forEach(activity => {
            const activityBlock = document.createElement("article");
            activityBlock.className = "storedActivity";

            const activityHeading = document.createElement("h4");
            activityHeading.textContent = `${typeNames[activity.type] || "Learning Activity"}: ${activity.title}`;

            const prompt = document.createElement("p");
            prompt.textContent = activity.prompt;

            const answer = document.createElement("p");
            answer.className = "storedAnswer";
            answer.textContent = `Answer: ${activity.answer}`;

            activityBlock.append(activityHeading, prompt, answer);
            daySection.appendChild(activityBlock);
        });

        container.appendChild(daySection);
    }

    if (!hasStoredContent) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No materials stored yet. Use Encode to add a discussion or learning activity.";
        container.appendChild(emptyMessage);
    }
}

function renderDiscussionDays() {
    const container = document.getElementById("discussionDays");
    const state = getDiscussionState();
    const requirements = getDayTwoRequirements();
    const dayTwoReady = state.completedDays.includes(1)
        && hasPassedStoringActivity()
        && requirements.retrievalTestComplete;

    container.innerHTML = "";

    for (let day = 1; day <= 10; day++) {
        const button = document.createElement("button");
        const isCompleted = state.completedDays.includes(day);
        const isUnlocked = day === 1
            || (day <= state.unlockedDay
                && (day !== 2 || dayTwoReady)
                && (day < 3 || state.completedDays.includes(2)));

        button.type = "button";
        button.textContent = isCompleted
            ? `Day ${day} ✓`
            : isUnlocked
                ? `Day ${day}`
                : `🔒 Day ${day}`;
        button.disabled = !isUnlocked;

        if (isUnlocked) {
            button.onclick = () => openDiscussionDay(day);
        }

        container.appendChild(button);
    }

    const unlockStatus = document.getElementById("discussionUnlockStatus");
    if (unlockStatus) {
        const remaining = [];
        if (!state.completedDays.includes(1)) {
            remaining.push("mark Day 1 as read");
        }
        if (!hasPassedStoringActivity()) {
            remaining.push("pass at least 80% in any one Storing activity");
        }
        if (!requirements.retrievalTestComplete) {
            remaining.push("finish the Retrieval Test");
        }

        const remainingText = remaining.length < 2
            ? remaining[0]
            : `${remaining.slice(0, -1).join(", ")}, and ${remaining[remaining.length - 1]}`;

        unlockStatus.textContent = dayTwoReady
            ? "Day 2 is unlocked."
            : `To unlock Day 2, ${remainingText}.`;
    }
}

function openDiscussionDay(day) {
    const state = getDiscussionState();

    if (day > state.unlockedDay || day < 1 || day > 10) {
        return;
    }

    const materials = getDiscussionMaterials();
    const material = getDiscussionMaterial(day, materials);
    const editor = document.getElementById("discussionEditor");

    currentDiscussionDay = day;
    document.getElementById("discussionDayTitle").textContent =
        `Day ${day}${material.title ? `: ${material.title}` : ""}`;
    document.getElementById("dayOneReviewerDiagram").classList.toggle("hidden", day !== 1);
    document.getElementById("dayTwoReviewerDiagram").classList.toggle("hidden", day !== 2);
    document.getElementById("discussionMaterialText").value = material.text || "";
    document.getElementById("discussionStatus").textContent = state.completedDays.includes(day)
        ? "This discussion is complete."
        : "";
    editor.classList.remove("hidden");
    showScreen("discussionScreen");
}

function backToDiscussionDays() {
    renderDiscussionDays();
    showScreen("encodeScreen");
}

function saveDiscussionMaterial() {
    if (!currentDiscussionDay) {
        return;
    }

    const materials = getDiscussionMaterials();
    const existingMaterial = materials[currentDiscussionDay] || {};
    const reviewerTitle = {
        1: dayOneReviewerTitle,
        2: dayTwoReviewerTitle
    }[currentDiscussionDay];

    materials[currentDiscussionDay] = {
        ...existingMaterial,
        ...(reviewerTitle && !existingMaterial.title
            ? { title: reviewerTitle }
            : {}),
        text: document.getElementById("discussionMaterialText").value.trim()
    };
    localStorage.setItem("qpiDiscussionMaterials", JSON.stringify(materials));
    document.getElementById("discussionStatus").textContent = "Material saved on this device.";
}

function markDiscussionRead() {
    if (!currentDiscussionDay) {
        return;
    }

    const materialText = document.getElementById("discussionMaterialText").value.trim();

    if (!materialText) {
        alert("Add the review material before marking this discussion as read.");
        return;
    }

    saveDiscussionMaterial();

    const state = getDiscussionState();
    if (!state.completedDays.includes(currentDiscussionDay)) {
        state.completedDays.push(currentDiscussionDay);
    }
    if (currentDiscussionDay === 1) {
        state.unlockedDay = Math.max(state.unlockedDay, 1);
    } else {
        state.unlockedDay = Math.min(
            10,
            Math.max(state.unlockedDay, currentDiscussionDay + 1)
        );
    }
    saveDiscussionState(state);

    if (currentDiscussionDay === 1) {
        updateDayTwoUnlock();
        const requirements = getDayTwoRequirements();
        const dayTwoReady = hasPassedStoringActivity()
            && requirements.retrievalTestComplete;
        document.getElementById("discussionStatus").textContent = dayTwoReady
            ? "Day 1 complete. Day 2 is now unlocked."
            : "Day 1 complete. Pass at least 80% in one Storing activity and the Retrieval Test to unlock Day 2.";
    } else {
        document.getElementById("discussionStatus").textContent =
            currentDiscussionDay < 10
                ? `Day ${currentDiscussionDay} complete. Day ${currentDiscussionDay + 1} is now unlocked.`
                : "Day 10 complete. You finished all daily discussions.";
    }
    renderDiscussionDays();
}

// ============================================================
// SCREEN CONTROL
// ============================================================

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.add("hidden");
    });

    const target = document.getElementById(screenId);

    if (target) {
        target.classList.remove("hidden");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ============================================================
// START QUIZ
// ============================================================

const retrievalTestQuestions = [
    { question: "What is a random variable?", choices: ["A rule assigning numbers to outcomes of a chance experiment", "A list of letters", "A fixed measurement", "A type of graph"], answer: 0, explanation: "A random variable assigns a numerical value to each outcome of a chance experiment." },
    { question: "Two coins are tossed. X counts heads. What are the possible values of X?", choices: ["{0, 1, 2}", "{H, T}", "{1, 2, 3}", "{0, 1}"], answer: 0, explanation: "Two tosses can result in zero, one, or two heads." },
    { question: "Three coins are tossed. Y counts tails. What is Y for TTT?", choices: ["3", "2", "1", "0"], answer: 0, explanation: "TTT has three tails, so Y = 3." },
    { question: "Which is a discrete random variable?", choices: ["Number of books in a library", "Height of a learner", "Time to finish an exam", "Temperature of a room"], answer: 0, explanation: "Books are counted in whole items, so their number is discrete." },
    { question: "Which is a continuous random variable?", choices: ["Weight of a newborn", "Number of teachers", "Number of pencils", "Number of messages"], answer: 0, explanation: "Weight is measured and can take decimal values." },
    { question: "A student's score on a 10-item test can range from 0 to 10 whole points. Is it discrete or continuous?", choices: ["Discrete", "Continuous", "Neither", "Both by definition"], answer: 0, explanation: "The possible scores are a countable set of whole-number values." },
    { question: "Which quantity is obtained through measurement?", choices: ["Distance from home to school", "Number of books", "Number of calls", "Number of students"], answer: 0, explanation: "Distance is measured, so it is continuous." },
    { question: "Two balls are drawn. Z counts the blue balls. What values can Z take?", choices: ["{0, 1, 2}", "{R, B}", "{1, 2, 3}", "{0, 1}"], answer: 0, explanation: "Two draws can contain zero, one, or two blue balls." },
    { question: "The number of text messages sent is countable or measurable?", choices: ["Countable", "Measurable", "Neither", "Continuous"], answer: 0, explanation: "Messages are counted as separate items." },
    { question: "The time it takes to finish an exam is countable or measurable?", choices: ["Measurable", "Countable", "Neither", "A sample space"], answer: 0, explanation: "Time is measured and may take fractional values." }
];
function prepareRetrievalTestQuestions() {
    const answerPositions = shuffleArray([
        0, 0, 1, 1, 2, 2, 3, 3,
        Math.floor(Math.random() * 4),
        Math.floor(Math.random() * 4)
    ]);

    return retrievalTestQuestions.map((question, index) => {
        const correctChoice = question.choices[question.answer];
        const otherChoices = shuffleArray(
            question.choices.filter((_, choiceIndex) => choiceIndex !== question.answer)
        );
        const choices = [...otherChoices];
        choices.splice(answerPositions[index], 0, correctChoice);

        return {
            ...question,
            choices,
            answer: answerPositions[index]
        };
    });
}

function startQuiz(type) {

    if (type === "practice") {
        renderLearningLevels();
        showScreen("dailyQuizScreen");
        return;
    }

    if (type === "retrieval" && !requireDayOneEncoding()) {
        return;
    }

    if (type === "retrieval" && !hasPassedStoringActivity()) {
        openStoredMaterials("Pass at least 80% in one Storing activity before starting the Retrieval Test.");
        return;
    }

    currentQuiz = type;
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    answerSubmitted = false;
    userAnswers = [];

    currentQuestions = type === "retrieval"
        ? prepareRetrievalTestQuestions()
        : shuffleArray(questionBank)
            .slice(0, 10)
            .map(prepareQuestionForQuiz);

    document.getElementById("quizType").textContent =
        getQuizName(type);

    showScreen("quizScreen");

    loadQuestion();
}


// ============================================================
// QUIZ NAME
// ============================================================

function getQuizName(type) {

    if (type === "pretest") {
        return "📝 Pre-Test";
    }

    if (type === "practice") {
        return "📚 Daily Quiz";
    }

    if (type === "retrieval") {
        return "📚 Retrieval Test";
    }

    if (type === "posttest") {
        return "📊 Post-Test";
    }

    return "Quiz";
}


// ============================================================
// LOAD QUESTION
// ============================================================

function loadQuestion() {

    const question = currentQuestions[currentQuestion];

    selectedAnswer = null;
    answerSubmitted = false;

    document.getElementById("questionNumber").textContent =
        `Question ${currentQuestion + 1} of ${currentQuestions.length}`;

    document.getElementById("progressFill").style.width =
        `${(currentQuestion / currentQuestions.length) * 100}%`;

    document.getElementById("questionText").textContent =
        question.question;

    const choicesContainer = document.getElementById("choices");

    choicesContainer.innerHTML = "";

    question.choices.forEach((choice, index) => {

        const button = document.createElement("button");

        button.type = "button";

        button.className = "choice";

        button.textContent =
            `${String.fromCharCode(65 + index)}. ${choice}`;

        button.onclick = () => selectAnswer(index);

        choicesContainer.appendChild(button);

    });

    document.getElementById("feedback").className = "hidden";

    const nextButton = document.getElementById("nextButton");

    nextButton.disabled = true;

    nextButton.textContent = currentQuiz === "retrieval"
        ? currentQuestion === currentQuestions.length - 1
            ? "Finish Test"
            : "Next Question"
        : "Check Answer";
}


// ============================================================
// SELECT ANSWER
// ============================================================

function selectAnswer(index) {

    if (answerSubmitted) {
        return;
    }

    selectedAnswer = index;

    const choices =
        document.querySelectorAll(".choice");

    choices.forEach((choice, i) => {

        choice.classList.toggle(
            "selected",
            i === index
        );

    });

    document.getElementById("nextButton").disabled = false;
}


// ============================================================
// CHECK ANSWER
// ============================================================

function checkAnswer() {

    if (selectedAnswer === null || answerSubmitted) {
        return;
    }

    answerSubmitted = true;

    const question =
        currentQuestions[currentQuestion];

    const choices =
        document.querySelectorAll(".choice");

    choices.forEach((choice, index) => {

        choice.disabled = true;

        if (index === question.answer) {
            choice.classList.add("correct");
        }

        if (
            index === selectedAnswer &&
            selectedAnswer !== question.answer
        ) {
            choice.classList.add("incorrect");
        }

    });

    const isCorrect =
        selectedAnswer === question.answer;

    if (isCorrect) {
        score++;
    }

    userAnswers.push({
        question: question.question,
        selectedAnswer: selectedAnswer,
        correctAnswer: question.answer,
        correct: isCorrect
    });

    const feedback =
        document.getElementById("feedback");

    feedback.className =
        isCorrect
            ? "feedback correct"
            : "feedback incorrect";

    document.getElementById("feedbackTitle").textContent =
        isCorrect
            ? "✅ Correct!"
            : "❌ Incorrect";

    document.getElementById("correctAnswer").textContent =
        `Correct Answer: ${question.choices[question.answer]}`;

    document.getElementById("explanation").textContent =
        question.explanation;

    const nextButton =
        document.getElementById("nextButton");

    nextButton.disabled = false;

    if (currentQuestion === currentQuestions.length - 1) {
        nextButton.textContent = "Finish Quiz";
    } else {
        nextButton.textContent = "Next Question";
    }
}


// ============================================================
// NEXT QUESTION
// ============================================================

function nextQuestion() {
    if (currentQuiz === "retrieval") {
        if (selectedAnswer === null) {
            return;
        }

        const question = currentQuestions[currentQuestion];
        const isCorrect = selectedAnswer === question.answer;

        if (isCorrect) {
            score++;
        }

        userAnswers.push({
            question: question.question,
            selectedAnswer,
            correctAnswer: question.answer,
            correct: isCorrect
        });

        if (currentQuestion < currentQuestions.length - 1) {
            currentQuestion++;
            loadQuestion();
        } else {
            finishQuiz();
        }
        return;
    }

    if (!answerSubmitted) {
        checkAnswer();
        return;
    }

    if (currentQuestion <
        currentQuestions.length - 1) {

        currentQuestion++;

        loadQuestion();

    } else {

        finishQuiz();

    }
}


// ============================================================
// FINISH QUIZ
// ============================================================

function finishQuiz() {

    const total =
        currentQuestions.length;

    const percentage =
        Math.round((score / total) * 100);

    if (currentQuiz === "retrieval") {
        const passedRetrievalTest = percentage >= 80;
        const requirements = getDayTwoRequirements();

        requirements.retrievalTestComplete = passedRetrievalTest;
        if (!passedRetrievalTest) {
            requirements.passedActivities = [];
        }
        requirements.wordSearchComplete = requirements.passedActivities.includes("wordsearch");
        localStorage.setItem("qpiDayTwoRequirements", JSON.stringify(requirements));
        updateDayTwoUnlock();

    }

    const result = {

        name: studentName,

        section: studentSection,

        quizType: currentQuiz,

        score: score,

        total: total,

        percentage: percentage,

        date: new Date().toLocaleString()

    };

    const oldResults =
        JSON.parse(
            localStorage.getItem("qpiResults") || "[]"
        );

    oldResults.push(result);

    localStorage.setItem(
        "qpiResults",
        JSON.stringify(oldResults)
    );

    document.getElementById("resultMessage").textContent =
        `${studentName}, you completed the ${getQuizName(currentQuiz)}.`;

    document.getElementById("finalScore").textContent =
        `${score} / ${total}`;

    document.getElementById("percentage").textContent =
        `${percentage}%`;

    let message = "";

    if (percentage >= 90) {

        message =
            "Excellent work! You have demonstrated strong understanding of the lessons.";

    } else if (percentage >= 80) {

        message =
            "Great job! Keep practicing to strengthen your understanding.";

    } else if (percentage >= 70) {

        message =
            "Good effort! Review the lessons and continue practicing.";

    } else {

        message =
            "Keep practicing! Review Random Variables before trying again.";

    }

    document.getElementById("performanceMessage").textContent =
        message;

    if (currentQuiz === "retrieval" && percentage < 80) {
        document.getElementById("performanceMessage").textContent =
            "You need at least 80% to pass. Complete any Storing activity with a passing score, then take the Retrieval Test again.";
    }

    renderRetrievalTestReview();

    const resultActions = document.getElementById("resultActions");
    const passThreshold = 70;

    if (currentQuiz === "practice") {
        const level = learningLevels.find(item => item.id === currentLearningLevel);
        const isPassed = percentage >= passThreshold;

        if (!isPassed) {
            resultActions.innerHTML = `
                <button type="button" onclick="reviewMistakes()">Review Mistakes</button>
                <button type="button" onclick="retryLearningLevel()">Retry</button>
            `;

            document.getElementById("performanceMessage").innerHTML = `
                <p>${message}</p>
                <p>You need at least 70% to unlock the next level.</p>
            `;
        } else {
            const state = getLearningState();
            state.unlockedLevel = Math.min(
                learningLevels.length,
                Math.max(state.unlockedLevel || 1, level ? level.id + 1 : 1)
            );
            saveLearningState(state);
            renderLearningLevels();

            resultActions.innerHTML = `
                <button type="button" onclick="startLearningLevel(${Math.min(currentLearningLevel + 1, learningLevels.length)})">Next Level</button>
            `;

            document.getElementById("performanceMessage").innerHTML = `
                <p>${message}</p>
                <p>Level cleared! You unlocked the next daily level.</p>
            `;
        }
    } else if (currentQuiz === "retrieval" && percentage < 80) {
        resultActions.innerHTML = `
            <button type="button" onclick="openStoredMaterials('Pass at least 80% in any one Storing activity to unlock another Retrieval Test attempt.')">Choose Storing Activity</button>
        `;
    } else {
        resultActions.innerHTML = "";
    }

    showScreen("resultScreen");
}

function renderRetrievalTestReview() {
    const container = document.getElementById("retrievalTestReview");
    container.innerHTML = "";

    if (currentQuiz !== "retrieval") {
        return;
    }

    const heading = document.createElement("h3");
    heading.textContent = "Review Your Answers";
    container.appendChild(heading);

    const missedAnswers = userAnswers
        .map((answer, index) => ({ answer, question: currentQuestions[index], index }))
        .filter(item => !item.answer.correct);

    if (!missedAnswers.length) {
        const message = document.createElement("p");
        message.textContent = "You answered every question correctly. Great work!";
        container.appendChild(message);
        return;
    }

    const introduction = document.createElement("p");
    introduction.textContent =
        "Here are the questions to review, with the correct answers and explanations.";
    container.appendChild(introduction);

    missedAnswers.forEach(({ answer, question, index }) => {
        const item = document.createElement("article");
        item.className = "progressItem";

        const questionText = document.createElement("h4");
        questionText.textContent = `${index + 1}. ${question.question}`;

        const selectedText = document.createElement("p");
        selectedText.textContent =
            `Your answer: ${question.choices[answer.selectedAnswer]}`;

        const correctText = document.createElement("p");
        correctText.textContent =
            `Correct answer: ${question.choices[answer.correctAnswer]}`;

        const explanation = document.createElement("p");
        explanation.textContent = `Why: ${question.explanation}`;

        item.append(questionText, selectedText, correctText, explanation);
        container.appendChild(item);
    });
}


// ============================================================
// REVIEW
// ============================================================

function showReview() {

    const topics =
        document.getElementById("reviewTopics");

    const content =
        document.getElementById("reviewContent");

    content.classList.add("hidden");

    content.innerHTML = "";

    topics.classList.remove("hidden");

    showScreen("reviewScreen");
}


// ============================================================
// SHOW REVIEW TOPIC
// ============================================================

function showReviewTopic(topic) {

    const data = reviewData[topic];

    if (!data) {
        return;
    }

    const topics =
        document.getElementById("reviewTopics");

    const content =
        document.getElementById("reviewContent");

    topics.classList.add("hidden");

    content.classList.remove("hidden");

    content.innerHTML =
        data.content;
}


// ============================================================
// PROGRESS
// ============================================================

function showProgress() {

    const content =
        document.getElementById("progressContent");

    const results =
        JSON.parse(
            localStorage.getItem("qpiResults") || "[]"
        );

    if (results.length === 0) {

        content.innerHTML =
            `<p>No quiz results yet. Take a quiz to see your progress.</p>`;

    } else {

        content.innerHTML = "";

        results
            .slice()
            .reverse()
            .forEach(result => {

                const item =
                    document.createElement("div");

                item.className = "progressItem";

                item.innerHTML = `
                    <h3>${getQuizName(result.quizType)}</h3>

                    <p>
                        <strong>Score:</strong>
                        ${result.score} / ${result.total}
                    </p>

                    <p>
                        <strong>Percentage:</strong>
                        ${result.percentage}%
                    </p>

                    <small>
                        ${result.date}
                    </small>
                `;

                content.appendChild(item);

            });
    }

    showScreen("progressScreen");
}


// ============================================================
// CLEAR RESULTS
// ============================================================

function clearResults() {

    const confirmClear =
        confirm(
            "Are you sure you want to clear all quiz results?"
        );

    if (!confirmClear) {
        return;
    }

    localStorage.removeItem("qpiResults");

    showProgress();
}


// ============================================================
// BACK TO MENU
// ============================================================

function backToMenu() {

    if (wordSearchTimerId !== null) {
        clearInterval(wordSearchTimerId);
        wordSearchTimerId = null;
    }

    document.getElementById("welcomeMessage").textContent =
        `Welcome, ${studentName}! Section ${studentSection}.`;

    hideLearningLevels();
    showScreen("menuScreen");
}


// ============================================================
// LOAD SAVED STUDENT
// ============================================================

function loadStudent() {

    const savedName =
        localStorage.getItem("qpiStudentName");

    const savedSection =
        localStorage.getItem("qpiStudentSection");

    if (savedName && savedSection) {

        studentName = savedName;

        studentSection = savedSection;

        document.getElementById("studentName").value =
            savedName;

        document.getElementById("studentSection").value =
            savedSection;
    }
}


// ============================================================
// BUTTON FIX
// ============================================================

/*
    The HTML button calls nextQuestion().
    nextQuestion() first checks the answer.
    After checking, clicking it again moves to the next question.
*/

document.getElementById("nextButton").onclick =
    nextQuestion;


// ============================================================
// INITIALIZE APP
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    loadStudent();
    hideLearningLevels();

});
