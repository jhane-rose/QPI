// ============================================================
// QPI
// QUIZ PERFORMANCE IMPROVEMENT
// Grade 11 Demeter - Effective Communication
// ============================================================


// ============================================================
// GLOBAL VARIABLES
// ============================================================

let studentName = "";
let currentQuiz = "";
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let answerSubmitted = false;
let currentQuestions = [];


// ============================================================
// QUESTION BANK
// 40 EFFECTIVE COMMUNICATION QUESTIONS
// ============================================================

const questionBank = [

    {
        question: "What is effective communication?",
        choices: [
            "Sharing information clearly and understanding others",
            "Speaking as loudly as possible",
            "Talking without listening",
            "Using complicated words"
        ],
        answer: 0,
        explanation:
            "Effective communication means sharing ideas, information, or feelings clearly while also understanding the other person."
    },

    {
        question: "Which is an important part of communication?",
        choices: [
            "Listening",
            "Ignoring",
            "Interrupting",
            "Guessing"
        ],
        answer: 0,
        explanation:
            "Listening is important because communication is not only about speaking. We also need to understand what other people are saying."
    },

    {
        question: "What is active listening?",
        choices: [
            "Giving full attention to the speaker",
            "Waiting only for your turn to talk",
            "Looking at your phone while listening",
            "Ignoring the speaker"
        ],
        answer: 0,
        explanation:
            "Active listening means paying close attention to the speaker, understanding the message, and responding appropriately."
    },

    {
        question: "Which is an example of verbal communication?",
        choices: [
            "Speaking",
            "Facial expression",
            "Eye contact",
            "Body posture"
        ],
        answer: 0,
        explanation:
            "Verbal communication uses words. Speaking is an example because information is communicated through spoken words."
    },

    {
        question: "Which is an example of nonverbal communication?",
        choices: [
            "Facial expression",
            "Writing an essay",
            "Giving a speech",
            "Sending a text message"
        ],
        answer: 0,
        explanation:
            "Nonverbal communication sends messages without relying on words. Facial expressions can communicate emotions and attitudes."
    },

    {
        question: "Why is eye contact important during communication?",
        choices: [
            "It can show attention and interest",
            "It guarantees agreement",
            "It replaces listening",
            "It prevents misunderstanding completely"
        ],
        answer: 0,
        explanation:
            "Appropriate eye contact can show that you are paying attention and interested in the conversation."
    },

    {
        question: "What should you do when someone is speaking?",
        choices: [
            "Listen carefully",
            "Interrupt frequently",
            "Ignore them",
            "Change the topic"
        ],
        answer: 0,
        explanation:
            "Listening carefully allows you to understand the speaker's ideas and reduces the chance of misunderstanding."
    },

    {
        question: "What is feedback in communication?",
        choices: [
            "A response to a message",
            "A type of body language",
            "A communication barrier",
            "A way to avoid conversation"
        ],
        answer: 0,
        explanation:
            "Feedback is the response given by the receiver to show how they understood or reacted to a message."
    },

    {
        question: "Which behavior can improve communication?",
        choices: [
            "Speaking clearly",
            "Interrupting others",
            "Using insults",
            "Ignoring questions"
        ],
        answer: 0,
        explanation:
            "Speaking clearly helps the listener understand your message and reduces confusion."
    },

    {
        question: "What is a communication barrier?",
        choices: [
            "Something that prevents clear understanding",
            "A method of active listening",
            "A type of feedback",
            "A form of cooperation"
        ],
        answer: 0,
        explanation:
            "A communication barrier is anything that makes it difficult for a message to be understood correctly."
    },

    {
        question: "Which can be a communication barrier?",
        choices: [
            "Noise",
            "Clear speech",
            "Active listening",
            "Helpful feedback"
        ],
        answer: 0,
        explanation:
            "Noise can interfere with a message and make it difficult for the receiver to hear or understand the speaker."
    },

    {
        question: "Why should a speaker use clear language?",
        choices: [
            "To make the message easier to understand",
            "To confuse the listener",
            "To make the conversation longer",
            "To avoid feedback"
        ],
        answer: 0,
        explanation:
            "Clear language makes information easier to understand and helps prevent unnecessary confusion."
    },

    {
        question: "What should you do if you do not understand a message?",
        choices: [
            "Ask for clarification",
            "Pretend you understand",
            "Ignore the speaker",
            "Change the subject"
        ],
        answer: 0,
        explanation:
            "Asking for clarification helps you understand the message correctly instead of making assumptions."
    },

    {
        question: "What does empathy mean in communication?",
        choices: [
            "Trying to understand another person's feelings and perspective",
            "Forcing others to agree with you",
            "Ignoring other people's feelings",
            "Speaking without listening"
        ],
        answer: 0,
        explanation:
            "Empathy involves trying to understand another person's feelings, experiences, and point of view."
    },

    {
        question: "Which tone is generally appropriate for a respectful conversation?",
        choices: [
            "Calm and respectful",
            "Angry and insulting",
            "Threatening",
            "Mocking"
        ],
        answer: 0,
        explanation:
            "A calm and respectful tone helps create a productive conversation and shows consideration for the other person."
    },

    {
        question: "Why is listening important?",
        choices: [
            "It helps us understand the speaker's message",
            "It makes conversations shorter every time",
            "It prevents all disagreements",
            "It allows us to avoid responding"
        ],
        answer: 0,
        explanation:
            "Good listening helps us understand information, instructions, ideas, and feelings communicated by others."
    },

    {
        question: "What is the purpose of asking questions?",
        choices: [
            "To clarify or obtain information",
            "To confuse the speaker",
            "To interrupt constantly",
            "To end every conversation"
        ],
        answer: 0,
        explanation:
            "Questions help us obtain information and clarify things that we do not fully understand."
    },

    {
        question: "Which is an example of respectful communication?",
        choices: [
            "Allowing others to express their opinions",
            "Insulting people who disagree",
            "Interrupting every speaker",
            "Refusing to listen"
        ],
        answer: 0,
        explanation:
            "Respectful communication gives people an opportunity to express their ideas while maintaining appropriate language and behavior."
    },

    {
        question: "What can body language communicate?",
        choices: [
            "Feelings and attitudes",
            "Only written information",
            "Only numerical information",
            "Nothing"
        ],
        answer: 0,
        explanation:
            "Body language can communicate emotions, attitudes, attention, and reactions without using spoken words."
    },

    {
        question: "Which facial expression can commonly show happiness?",
        choices: [
            "Smiling",
            "Frowning",
            "Scowling",
            "Rolling the eyes"
        ],
        answer: 0,
        explanation:
            "A smile commonly communicates happiness or friendliness, although facial expressions should always be understood in context."
    },

    {
        question: "What is one way to avoid misunderstanding?",
        choices: [
            "Clarify the message",
            "Assume everything",
            "Avoid questions",
            "Ignore feedback"
        ],
        answer: 0,
        explanation:
            "Clarifying a message allows both people to check that they understand the information in the same way."
    },

    {
        question: "Why should communication consider the audience?",
        choices: [
            "Different audiences may have different needs and levels of understanding",
            "Everyone understands information in exactly the same way",
            "The audience does not matter",
            "It makes communication unnecessary"
        ],
        answer: 0,
        explanation:
            "A speaker should consider the audience's knowledge, needs, and situation so the message can be communicated appropriately."
    },

    {
        question: "Which is an example of written communication?",
        choices: [
            "Email",
            "Facial expression",
            "Hand gesture",
            "Eye contact"
        ],
        answer: 0,
        explanation:
            "Written communication uses written words to share information. Emails, letters, and written messages are examples."
    },

    {
        question: "Which is an example of visual communication?",
        choices: [
            "A diagram",
            "A spoken conversation",
            "A phone call",
            "A verbal greeting"
        ],
        answer: 0,
        explanation:
            "Visual communication uses images, symbols, diagrams, charts, or other visual elements to communicate information."
    },

    {
        question: "What should you do when giving constructive feedback?",
        choices: [
            "Focus on the behavior and suggest improvement",
            "Insult the person",
            "Avoid explaining your point",
            "Use offensive language"
        ],
        answer: 0,
        explanation:
            "Constructive feedback focuses on the specific behavior or work and provides useful suggestions for improvement."
    },

    {
        question: "What does clarity mean in communication?",
        choices: [
            "Making the message easy to understand",
            "Making the message confusing",
            "Using unnecessary words",
            "Avoiding the main idea"
        ],
        answer: 0,
        explanation:
            "Clarity means expressing an idea in a way that is understandable and avoids unnecessary confusion."
    },

    {
        question: "Which is a good way to show that you are listening?",
        choices: [
            "Nodding and responding appropriately",
            "Looking away constantly",
            "Interrupting",
            "Using your phone"
        ],
        answer: 0,
        explanation:
            "Appropriate responses, eye contact, and other listening behaviors can show that you are paying attention."
    },

    {
        question: "What can happen when people do not listen carefully?",
        choices: [
            "Misunderstandings may occur",
            "Communication becomes perfect",
            "Everyone automatically agrees",
            "Messages become clearer"
        ],
        answer: 0,
        explanation:
            "Poor listening can cause people to miss important information or misunderstand what another person meant."
    },

    {
        question: "Which is important when communicating online?",
        choices: [
            "Using respectful and clear language",
            "Typing insults",
            "Using confusing messages",
            "Ignoring the receiver"
        ],
        answer: 0,
        explanation:
            "Online communication should still be clear, respectful, and appropriate because written messages can easily be misunderstood."
    },

    {
        question: "What is the main purpose of communication?",
        choices: [
            "To exchange ideas, information, and feelings",
            "To confuse people",
            "To avoid listening",
            "To prevent interaction"
        ],
        answer: 0,
        explanation:
            "Communication allows people to exchange information, ideas, thoughts, feelings, and instructions."
    },

    {
        question: "Which action demonstrates good communication in a group?",
        choices: [
            "Listening to different ideas",
            "Dominating the discussion",
            "Ignoring everyone",
            "Interrupting constantly"
        ],
        answer: 0,
        explanation:
            "Good group communication involves listening to others, sharing ideas appropriately, and allowing different people to participate."
    },

    {
        question: "Why is respect important in communication?",
        choices: [
            "It helps create positive and productive interactions",
            "It prevents people from speaking",
            "It guarantees that everyone agrees",
            "It eliminates the need for listening"
        ],
        answer: 0,
        explanation:
            "Respect helps people communicate their ideas safely and productively, even when they have different opinions."
    },

    {
        question: "What should you consider before speaking?",
        choices: [
            "Your words, tone, and audience",
            "Only how loudly you can speak",
            "Whether you can interrupt",
            "How quickly you can finish"
        ],
        answer: 0,
        explanation:
            "Thinking about your words, tone, and audience helps you communicate your message appropriately."
    },

    {
        question: "Which behavior can make communication less effective?",
        choices: [
            "Interrupting the speaker",
            "Listening carefully",
            "Asking questions",
            "Speaking clearly"
        ],
        answer: 0,
        explanation:
            "Interrupting can prevent the speaker from completing their message and may cause important information to be missed."
    },

    {
        question: "What is paraphrasing?",
        choices: [
            "Restating a message using your own words",
            "Ignoring what someone said",
            "Changing the subject",
            "Repeating unrelated information"
        ],
        answer: 0,
        explanation:
            "Paraphrasing means expressing another person's message again using your own words."
    },

    {
        question: "Why can paraphrasing be useful?",
        choices: [
            "It can help confirm understanding",
            "It prevents communication",
            "It makes messages meaningless",
            "It avoids listening"
        ],
        answer: 0,
        explanation:
            "Paraphrasing can help confirm that you understood the speaker's message correctly."
    },

    {
        question: "What is an appropriate response when someone has a different opinion?",
        choices: [
            "Listen and respond respectfully",
            "Immediately insult them",
            "Refuse to listen",
            "Interrupt them"
        ],
        answer: 0,
        explanation:
            "People can have different opinions. Listening and responding respectfully allows communication to continue productively."
    },

    {
        question: "Which skill helps prevent conflicts?",
        choices: [
            "Calm and respectful communication",
            "Shouting",
            "Insulting others",
            "Ignoring problems"
        ],
        answer: 0,
        explanation:
            "Calm and respectful communication can help people explain concerns, understand each other, and work toward solutions."
    },

    {
        question: "What does effective communication require?",
        choices: [
            "Clear expression and attentive listening",
            "Only speaking",
            "Only writing",
            "Avoiding feedback"
        ],
        answer: 0,
        explanation:
            "Effective communication involves both expressing messages clearly and listening carefully to others."
    },

    {
        question: "Which is a sign of effective listening?",
        choices: [
            "Understanding and responding to the speaker's message",
            "Interrupting before the speaker finishes",
            "Ignoring important details",
            "Changing the topic"
        ],
        answer: 0,
        explanation:
            "Effective listening involves paying attention, understanding the message, and responding appropriately."
    }

];


