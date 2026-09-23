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


// ============================================================
// GENERAL MATHEMATICS QUESTION BANK
// 100 QUESTIONS
// ============================================================

const questionBank = [

    // ========================================================
    // FUNCTIONS - 1 to 15
    // ========================================================

    {
        question: "Which of the following best describes a function?",
        choices: [
            "A relation where every input has exactly one output",
            "A relation where every input has two outputs",
            "A set containing only numbers",
            "A graph with no points"
        ],
        answer: 0,
        explanation:
            "A function is a relation in which every input is associated with exactly one output."
    },

    {
        question: "What is the domain of a function?",
        choices: [
            "The set of input values",
            "The set of output values",
            "The highest value only",
            "The lowest value only"
        ],
        answer: 0,
        explanation:
            "The domain is the set of all possible input values of a function."
    },

    {
        question: "What is the range of a function?",
        choices: [
            "The set of output values",
            "The set of input values",
            "The independent variable",
            "The equation only"
        ],
        answer: 0,
        explanation:
            "The range is the set of all possible output values of a function."
    },

    {
        question: "If f(x) = x + 5, what is f(3)?",
        choices: [
            "8",
            "2",
            "15",
            "5"
        ],
        answer: 0,
        explanation:
            "Substitute x = 3. Therefore, f(3) = 3 + 5 = 8."
    },

    {
        question: "If f(x) = 2x, what is f(6)?",
        choices: [
            "12",
            "8",
            "6",
            "3"
        ],
        answer: 0,
        explanation:
            "Substitute x = 6. f(6) = 2(6) = 12."
    },

    {
        question: "Which notation represents a function named f?",
        choices: [
            "f(x)",
            "fx only",
            "f+x",
            "x/f"
        ],
        answer: 0,
        explanation:
            "f(x) is the standard notation used to represent a function named f."
    },

    {
        question: "If f(x) = x², what is f(4)?",
        choices: [
            "16",
            "8",
            "6",
            "12"
        ],
        answer: 0,
        explanation:
            "f(4) = 4² = 16."
    },

    {
        question: "Which variable is usually the independent variable?",
        choices: [
            "x",
            "y",
            "f",
            "constant"
        ],
        answer: 0,
        explanation:
            "In many functions, x represents the independent variable or input."
    },

    {
        question: "Which variable is usually the dependent variable?",
        choices: [
            "y",
            "x",
            "constant",
            "domain"
        ],
        answer: 0,
        explanation:
            "The dependent variable is commonly represented by y because its value depends on x."
    },

    {
        question: "If f(x) = 3x - 2, what is f(5)?",
        choices: [
            "13",
            "15",
            "10",
            "8"
        ],
        answer: 0,
        explanation:
            "f(5) = 3(5) - 2 = 15 - 2 = 13."
    },

    {
        question: "Which relation is a function?",
        choices: [
            "{(1,2), (2,3), (3,4)}",
            "{(1,2), (1,3), (2,4)}",
            "{(2,1), (2,5), (3,6)}",
            "{(4,2), (4,3), (5,7)}"
        ],
        answer: 0,
        explanation:
            "A function cannot assign two different outputs to the same input. The first relation has a unique output for every input."
    },

    {
        question: "What does f(2) represent?",
        choices: [
            "The output of the function when the input is 2",
            "The input when the output is 2",
            "The domain of the function",
            "The range of the function"
        ],
        answer: 0,
        explanation:
            "f(2) means the value of the function when x, the input, is 2."
    },

    {
        question: "If f(x) = x² + 1, what is f(2)?",
        choices: [
            "5",
            "4",
            "3",
            "6"
        ],
        answer: 0,
        explanation:
            "f(2) = 2² + 1 = 4 + 1 = 5."
    },

    {
        question: "If f(x) = 4x - 1, what is f(0)?",
        choices: [
            "-1",
            "0",
            "1",
            "4"
        ],
        answer: 0,
        explanation:
            "f(0) = 4(0) - 1 = -1."
    },

    {
        question: "A vertical line test is used to determine whether a graph represents what?",
        choices: [
            "A function",
            "A sequence",
            "A logarithm only",
            "A polynomial degree"
        ],
        answer: 0,
        explanation:
            "If every vertical line intersects a graph at most once, the graph represents a function."
    },


    // ========================================================
    // OPERATIONS ON FUNCTIONS - 16 to 25
    // ========================================================

    {
        question: "If f(x) = x + 2 and g(x) = x + 3, what is (f + g)(x)?",
        choices: [
            "2x + 5",
            "x + 5",
            "2x + 6",
            "x + 1"
        ],
        answer: 0,
        explanation:
            "(f + g)(x) = f(x) + g(x) = (x + 2) + (x + 3) = 2x + 5."
    },

    {
        question: "If f(x) = x + 5 and g(x) = x - 2, what is (f - g)(x)?",
        choices: [
            "7",
            "2x + 3",
            "2x - 7",
            "x + 3"
        ],
        answer: 0,
        explanation:
            "(f - g)(x) = (x + 5) - (x - 2) = 7."
    },

    {
        question: "If f(x) = 2x and g(x) = x + 1, what is (fg)(x)?",
        choices: [
            "2x² + 2x",
            "3x + 1",
            "2x + 1",
            "2x² + 1"
        ],
        answer: 0,
        explanation:
            "Multiply the functions: (2x)(x + 1) = 2x² + 2x."
    },

    {
        question: "If f(x) = x + 1 and g(x) = 2x, what is (f ∘ g)(x)?",
        choices: [
            "2x + 1",
            "3x + 1",
            "2x + 2",
            "x + 2"
        ],
        answer: 0,
        explanation:
            "f(g(x)) = f(2x) = 2x + 1."
    },

    {
        question: "If f(x) = 2x + 1 and g(x) = x - 3, what is f(g(x))?",
        choices: [
            "2x - 5",
            "2x + 4",
            "x - 2",
            "2x - 3"
        ],
        answer: 0,
        explanation:
            "f(g(x)) = 2(x - 3) + 1 = 2x - 6 + 1 = 2x - 5."
    },

    {
        question: "What symbol is commonly used for function composition?",
        choices: [
            "∘",
            "+",
            "÷",
            "≤"
        ],
        answer: 0,
        explanation:
            "The circle symbol ∘ is commonly used to represent function composition."
    },

    {
        question: "If f(x) = 3x and g(x) = x + 2, what is (f + g)(x)?",
        choices: [
            "4x + 2",
            "3x + 2",
            "4x",
            "3x + 6"
        ],
        answer: 0,
        explanation:
            "(f + g)(x) = 3x + (x + 2) = 4x + 2."
    },

    {
        question: "If f(x) = 5x and g(x) = 2x, what is (f - g)(x)?",
        choices: [
            "3x",
            "7x",
            "10x",
            "x"
        ],
        answer: 0,
        explanation:
            "(f - g)(x) = 5x - 2x = 3x."
    },

    {
        question: "If f(x) = x + 4 and g(x) = 3x, what is (f × g)(x)?",
        choices: [
            "3x² + 12x",
            "4x + 3",
            "3x + 4",
            "x² + 12"
        ],
        answer: 0,
        explanation:
            "(x + 4)(3x) = 3x² + 12x."
    },

    {
        question: "If f(x) = x - 1 and g(x) = x + 2, what is (f + g)(3)?",
        choices: [
            "7",
            "6",
            "5",
            "4"
        ],
        answer: 0,
        explanation:
            "f(3) = 2 and g(3) = 5. Therefore, (f + g)(3) = 2 + 5 = 7."
    },


    // ========================================================
    // RATIONAL FUNCTIONS - 26 to 38
    // ========================================================

    {
        question: "What is a rational function?",
        choices: [
            "A function that can be written as a ratio of polynomials",
            "A function containing only integers",
            "A function with no variables",
            "A function that is always linear"
        ],
        answer: 0,
        explanation:
            "A rational function can be expressed as one polynomial divided by another polynomial."
    },

    {
        question: "What values are excluded from the domain of a rational function?",
        choices: [
            "Values that make the denominator zero",
            "Values that make the numerator zero",
            "All positive values",
            "All negative values"
        ],
        answer: 0,
        explanation:
            "Division by zero is undefined, so values that make the denominator zero are excluded."
    },

    {
        question: "What is the domain restriction of f(x) = 1/(x - 4)?",
        choices: [
            "x ≠ 4",
            "x ≠ 1",
            "x > 4",
            "x < 4"
        ],
        answer: 0,
        explanation:
            "The denominator x - 4 cannot equal zero. Therefore x ≠ 4."
    },

    {
        question: "What happens when the denominator of a rational expression equals zero?",
        choices: [
            "The expression is undefined",
            "The expression equals zero",
            "The expression becomes one",
            "The expression becomes negative"
        ],
        answer: 0,
        explanation:
            "Division by zero is undefined in mathematics."
    },

    {
        question: "What is an asymptote?",
        choices: [
            "A line that a graph approaches",
            "A point where the graph always stops",
            "The maximum point of every graph",
            "The x-intercept only"
        ],
        answer: 0,
        explanation:
            "An asymptote is a line that a graph approaches."
    },

    {
        question: "For f(x) = 1/x, what is the vertical asymptote?",
        choices: [
            "x = 0",
            "y = 0",
            "x = 1",
            "y = 1"
        ],
        answer: 0,
        explanation:
            "The denominator is zero when x = 0, so x = 0 is the vertical asymptote."
    },

    {
        question: "For f(x) = 1/x, what is the horizontal asymptote?",
        choices: [
            "y = 0",
            "x = 0",
            "y = 1",
            "x = 1"
        ],
        answer: 0,
        explanation:
            "As x becomes very large or very negative, 1/x approaches 0. Therefore y = 0 is the horizontal asymptote."
    },

    {
        question: "Which value is excluded from f(x) = 3/(x + 2)?",
        choices: [
            "x = -2",
            "x = 2",
            "x = 3",
            "x = 0"
        ],
        answer: 0,
        explanation:
            "x + 2 = 0 when x = -2, so -2 is excluded from the domain."
    },

    {
        question: "What is the vertical asymptote of f(x) = 5/(x - 7)?",
        choices: [
            "x = 7",
            "x = -7",
            "y = 7",
            "y = -7"
        ],
        answer: 0,
        explanation:
            "The denominator is zero when x = 7, so x = 7 is the vertical asymptote."
    },

    {
        question: "What is the domain of f(x) = 2/(x + 5)?",
        choices: [
            "All real numbers except -5",
            "All real numbers except 5",
            "x > 5",
            "x < -5"
        ],
        answer: 0,
        explanation:
            "The denominator cannot be zero. x + 5 = 0 gives x = -5."
    },

    {
        question: "What is the vertical asymptote of f(x) = 1/(x + 3)?",
        choices: [
            "x = -3",
            "x = 3",
            "y = -3",
            "y = 3"
        ],
        answer: 0,
        explanation:
            "Set the denominator equal to zero: x + 3 = 0, so x = -3."
    },

    {
        question: "What is the horizontal asymptote of f(x) = 4/x?",
        choices: [
            "y = 0",
            "x = 0",
            "y = 4",
            "x = 4"
        ],
        answer: 0,
        explanation:
            "As x approaches positive or negative infinity, 4/x approaches 0."
    },

    {
        question: "Which expression is a rational function?",
        choices: [
            "f(x) = (x + 1)/(x - 2)",
            "f(x) = 2x + 1",
            "f(x) = x² + 3",
            "f(x) = √x"
        ],
        answer: 0,
        explanation:
            "A ratio of two polynomials is a rational function."
    },


    // ========================================================
    // INVERSE FUNCTIONS - 39 to 48
    // ========================================================

    {
        question: "What does an inverse function do?",
        choices: [
            "Reverses the input-output relationship",
            "Squares every value",
            "Always doubles the output",
            "Removes the domain"
        ],
        answer: 0,
        explanation:
            "An inverse function reverses the relationship between inputs and outputs."
    },

    {
        question: "What notation represents the inverse of f?",
        choices: [
            "f⁻¹(x)",
            "f²(x)",
            "2f(x)",
            "f/x"
        ],
        answer: 0,
        explanation:
            "The notation f⁻¹(x) represents the inverse function of f."
    },

    {
        question: "What must a function generally have to have an inverse that is also a function?",
        choices: [
            "It must be one-to-one",
            "It must be quadratic",
            "It must have no domain",
            "It must always be positive"
        ],
        answer: 0,
        explanation:
            "A function must be one-to-one so that each output corresponds to only one input."
    },

    {
        question: "If f(x) = x + 4, what is f⁻¹(x)?",
        choices: [
            "x - 4",
            "x + 4",
            "4x",
            "x/4"
        ],
        answer: 0,
        explanation:
            "Let y = x + 4. Swap x and y and solve. The inverse is f⁻¹(x) = x - 4."
    },

    {
        question: "If f(x) = 2x, what is f⁻¹(x)?",
        choices: [
            "x/2",
            "2x",
            "x + 2",
            "x - 2"
        ],
        answer: 0,
        explanation:
            "Let y = 2x. Swap the variables and solve: y = x/2."
    },

    {
        question: "What happens to the domain and range when finding an inverse?",
        choices: [
            "They switch",
            "They disappear",
            "They become zero",
            "They remain unrelated"
        ],
        answer: 0,
        explanation:
            "The domain of a function becomes the range of its inverse, and the range becomes the domain."
    },

    {
        question: "If f(x) = x - 7, what is f⁻¹(x)?",
        choices: [
            "x + 7",
            "x - 7",
            "7x",
            "x/7"
        ],
        answer: 0,
        explanation:
            "To reverse subtracting 7, add 7. Therefore f⁻¹(x) = x + 7."
    },

    {
        question: "If f(x) = 3x + 6, what is f⁻¹(x)?",
        choices: [
            "(x - 6)/3",
            "3x - 6",
            "(x + 6)/3",
            "x/3 + 6"
        ],
        answer: 0,
        explanation:
            "Let y = 3x + 6. Swap x and y: x = 3y + 6. Thus y = (x - 6)/3."
    },

    {
        question: "Which test can help determine whether a function is one-to-one?",
        choices: [
            "Horizontal line test",
            "Vertical line test",
            "Product test",
            "Addition test"
        ],
        answer: 0,
        explanation:
            "A graph passes the horizontal line test if no horizontal line intersects it more than once."
    },

    {
        question: "What is f(f⁻¹(x)) for a valid inverse?",
        choices: [
            "x",
            "0",
            "1",
            "f(x)"
        ],
        answer: 0,
        explanation:
            "A function and its inverse undo each other, so f(f⁻¹(x)) = x."
    },


    // ========================================================
    // EXPONENTIAL FUNCTIONS - 49 to 61
    // ========================================================

    {
        question: "What is an exponential function?",
        choices: [
            "A function in which the variable appears in the exponent",
            "A function with no variables",
            "A function that is always linear",
            "A function containing only fractions"
        ],
        answer: 0,
        explanation:
            "An exponential function has a variable in the exponent, such as f(x) = 2ˣ."
    },

    {
        question: "Which is an exponential function?",
        choices: [
            "f(x) = 2ˣ",
            "f(x) = 2x",
            "f(x) = x²",
            "f(x) = x + 2"
        ],
        answer: 0,
        explanation:
            "In f(x) = 2ˣ, the variable x is in the exponent."
    },

    {
        question: "What is 2³?",
        choices: [
            "8",
            "6",
            "9",
            "5"
        ],
        answer: 0,
        explanation:
            "2³ = 2 × 2 × 2 = 8."
    },

    {
        question: "What is 5²?",
        choices: [
            "25",
            "10",
            "15",
            "20"
        ],
        answer: 0,
        explanation:
            "5² = 5 × 5 = 25."
    },

    {
        question: "What is exponential growth?",
        choices: [
            "A quantity increases by a constant percentage or factor",
            "A quantity always decreases by one",
            "A quantity remains constant",
            "A quantity changes randomly"
        ],
        answer: 0,
        explanation:
            "Exponential growth occurs when a quantity increases by a constant percentage or multiplicative factor over equal intervals."
    },

    {
        question: "What is exponential decay?",
        choices: [
            "A quantity decreases by a constant percentage or factor",
            "A quantity always increases",
            "A quantity remains unchanged",
            "A quantity becomes negative immediately"
        ],
        answer: 0,
        explanation:
            "Exponential decay occurs when a quantity decreases by a constant percentage or multiplicative factor over equal intervals."
    },

    {
        question: "In an exponential function f(x) = abˣ, what is b called?",
        choices: [
            "The base",
            "The exponent",
            "The output",
            "The domain"
        ],
        answer: 0,
        explanation:
            "In the standard form f(x) = abˣ, b is the base of the exponential expression."
    },

    {
        question: "If a population doubles every year, what type of model can describe it?",
        choices: [
            "Exponential growth",
            "Linear decay",
            "Constant function",
            "Quadratic decay"
        ],
        answer: 0,
        explanation:
            "A quantity that multiplies by a constant factor over equal intervals is modeled by exponential growth."
    },

    {
        question: "What is 10⁰?",
        choices: [
            "1",
            "0",
            "10",
            "-1"
        ],
        answer: 0,
        explanation:
            "Any nonzero number raised to the zero power equals 1."
    },

    {
        question: "What is 3⁴?",
        choices: [
            "81",
            "12",
            "64",
            "27"
        ],
        answer: 0,
        explanation:
            "3⁴ = 3 × 3 × 3 × 3 = 81."
    },

    {
        question: "If f(x) = 2ˣ, what is f(4)?",
        choices: [
            "16",
            "8",
            "12",
            "6"
        ],
        answer: 0,
        explanation:
            "f(4) = 2⁴ = 16."
    },

    {
        question: "Which base indicates exponential decay in f(x) = abˣ?",
        choices: [
            "0 < b < 1",
            "b > 1",
            "b = 1",
            "b = 0"
        ],
        answer: 0,
        explanation:
            "When 0 < b < 1, the exponential function decreases as x increases."
    },

    {
        question: "Which base indicates exponential growth?",
        choices: [
            "b > 1",
            "0 < b < 1",
            "b = 0",
            "b < 0"
        ],
        answer: 0,
        explanation:
            "When b > 1, the exponential function grows as x increases."
    },


    // ========================================================
    // LOGARITHMIC FUNCTIONS - 62 to 74
    // ========================================================

    {
        question: "What is a logarithm?",
        choices: [
            "The exponent to which a base must be raised to obtain a number",
            "A type of fraction",
            "A negative number",
            "A polynomial"
        ],
        answer: 0,
        explanation:
            "A logarithm tells us the exponent needed to raise a given base to obtain a number."
    },

    {
        question: "What is log₂(8)?",
        choices: [
            "3",
            "2",
            "4",
            "8"
        ],
        answer: 0,
        explanation:
            "Because 2³ = 8, log₂(8) = 3."
    },

    {
        question: "What is log₁₀(100)?",
        choices: [
            "2",
            "10",
            "100",
            "1"
        ],
        answer: 0,
        explanation:
            "10² = 100, so log₁₀(100) = 2."
    },

    {
        question: "Which equation is equivalent to log₂(8) = 3?",
        choices: [
            "2³ = 8",
            "3² = 8",
            "8² = 3",
            "2⁸ = 3"
        ],
        answer: 0,
        explanation:
            "The logarithmic equation log₂(8) = 3 is equivalent to 2³ = 8."
    },

    {
        question: "What is log₁₀(1)?",
        choices: [
            "0",
            "1",
            "10",
            "-1"
        ],
        answer: 0,
        explanation:
            "10⁰ = 1, so log₁₀(1) = 0."
    },

    {
        question: "What is log₂(16)?",
        choices: [
            "4",
            "8",
            "2",
            "16"
        ],
        answer: 0,
        explanation:
            "Since 2⁴ = 16, log₂(16) = 4."
    },

    {
        question: "Which is the common logarithm?",
        choices: [
            "Logarithm with base 10",
            "Logarithm with base 2",
            "Logarithm with base 5",
            "Logarithm with base 100"
        ],
        answer: 0,
        explanation:
            "The common logarithm uses base 10 and is often written as log(x)."
    },

    {
        question: "Which is the natural logarithm?",
        choices: [
            "ln(x)",
            "log₂(x)",
            "log₁₀(x)",
            "log₅(x)"
        ],
        answer: 0,
        explanation:
            "The natural logarithm is written as ln(x) and has base e."
    },

    {
        question: "What is the value of ln(e)?",
        choices: [
            "1",
            "0",
            "e",
            "-1"
        ],
        answer: 0,
        explanation:
            "Since e¹ = e, ln(e) = 1."
    },

    {
        question: "What is log₃(27)?",
        choices: [
            "3",
            "9",
            "6",
            "27"
        ],
        answer: 0,
        explanation:
            "Because 3³ = 27, log₃(27) = 3."
    },

    {
        question: "What is log₅(25)?",
        choices: [
            "2",
            "5",
            "10",
            "25"
        ],
        answer: 0,
        explanation:
            "5² = 25, so log₅(25) = 2."
    },

    {
        question: "What is log₄(64)?",
        choices: [
            "3",
            "4",
            "16",
            "2"
        ],
        answer: 0,
        explanation:
            "4³ = 64, so log₄(64) = 3."
    },

    {
        question: "What is log₂(32)?",
        choices: [
            "5",
            "4",
            "6",
            "8"
        ],
        answer: 0,
        explanation:
            "2⁵ = 32, so log₂(32) = 5."
    },


    // ========================================================
    // LAWS OF LOGARITHMS - 75 to 80
    // ========================================================

    {
        question: "Which logarithm law represents multiplication?",
        choices: [
            "log(ab) = log(a) + log(b)",
            "log(ab) = log(a) - log(b)",
            "log(ab) = log(a)log(b)",
            "log(ab) = log(a)/log(b)"
        ],
        answer: 0,
        explanation:
            "The product rule states log(ab) = log(a) + log(b)."
    },

    {
        question: "Which law represents division?",
        choices: [
            "log(a/b) = log(a) - log(b)",
            "log(a/b) = log(a) + log(b)",
            "log(a/b) = log(a)log(b)",
            "log(a/b) = log(b) - log(a)"
        ],
        answer: 0,
        explanation:
            "The quotient rule states log(a/b) = log(a) - log(b)."
    },

    {
        question: "What is the power rule of logarithms?",
        choices: [
            "log(aⁿ) = n log(a)",
            "log(aⁿ) = log(a) + n",
            "log(aⁿ) = log(a)/n",
            "log(aⁿ) = a log(n)"
        ],
        answer: 0,
        explanation:
            "The power rule allows an exponent to be moved in front of a logarithm as a multiplier."
    },

    {
        question: "What is log₂(4 × 8)?",
        choices: [
            "5",
            "4",
            "6",
            "12"
        ],
        answer: 0,
        explanation:
            "4 × 8 = 32, and log₂(32) = 5."
    },

    {
        question: "What is log₁₀(1000)?",
        choices: [
            "3",
            "2",
            "10",
            "100"
        ],
        answer: 0,
        explanation:
            "10³ = 1000, so log₁₀(1000) = 3."
    },

    {
        question: "If log₂(x) = 4, what is x?",
        choices: [
            "16",
            "8",
            "12",
            "4"
        ],
        answer: 0,
        explanation:
            "Convert to exponential form: 2⁴ = x. Therefore x = 16."
    },


    // ========================================================
    // ARITHMETIC SEQUENCES - 81 to 90
    // ========================================================

    {
        question: "What is an arithmetic sequence?",
        choices: [
            "A sequence with a constant difference between consecutive terms",
            "A sequence with a constant product",
            "A sequence with random terms",
            "A sequence containing only even numbers"
        ],
        answer: 0,
        explanation:
            "An arithmetic sequence has a common difference between consecutive terms."
    },

    {
        question: "What is the common difference of 2, 5, 8, 11?",
        choices: [
            "3",
            "2",
            "4",
            "5"
        ],
        answer: 0,
        explanation:
            "Subtract consecutive terms: 5 - 2 = 3 and 8 - 5 = 3. The common difference is 3."
    },

    {
        question: "What is the next term in 4, 7, 10, 13?",
        choices: [
            "16",
            "15",
            "17",
            "20"
        ],
        answer: 0,
        explanation:
            "The common difference is 3, so 13 + 3 = 16."
    },

    {
        question: "What is the formula for the nth term of an arithmetic sequence?",
        choices: [
            "aₙ = a₁ + (n - 1)d",
            "aₙ = a₁dⁿ",
            "aₙ = n + d",
            "aₙ = a₁/n"
        ],
        answer: 0,
        explanation:
            "The nth term of an arithmetic sequence is aₙ = a₁ + (n - 1)d."
    },

    {
        question: "In an arithmetic sequence, what does d represent?",
        choices: [
            "Common difference",
            "Domain",
            "Denominator",
            "Degree"
        ],
        answer: 0,
        explanation:
            "The letter d commonly represents the common difference."
    },

    {
        question: "Find the 5th term of 3, 6, 9, 12, ...",
        choices: [
            "15",
            "18",
            "12",
            "21"
        ],
        answer: 0,
        explanation:
            "The sequence increases by 3. The fifth term is 15."
    },

    {
        question: "If a₁ = 5 and d = 4, what is a₄?",
        choices: [
            "17",
            "13",
            "20",
            "16"
        ],
        answer: 0,
        explanation:
            "a₄ = 5 + (4 - 1)(4) = 5 + 12 = 17."
    },

    {
        question: "What is the common difference of 20, 15, 10, 5?",
        choices: [
            "-5",
            "5",
            "-10",
            "10"
        ],
        answer: 0,
        explanation:
            "15 - 20 = -5, so the common difference is -5."
    },

    {
        question: "What is the 10th term of 2, 5, 8, 11, ...?",
        choices: [
            "29",
            "30",
            "27",
            "32"
        ],
        answer: 0,
        explanation:
            "Using aₙ = a₁ + (n - 1)d: a₁ = 2, d = 3, n = 10. Thus a₁₀ = 2 + 9(3) = 29."
    },

    {
        question: "If a₁ = 7 and d = 3, what is a₆?",
        choices: [
            "22",
            "21",
            "25",
            "19"
        ],
        answer: 0,
        explanation:
            "a₆ = 7 + (6 - 1)(3) = 7 + 15 = 22."
    },


    // ========================================================
    // GEOMETRIC SEQUENCES - 91 to 96
    // ========================================================

    {
        question: "What is a geometric sequence?",
        choices: [
            "A sequence with a constant ratio between consecutive terms",
            "A sequence with a constant difference",
            "A sequence with no pattern",
            "A sequence containing only prime numbers"
        ],
        answer: 0,
        explanation:
            "A geometric sequence has a constant ratio between consecutive terms."
    },

    {
        question: "What is the common ratio of 2, 6, 18, 54?",
        choices: [
            "3",
            "2",
            "6",
            "4"
        ],
        answer: 0,
        explanation:
            "Divide consecutive terms: 6/2 = 3 and 18/6 = 3. The common ratio is 3."
    },

    {
        question: "What is the next term in 3, 9, 27, 81?",
        choices: [
            "243",
            "162",
            "108",
            "180"
        ],
        answer: 0,
        explanation:
            "Each term is multiplied by 3. Therefore, 81 × 3 = 243."
    },

    {
        question: "What is the formula for the nth term of a geometric sequence?",
        choices: [
            "aₙ = a₁rⁿ⁻¹",
            "aₙ = a₁ + (n - 1)d",
            "aₙ = n/r",
            "aₙ = a₁ + r"
        ],
        answer: 0,
        explanation:
            "The nth term formula for a geometric sequence is aₙ = a₁rⁿ⁻¹."
    },

    {
        question: "In a geometric sequence, what does r represent?",
        choices: [
            "Common ratio",
            "Common difference",
            "Range",
            "Root"
        ],
        answer: 0,
        explanation:
            "The letter r commonly represents the common ratio."
    },

    {
        question: "Find the 4th term of 2, 4, 8, ...",
        choices: [
            "16",
            "12",
            "14",
            "18"
        ],
        answer: 0,
        explanation:
            "The common ratio is 2. Therefore, the fourth term is 16."
    },


    // ========================================================
    // SERIES - 97 to 100
    // ========================================================

    {
        question: "What is a series?",
        choices: [
            "The sum of the terms of a sequence",
            "The difference between terms",
            "The ratio between terms",
            "The first term only"
        ],
        answer: 0,
        explanation:
            "A series is formed by adding the terms of a sequence."
    },

{
    question: "What is the formula for the sum of an arithmetic series?",
    choices: [
        "Sₙ = n/2 [2a₁ + (n - 1)d]",
        "Sₙ = a₁rⁿ",
        "Sₙ = a₁ + nd",
        "Sₙ = n + d"
    ],
    answer: 0,
    explanation:
        "The sum of an arithmetic series is Sₙ = n/2 [2a₁ + (n - 1)d]."
},

{
    question: "What is the sum of 2 + 4 + 6 + 8 + 10?",
    choices: [
        "30",
        "25",
        "35",
        "20"
    ],
    answer: 0,
    explanation:
        "Add the terms: 2 + 4 + 6 + 8 + 10 = 30."
},

{
    question: "What is the sum of the first 5 terms of 3, 6, 9, 12, 15?",
    choices: [
        "45",
        "40",
        "50",
        "35"
    ],
    answer: 0,
    explanation:
        "Add the five terms: 3 + 6 + 9 + 12 + 15 = 45."
},

{
    question: "What is the sum of 5 + 10 + 15 + 20?",
    choices: [
        "50",
        "45",
        "55",
        "40"
    ],
    answer: 0,
    explanation:
        "5 + 10 + 15 + 20 = 50."
}

];


