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
    createRandomVariableQuestion("What is a discrete probability distribution?", ["A list of random-variable values and their probabilities", "Only a list of outcomes", "A graph of measured data", "A probability greater than 1"], "A discrete probability distribution pairs each value of X with P(X)."),
    createRandomVariableQuestion("In two coin tosses, what are the possible values of X if X counts heads?", ["{0, 1, 2}", "{HH, HT, TH, TT}", "{1, 2}", "{0, 1, 2, 3}"], "Two tosses can produce zero, one, or two heads."),
    createRandomVariableQuestion("For two coin tosses, what is P(X = 0)?", ["1/4", "1/2", "3/4", "1"], "Only TT gives zero heads, so P(0) = 1/4."),
    createRandomVariableQuestion("For two coin tosses, what is P(X = 1)?", ["1/2", "1/4", "3/4", "1"], "HT and TH give one head, so P(1) = 2/4 = 1/2."),
    createRandomVariableQuestion("When rolling a die, what are the possible values of X?", ["{1, 2, 3, 4, 5, 6}", "{0, 1}", "{2, 4, 6}", "{1, 2, 3}"], "A standard die has faces 1 through 6."),
    createRandomVariableQuestion("What is P(X = 4) for one fair die roll?", ["1/6", "1/5", "4/6", "1/4"], "One face out of six equally likely faces gives probability 1/6."),
    createRandomVariableQuestion("What is P(X = 2) for one fair die roll?", ["1/6", "1/2", "2/6", "1"], "Each die face has probability 1/6."),
    createRandomVariableQuestion("Which property must every probability satisfy?", ["0 <= P(X) <= 1", "P(X) > 1", "P(X) < 0", "P(X) = 2"], "A probability cannot be negative or greater than 1."),
    createRandomVariableQuestion("What is the sum of all probabilities in a valid distribution?", ["1", "0", "10", "It depends on X"], "The probabilities of all possible outcomes sum to 1."),
    createRandomVariableQuestion("Which list is a valid probability distribution?", ["P(0)=1/4, P(1)=1/2, P(2)=1/4", "P(0)=-0.3, P(1)=0.6", "P(1)=1.2, P(2)=0", "P(1)=0.2, P(2)=0.2"], "Each probability is from 0 to 1 and the sum is 1."),
    createRandomVariableQuestion("Why is P(X) = -0.3 invalid?", ["A probability cannot be negative", "The variable is continuous", "It must equal 1", "It is too small to count"], "Probabilities must be between zero and one."),
    createRandomVariableQuestion("For three coin tosses, what values can Y represent?", ["{0, 1, 2, 3}", "{H, T}", "{1, 2, 3, 4}", "{0, 1, 2}"], "There can be zero through three tails."),
    createRandomVariableQuestion("For three coin tosses, what is P(Y = 0)?", ["1/8", "3/8", "1/4", "1/2"], "Only HHH gives zero tails."),
    createRandomVariableQuestion("For three coin tosses, what is P(Y = 1)?", ["3/8", "1/8", "1/2", "2/8"], "Outcomes HHT, HTH, and THH give one tail."),
    createRandomVariableQuestion("For three coin tosses, what is P(Y = 3)?", ["1/8", "3/8", "1/2", "1"], "Only TTT gives three tails."),
    createRandomVariableQuestion("What does P(X <= 2) mean?", ["Sum P(0), P(1), and P(2)", "Subtract P(2)", "Use only P(2)", "Multiply P(0), P(1), and P(2)"], "The symbol <= means add the probabilities for all values no greater than 2."),
    createRandomVariableQuestion("What does P(X >= 7) require?", ["Adding probabilities for X = 7, 8, 9, and 10", "Using only P(7)", "Subtracting P(7)", "Adding P(0) to P(7)"], "Values at least 7 include 7, 8, 9, and 10."),
    createRandomVariableQuestion("Using 0.100 + 0.150 + 0.250, what is P(X <= 2)?", ["0.500", "0.250", "0.150", "0.100"], "Add the three probabilities: 0.100 + 0.150 + 0.250 = 0.500."),
    createRandomVariableQuestion("Using probabilities 0.050, 0.040, 0.025, and 0.015, what is P(X >= 7)?", ["0.130", "0.050", "0.115", "1.000"], "Add 0.050 + 0.040 + 0.025 + 0.015 = 0.130."),
    createRandomVariableQuestion("Which is needed to draw a probability histogram?", ["Values of X and corresponding probabilities", "Only the sample space", "Only the largest probability", "Only a die outcome"], "A histogram plots each X value against P(X)."),
    createRandomVariableQuestion("What must a probability histogram have?", ["One probability bar for each X value", "A negative bar", "Only one bar", "Bars totaling -1"], "Each possible value of X has a bar representing its probability."),
    createRandomVariableQuestion("A distribution has probabilities 0.2, 0.3, 0.5. Is it valid?", ["Yes", "No, one probability is negative", "No, the sum is 2", "No, probabilities cannot be decimals"], "All probabilities are between 0 and 1, and they sum to 1."),
    createRandomVariableQuestion("A distribution has probabilities 0.4, 0.4, 0.4. Is it valid?", ["No, the sum is 1.2", "Yes", "No, probabilities cannot repeat", "Yes, the values are decimals"], "The sum of probabilities exceeds 1."),
    createRandomVariableQuestion("A distribution has probabilities -0.1 and 1.1. Is it valid?", ["No, because both violate the 0-to-1 rule", "Yes", "No, but only 1.1 is invalid", "Yes, the sum is 1"], "Both -0.1 and 1.1 fall outside the permitted interval."),
    createRandomVariableQuestion("For Y counts tails in three coin tosses, which outcome gives Y = 2?", ["HTT", "HHH", "HHT", "TTT"], "HTT has exactly two tails."),
    createRandomVariableQuestion("For Y counts tails in three coin tosses, which value has probability 3/8?", ["Y = 1 or Y = 2", "Y = 0", "Y = 3", "Y = 4"], "The probabilities for one and two tails are both 3/8."),
    createRandomVariableQuestion("Which table structure represents a discrete probability distribution?", ["X values paired with P(X)", "Only X values", "Only P(X) values", "Two random sample spaces"], "A table has columns or rows for X and P(X)."),
    createRandomVariableQuestion("If P(0)=0.25 and P(1)=0.75, what is P(0 or 1)?", ["1", "0.25", "0.75", "0.50"], "The two mutually exclusive outcomes cover all possibilities, so the sum is 1."),
    createRandomVariableQuestion("If P(X <= 2)=0.500, what fraction is that?", ["1/2", "1/4", "3/4", "1"], "0.500 equals one-half."),
    createRandomVariableQuestion("If P(X >= 7)=0.130, what fraction is that approximately?", ["13/100", "7/10", "1/3", "1/2"], "0.130 is 130/1000, or 13/100.")
];