// ============================================================
// GET RANDOM QUESTIONS
// ============================================================

function getRandomQuestions(numberOfQuestions) {

    const shuffled = [...questionBank];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const randomIndex =
            Math.floor(Math.random() * (i + 1));

        [
            shuffled[i],
            shuffled[randomIndex]
        ] = [
            shuffled[randomIndex],
            shuffled[i]
        ];
    }

    return shuffled.slice(0, numberOfQuestions);
}


// ============================================================
// SHUFFLE ANSWER CHOICES
// ============================================================

function shuffleChoices(question) {

    const choices = question.choices.map(
        function(choice, index) {

            return {
                text: choice,
                correct: index === question.answer
            };

        }
    );


    for (let i = choices.length - 1; i > 0; i--) {

        const randomIndex =
            Math.floor(Math.random() * (i + 1));

        [
            choices[i],
            choices[randomIndex]
        ] = [
            choices[randomIndex],
            choices[i]
        ];
    }


    question.choices =
        choices.map(function(item) {
            return item.text;
        });


    question.answer =
        choices.findIndex(function(item) {
            return item.correct;
        });


    return question;
}


// ============================================================
// ENTER QPI
// ============================================================

function enterQPI() {

    const input =
        document.getElementById("studentName");


    if (!input) {

        alert("Student name field was not found.");

        return;
    }


    studentName =
        input.value.trim();


    if (studentName === "") {

        alert("Please enter your name.");

        input.focus();

        return;
    }


    document
        .getElementById("homeScreen")
        .classList.add("hidden");


    document
        .getElementById("menuScreen")
        .classList.remove("hidden");


    document
        .getElementById("welcomeMessage")
        .textContent =
        "Welcome, " + studentName + "!";
}