// ============================================================
// REVIEW CONTENT
// ============================================================

const reviewData = {

    functions: {
        title: "Functions",
        content: `
            <h3>Functions</h3>

            <p>
                A function is a relation where every input
                has exactly one output.
            </p>

            <h4>Domain</h4>
            <p>
                The domain is the set of possible input values.
            </p>

            <h4>Range</h4>
            <p>
                The range is the set of possible output values.
            </p>

            <div class="formula">
                f(x) = output of the function when x is the input
            </div>

            <div class="example">
                <strong>Example:</strong><br>
                If f(x) = 2x + 3, find f(4).<br><br>
                f(4) = 2(4) + 3 = 11
            </div>
        `
    },

    rational: {
        title: "Rational Functions",
        content: `
            <h3>Rational Functions</h3>

            <p>
                A rational function is a ratio of two polynomials.
            </p>

            <div class="formula">
                f(x) = P(x) / Q(x), where Q(x) ≠ 0
            </div>

            <h4>Domain Restriction</h4>

            <p>
                Values that make the denominator equal to zero
                are excluded from the domain.
            </p>

            <div class="example">
                <strong>Example:</strong><br>
                f(x) = 1 / (x - 4)<br><br>
                x - 4 = 0<br>
                x = 4<br><br>
                Therefore, x ≠ 4.
            </div>

            <h4>Asymptotes</h4>

            <p>
                An asymptote is a line that the graph approaches.
            </p>
        `
    },

    inverse: {
        title: "Inverse Functions",
        content: `
            <h3>Inverse Functions</h3>

            <p>
                An inverse function reverses the input-output
                relationship of a function.
            </p>

            <div class="formula">
                f⁻¹(x)
            </div>

            <h4>Example</h4>

            <div class="example">
                f(x) = x + 4<br><br>
                Replace f(x) with y:<br>
                y = x + 4<br><br>
                Switch x and y:<br>
                x = y + 4<br><br>
                Solve for y:<br>
                y = x - 4<br><br>
                Therefore:<br>
                <strong>f⁻¹(x) = x - 4</strong>
            </div>
        `
    },

    business: {
        title: "Business Mathematics",
        content: `
            <h3>Business Mathematics</h3>

            <p>
                Business mathematics involves calculations
                commonly used in business and finance.
            </p>

            <h4>Percentage</h4>

            <div class="formula">
                Percentage = (Part / Whole) × 100
            </div>

            <h4>Simple Interest</h4>

            <div class="formula">
                I = Prt
            </div>

            <p>
                P is the principal, r is the interest rate,
                and t is the time.
            </p>

            <div class="example">
                <strong>Example:</strong><br>
                If P = ₱1,000, r = 5%, and t = 2 years:<br><br>
                I = 1000(0.05)(2)<br>
                I = ₱100
            </div>
        `
    },

    sequences: {
        title: "Sequences",
        content: `
            <h3>Sequences</h3>

            <h4>Arithmetic Sequence</h4>

            <p>
                An arithmetic sequence has a constant difference
                between consecutive terms.
            </p>

            <div class="formula">
                aₙ = a₁ + (n - 1)d
            </div>

            <div class="example">
                <strong>Example:</strong><br>
                2, 5, 8, 11, ...<br><br>
                Common difference = 3<br><br>
                10th term:<br>
                a₁₀ = 2 + (10 - 1)(3)<br>
                a₁₀ = 29
            </div>

            <h4>Geometric Sequence</h4>

            <p>
                A geometric sequence has a constant ratio
                between consecutive terms.
            </p>

            <div class="formula">
                aₙ = a₁rⁿ⁻¹
            </div>
        `
    },

    series: {
        title: "Series",
        content: `
            <h3>Series</h3>

            <p>
                A series is the sum of the terms of a sequence.
            </p>

            <h4>Arithmetic Series</h4>

            <div class="formula">
                Sₙ = n/2 [2a₁ + (n - 1)d]
            </div>

            <div class="example">
                <strong>Example:</strong><br>
                Find the sum of 2 + 4 + 6 + 8 + 10.<br><br>
                S = 2 + 4 + 6 + 8 + 10<br>
                <strong>S = 30</strong>
            </div>
        `
    },

    exponential: {
        title: "Exponential Functions",
        content: `
            <h3>Exponential Functions</h3>

            <p>
                An exponential function has a variable in the exponent.
            </p>

            <div class="formula">
                f(x) = abˣ
            </div>

            <h4>Growth</h4>

            <p>
                If b &gt; 1, the function represents exponential growth.
            </p>

            <h4>Decay</h4>

            <p>
                If 0 &lt; b &lt; 1, the function represents exponential decay.
            </p>

            <div class="example">
                <strong>Example:</strong><br>
                f(x) = 2ˣ<br><br>
                f(4) = 2⁴ = 16
            </div>
        `
    },

    logarithmic: {
        title: "Logarithmic Functions",
        content: `
            <h3>Logarithmic Functions</h3>

            <p>
                A logarithm tells us the exponent to which
                a base must be raised to obtain a number.
            </p>

            <div class="formula">
                logᵦ(x) = y ⇔ bʸ = x
            </div>

            <div class="example">
                <strong>Example:</strong><br>
                log₂(8) = 3<br><br>
                because 2³ = 8.
            </div>

            <h4>Important Laws</h4>

            <div class="formula">
                log(ab) = log(a) + log(b)
            </div>

            <div class="formula">
                log(a/b) = log(a) - log(b)
            </div>

            <div class="formula">
                log(aⁿ) = n log(a)
            </div>
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

    showScreen("menuScreen");
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

function startQuiz(type) {

    currentQuiz = type;
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    answerSubmitted = false;
    userAnswers = [];

    /*
        Shuffle the question bank so that every quiz
        can contain different questions.
    */

    currentQuestions = [...questionBank]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

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
        return "📚 Learning Quiz";
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

    nextButton.textContent = "Check Answer";
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
            "Keep practicing! Use the General Mathematics Review before trying again.";

    }

    document.getElementById("performanceMessage").textContent =
        message;

    showScreen("resultScreen");
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

    document.getElementById("welcomeMessage").textContent =
        `Welcome, ${studentName}! Section ${studentSection}.`;

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

});