const levelTitles = [
    "Discrete Probability Distribution", "Two-Coin Example", "Rolling a Die",
    "Distribution Properties", "Validating Distributions", "Three-Coin Example",
    "Histogram", "Cumulative Probabilities", "Applying Rules", "Review"
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
    definition: {
        title: "Discrete Probability Distribution",
        content: `
            <h3>Discrete Probability Distribution</h3>
            <p>A discrete probability distribution consists of the values a random variable can assume and their corresponding probabilities.</p>
            <div class="formula">Value of X → P(X)</div>
        `
    },
    twoCoins: {
        title: "Two-Coin Example",
        content: `
            <h3>Two Coins: Number of Heads</h3>
            <div class="example">HH → 2 heads; HT → 1; TH → 1; TT → 0.</div>
            <p>X = {0, 1, 2}, with probabilities P(0)=1/4, P(1)=1/2, and P(2)=1/4.</p>
        `
    },
    die: {
        title: "Rolling a Die",
        content: `
            <h3>Rolling a Fair Die</h3>
            <p>X can equal 1, 2, 3, 4, 5, or 6.</p>
            <div class="formula">P(1)=P(2)=P(3)=P(4)=P(5)=P(6)=1/6</div>
        `
    },
    properties: {
        title: "Properties",
        content: `
            <h3>Properties of a Discrete Probability Distribution</h3>
            <ul>
                <li>Every probability satisfies 0 <= P(X) <= 1.</li>
                <li>The sum of all probabilities is 1.</li>
            </ul>
        `
    },
    validity: {
        title: "Validating a Distribution",
        content: `
            <h3>Is the Distribution Valid?</h3>
            <p>Reject a distribution if a probability is negative or greater than 1, or if the total is not 1.</p>
            <div class="example"><strong>Invalid:</strong> P(X)= -0.3<br><strong>Invalid:</strong> probabilities 0.4, 0.4, 0.4 because they sum to 1.2.</div>
        `
    },
    threeCoins: {
        title: "Three-Coin Example",
        content: `
            <h3>Three Coins: Number of Tails</h3>
            <p>Y = {0, 1, 2, 3}.</p>
            <div class="formula">P(0)=1/8, P(1)=3/8, P(2)=3/8, P(3)=1/8</div>
        `
    },
    cumulative: {
        title: "Cumulative Probabilities",
        content: `
            <h3>Add Probabilities in the Given Range</h3>
            <p>P(X <= 2) = P(0) + P(1) + P(2).</p>
            <p>P(X >= 7) = P(7) + P(8) + P(9) + P(10).</p>
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

const dayOneReviewerTitle = "Discrete Probability Distribution";
const dayOneReviewer = `# DAY 1 REVIEWER
${dayOneReviewerTitle}

1. Definition
A discrete probability distribution consists of the values that a random variable can assume and their corresponding probabilities.

2. Two-Coin Example
If X is the number of heads in two tosses, X = 0, 1, or 2.
P(0) = 1/4, P(1) = 1/2, P(2) = 1/4.

3. Rolling a Die
If X is the face shown, X = 1, 2, 3, 4, 5, or 6.
Each probability is 1/6.`;

const dayTwoReviewerTitle = "Properties and Examples";
const dayTwoReviewer = `# DAY 2 REVIEWER
${dayTwoReviewerTitle}

1. Properties
Every probability must satisfy 0 <= P(X) <= 1.
The sum of all probabilities must equal 1.

2. Three-Coin Example
If Y is the number of tails, Y = 0, 1, 2, or 3.
P(0) = 1/8, P(1) = 3/8, P(2) = 3/8, P(3) = 1/8.

3. Cumulative Probability
For P(X <= 2), add P(0), P(1), and P(2).
For P(X >= 7), add the probabilities for X = 7, 8, 9, and 10.`;

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
    "DISTRIBUTION", "PROBABILITY", "RANDOM", "VARIABLE", "DISCRETE",
    "HISTOGRAM", "PERCENT", "OUTCOME", "PROPERTIES", "CUMULATIVE"
];
let wordSearchTimerId = null;
let currentStoringFlashcard = 0;
let storingFlashcardRatings = [];

const storingFlashcards = [
    { front: "What is a discrete probability distribution?", back: "A list of values a random variable can assume and their corresponding probabilities." },
    { front: "What are the two-coins probabilities?", back: "P(0)=1/4, P(1)=1/2, P(2)=1/4." },
    { front: "What is P(X = 4) for a fair die?", back: "1/6." },
    { front: "What is the first property of a discrete probability distribution?", back: "Each probability must satisfy 0 <= P(X) <= 1." },
    { front: "What is the second property?", back: "The sum of all probabilities must equal 1." },
    { front: "What are the three-coins probabilities?", back: "P(0)=1/8, P(1)=3/8, P(2)=3/8, P(3)=1/8." },
    { front: "What does P(X <= 2) mean?", back: "Add P(0), P(1), and P(2)." },
    { front: "What does P(X >= 7) mean?", back: "Add probabilities for X = 7, 8, 9, and 10." },
    { front: "What does a probability histogram show?", back: "A bar for each value of X at height P(X)." },
    { front: "How can a distribution be recognized as invalid?", back: "It has a negative or greater-than-one probability, or its probabilities do not sum to 1." }
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
    { question: "What is a discrete probability distribution?", choices: ["Values of X and their probabilities", "Only outcomes", "Only a histogram", "Only a random variable"], answer: 0 },
    { question: "What must each probability satisfy?", choices: ["0 <= P(X) <= 1", "P(X) > 1", "P(X) < 0", "P(X) = 2"], answer: 0 },
    { question: "What must all probabilities sum to?", choices: ["1", "0", "10", "100"], answer: 0 },
    { question: "For two coins, what is P(X = 1)?", choices: ["1/2", "1/4", "3/4", "1"], answer: 0 },
    { question: "For a fair die, what is P(X = 4)?", choices: ["1/6", "1/4", "1/5", "1"], answer: 0 },
    { question: "What does P(X >= 7) mean?", choices: ["Add P(7), P(8), P(9), and P(10)", "Use only P(7)", "Subtract P(7)", "Use P(0) to P(7)"], answer: 0 }
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
    heading.textContent = "Discrete Probability Distribution: Memory Tips";
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
    { question: "What is a discrete probability distribution?", choices: ["The values of X and their corresponding probabilities", "Only a sample space", "Only a graph", "A probability greater than 1"], answer: 0, explanation: "It pairs every possible value of X with P(X)." },
    { question: "For two coin tosses, what are the values of X when X counts heads?", choices: ["{0, 1, 2}", "{HH, HT, TH, TT}", "{1, 2, 3}", "{0, 1}"], answer: 0, explanation: "Two tosses can produce zero, one, or two heads." },
    { question: "For two coin tosses, what is P(X = 1)?", choices: ["1/2", "1/4", "3/4", "1"], answer: 0, explanation: "HT and TH are the two outcomes with one head." },
    { question: "For a fair die, what is P(X = 4)?", choices: ["1/6", "1/4", "1/5", "1"], answer: 0, explanation: "One of six equally likely faces is 4." },
    { question: "Which property must a probability satisfy?", choices: ["0 <= P(X) <= 1", "P(X) > 1", "P(X) < 0", "P(X) = 2"], answer: 0, explanation: "A probability cannot be negative or greater than 1." },
    { question: "What must the sum of all probabilities equal?", choices: ["1", "0", "10", "The number of values"], answer: 0, explanation: "The probabilities represent all possible outcomes." },
    { question: "Are probabilities 0.4, 0.4, and 0.4 a valid distribution?", choices: ["No, they sum to 1.2", "Yes", "No, they must be fractions", "Yes, they are equal"], answer: 0, explanation: "The sum must equal 1." },
    { question: "For three coin tosses, what is P(Y = 1) for the number of tails?", choices: ["3/8", "1/8", "1/2", "1"], answer: 0, explanation: "HHT, HTH, and THH give one tail." },
    { question: "How is P(X <= 2) found?", choices: ["P(0) + P(1) + P(2)", "P(2) only", "P(3) + P(4)", "P(0) multiplied by P(2)"], answer: 0, explanation: "Add all probabilities for values no greater than 2." },
    { question: "How is P(X >= 7) found?", choices: ["P(7) + P(8) + P(9) + P(10)", "P(7) only", "P(0) + P(7)", "P(6) + P(7)"], answer: 0, explanation: "Add probabilities for 7, 8, 9, and 10." }
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