// ============================================================
// START QUIZ
// ============================================================

function startQuiz(type) {

    currentQuiz = type;

    currentQuestion = 0;

    score = 0;

    selectedAnswer = null;

    answerSubmitted = false;


    // Select exactly 10 random questions

    currentQuestions =
        getRandomQuestions(10);


    // Make copies and shuffle choices

    currentQuestions =
        currentQuestions.map(
            function(question) {

                const copy = {

                    question:
                        question.question,

                    choices:
                        [...question.choices],

                    answer:
                        question.answer,

                    explanation:
                        question.explanation

                };


                return shuffleChoices(copy);

            }
        );


    document
        .getElementById("menuScreen")
        .classList.add("hidden");


    document
        .getElementById("quizScreen")
        .classList.remove("hidden");


    showQuestion();
}


// ============================================================
// SHOW QUESTION
// ============================================================

function showQuestion() {

    const question =
        currentQuestions[currentQuestion];


    if (!question) {

        finishQuiz();

        return;
    }


    selectedAnswer = null;

    answerSubmitted = false;


    // Quiz type

    document
        .getElementById("quizType")
        .textContent =
        getQuizName(currentQuiz);


    // Question number

    document
        .getElementById("questionNumber")
        .textContent =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        currentQuestions.length;


    // Question text

    document
        .getElementById("questionText")
        .textContent =
        question.question;


    // Progress bar

    const progress =
        ((currentQuestion + 1) /
        currentQuestions.length) * 100;


    document
        .getElementById("progressFill")
        .style.width =
        progress + "%";


    // Choices container

    const choicesContainer =
        document.getElementById("choices");


    choicesContainer.innerHTML = "";


    // Create answer buttons

    question.choices.forEach(
        function(choice, index) {

            const button =
                document.createElement("button");


            button.className = "choice";

            button.type = "button";

            button.textContent = choice;


            button.onclick =
                function() {

                    selectAnswer(
                        index,
                        button
                    );

                };


            choicesContainer.appendChild(
                button
            );

        }
    );


    // Hide feedback

    hideFeedback();


    // Reset next button

    const nextButton =
        document.getElementById("nextButton");


    nextButton.disabled = true;

    nextButton.textContent =
        "Check Answer";
}


