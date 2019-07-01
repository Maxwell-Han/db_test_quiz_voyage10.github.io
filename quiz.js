// JavaScript source code for QuizMockV10
let testing_something; // for 'set_a_constant'() test
let questions;
let answer1;
let correct;
let response_list;
let answer_list;
let Quiz_question;
let answer_a;
let answer_b;
let answer_c;
let answer_d;
let results;




function set_a_constant() {
    testing_something = document.getElementById("constant");
    console.log("id = constant");
    console.log(testing_something);
   //  Does not set color: testing_something.style.color = "green;";
    document.getElementById("constant").style.color = 'green';
};

function set_constants() {
    // our list of questions
    questions = [
        "A boolean is:",
    ];
    // I'm sure there's a cleaner/better way to store these.
    answer1 = {
        "a": "True",
        "b": "False",
        "c": "A value of True or False, but never both.",
        "d": "Something you add to soup."
    };
    //list of correct answers by index
    correct = ["c"];
    //maybe add more responses for sillier questions or images
    response_list = [
        "Try again.",
        "Correct",
    ];

    // as we add answers we can just pop them into this list/array
    answer_list = [answer1];

    // if we do only one question on the page, these elements don't ever need to change
    Quiz_question = document.getElementById("question");
    answer_a = document.getElementById("answerA");
    answer_b = document.getElementById("answerB");
    answer_c = document.getElementById("answerC");
    answer_d = document.getElementById("answerD");
    results = document.getElementById("results");
};

function load_quiz(i) {
    // load the constants defined above by index 
    // as we add more questions and answers we can increment through the different arrays/lists
    console.log("activating load_quiz:");
    Quiz_question.innerHTML = questions[i];
    console.log("Quiz_question=");
    console.log(Quiz_question);
    let options = answer_list[i];
    answer_a.innerHTML = options.a;
    answer_b.innerHTML = options.b;
    answer_c.innerHTML = options.c;
    answer_d.innerHTML = options.d;
}

function add_ears() {
    // add event listeners to answer_a, b, c, d elements.
    // user clicks one of the answers and recieves results.
};

function check_answer(i) {
    // if the clicked item matches the place in list "a" == "a"
}

//test our constants have been loaded
function test_constants() {
    //set_a_constant(); //html element for this is commented out in html file
    //console.log("id=question");
    //console.log(Quiz_question);
    //console.log("id=answerA");
    //console.log(answer_a);
    //console.log("id=answerB");
    //console.log(answer_b);
    //console.log("id=answerC");
    //console.log(answer_c);
    //console.log("id=answerD");
    //console.log(answer_D);
};

function start_quiz() {
    // set our constants now that page is loaded:
    set_constants();
    // Need an event driver here instead of for loop
    for (var i = 0; i < questions.length; i++) {
        load_quiz(i);
    };
    //test *since button can only be clicked after screen load, these constants should exist (not null):
    //test_constants()
};

// load it up using a start button to set all the values.
// that way all elements are loaded before we modify them.