// ============================================================
// QUIZ NAME
// ============================================================

function getQuizName(type) {

    if (type === "pretest") {

        return "📝 Pre-Test";

    }


    if (type === "practice") {

        return "📚 Learning Quiz";

    }


    if (type === "posttest") {

        return "📊 Post-Test";

    }


    return "Quiz";
}


// ============================================================
// SELECT ANSWER
// ============================================================

function selectAnswer(index, button) {

    if (answerSubmitted) {

        return;
    }


    selectedAnswer = index;


    const buttons =
        document.querySelectorAll(
            "#choices .choice"
        );


    buttons.forEach(
        function(btn) {

            btn.classList.remove("selected");

        }
    );


    button.classList.add("selected");


    document
        .getElementById("nextButton")
        .disabled = false;
}


// ============================================================
// NEXT QUESTION / CHECK ANSWER
// ============================================================

function nextQuestion() {

    // No answer selected

    if (selectedAnswer === null) {

        alert("Please select an answer.");

        return;
    }


    // First click = check answer

    if (!answerSubmitted) {

        submitAnswer();

        return;
    }


    // Second click = next question

    currentQuestion++;


    if (
        currentQuestion <
        currentQuestions.length
    ) {

        showQuestion();

    } else {

        finishQuiz();

    }
}


// ============================================================
// CHECK ANSWER
// ============================================================

function submitAnswer() {

    answerSubmitted = true;


    const question =
        currentQuestions[currentQuestion];


    const correctAnswer =
        question.answer;


    const buttons =
        document.querySelectorAll(
            "#choices .choice"
        );


    // Disable all choices

    buttons.forEach(
        function(button, index) {

            button.disabled = true;


            // Correct answer

            if (index === correctAnswer) {

                button.classList.add("correct");

            }


            // Wrong selected answer

            if (
                index === selectedAnswer &&
                index !== correctAnswer
            ) {

                button.classList.add("incorrect");

            }

        }
    );


    // Correct

    if (selectedAnswer === correctAnswer) {

        score++;

        showFeedback(
            true,
            question
        );

    }


    // Wrong

    else {

        showFeedback(
            false,
            question
        );

    }


    // Change button

    const nextButton =
        document.getElementById("nextButton");


    nextButton.disabled = false;


    if (
        currentQuestion ===
        currentQuestions.length - 1
    ) {

        nextButton.textContent =
            "Finish Quiz";

    } else {

        nextButton.textContent =
            "Next Question";

    }


    // Scroll feedback into view

    const feedback =
        document.getElementById("feedback");


    if (feedback) {

        setTimeout(
            function() {

                feedback.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            },
            100
        );

    }
}


// ============================================================
// SHOW FEEDBACK
// ============================================================

function showFeedback(isCorrect, question) {

    const feedback =
        document.getElementById("feedback");


    const feedbackTitle =
        document.getElementById("feedbackTitle");


    const correctAnswer =
        document.getElementById("correctAnswer");


    const explanation =
        document.getElementById("explanation");


    if (!feedback) {

        return;
    }


    feedback.classList.remove("hidden");


    if (isCorrect) {

        feedback.className =
            "feedback correct";


        feedbackTitle.textContent =
            "✅ CORRECT!";


        correctAnswer.textContent =
            "Great job! You selected the correct answer.";

    }

    else {

        feedback.className =
            "feedback incorrect";


        feedbackTitle.textContent =
            "❌ WRONG!";


        correctAnswer.innerHTML =
            "<strong>Correct Answer:</strong> " +
            escapeHTML(
                question.choices[question.answer]
            );

    }


    explanation.innerHTML =
        "<strong>💡 LEARN:</strong> " +
        escapeHTML(
            question.explanation
        );
}


// ============================================================
// HIDE FEEDBACK
// ============================================================

function hideFeedback() {

    const feedback =
        document.getElementById("feedback");


    if (!feedback) {

        return;
    }


    feedback.className =
        "feedback hidden";


    const feedbackTitle =
        document.getElementById("feedbackTitle");


    const correctAnswer =
        document.getElementById("correctAnswer");


    const explanation =
        document.getElementById("explanation");


    feedbackTitle.textContent = "";

    correctAnswer.textContent = "";

    explanation.textContent = "";
}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent = text;


    return div.innerHTML;
}


// ============================================================
// FINISH QUIZ
// ============================================================

function finishQuiz() {

    const total =
        currentQuestions.length;


    const percentage =
        Math.round(
            (score / total) * 100
        );


    // Save result

    saveResult(
        currentQuiz,
        score,
        total,
        percentage
    );


    // Hide quiz

    document
        .getElementById("quizScreen")
        .classList.add("hidden");


    // Show result

    document
        .getElementById("resultScreen")
        .classList.remove("hidden");


    // Result message

    document
        .getElementById("resultMessage")
        .textContent =
        studentName +
        ", you completed the " +
        getQuizName(currentQuiz) +
        ".";


    // Score

    document
        .getElementById("finalScore")
        .textContent =
        score + " / " + total;


    // Percentage

    document
        .getElementById("percentage")
        .textContent =
        percentage + "%";


    // Performance

    showPerformanceMessage(
        percentage
    );
}


// ============================================================
// PERFORMANCE MESSAGE
// ============================================================

function showPerformanceMessage(percentage) {

    const element =
        document.getElementById(
            "performanceMessage"
        );


    if (!element) {

        return;
    }


    if (percentage >= 90) {

        element.innerHTML =
            "🌟 Excellent performance! " +
            "Continue reviewing the material.";

    }

    else if (percentage >= 75) {

        element.innerHTML =
            "👍 Good performance! " +
            "Continue practicing and reviewing.";

    }

    else if (percentage >= 50) {

        element.innerHTML =
            "📖 You may benefit from additional " +
            "practice and review.";

    }

    else {

        element.innerHTML =
            "💡 Review the learning material and " +
            "continue practicing.";

    }
}


// ============================================================
// SAVE RESULT
// OFFLINE LOCAL STORAGE
// ============================================================

function saveResult(
    type,
    score,
    total,
    percentage
) {

    const results =
        JSON.parse(
            localStorage.getItem("qpiResults")
        ) || [];


    results.push({

        student:
            studentName,

        type:
            type,

        score:
            score,

        total:
            total,

        percentage:
            percentage,

        date:
            new Date().toLocaleString()

    });


    localStorage.setItem(
        "qpiResults",
        JSON.stringify(results)
    );
}


// ============================================================
// SHOW PROGRESS
// ============================================================

function showProgress() {

    document
        .getElementById("menuScreen")
        .classList.add("hidden");


    document
        .getElementById("progressScreen")
        .classList.remove("hidden");


    const results =
        JSON.parse(
            localStorage.getItem("qpiResults")
        ) || [];


    const container =
        document.getElementById(
            "progressContent"
        );


    container.innerHTML = "";


    if (results.length === 0) {

        container.innerHTML =
            "<p>No quiz results yet.</p>";

        return;
    }


    // Show newest results first

    const reversedResults =
        [...results].reverse();


    reversedResults.forEach(
        function(result) {

            const item =
                document.createElement("div");


            item.className =
                "progressItem";


            item.innerHTML = `

                <h3>
                    ${escapeHTML(
                        getQuizName(result.type)
                    )}
                </h3>

                <p>
                    Student:
                    <strong>
                        ${escapeHTML(result.student)}
                    </strong>
                </p>

                <p>
                    Score:
                    <strong>
                        ${result.score}/${result.total}
                    </strong>
                </p>

                <p>
                    Percentage:
                    <strong>
                        ${result.percentage}%
                    </strong>
                </p>

                <small>
                    ${escapeHTML(result.date)}
                </small>

                <hr>

            `;


            container.appendChild(item);

        }
    );
}


// ============================================================
// BACK TO MENU
// ============================================================

function backToMenu() {

    document
        .getElementById("resultScreen")
        .classList.add("hidden");


    document
        .getElementById("progressScreen")
        .classList.add("hidden");


    document
        .getElementById("quizScreen")
        .classList.add("hidden");


    document
        .getElementById("menuScreen")
        .classList.remove("hidden");


    document
        .getElementById("welcomeMessage")
        .textContent =
        "Welcome, " + studentName + "!";
}


// ============================================================
// CLEAR RESULTS
// ============================================================

function clearResults() {

    const confirmation =
        confirm(
            "Are you sure you want to delete all saved QPI results?"
        );


    if (!confirmation) {

        return;
    }


    localStorage.removeItem(
        "qpiResults"
    );


    alert(
        "All QPI results have been deleted."
    );


    showProgress();
}
