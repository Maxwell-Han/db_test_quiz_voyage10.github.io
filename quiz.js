// JavaScript source code for QuizMockV10
let testing_something; // for 'set_a_constant'() test
//json file not in use. Not enough learned about it

let data_file;
var questions;
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
let current_answer;
let current_index;
let which_question;




function set_a_constant() {
    testing_something = document.getElementById("constant");
    console.log("id = constant");
    console.log(testing_something);
   //  Does not set color: testing_something.style.color = "green;";
    document.getElementById("constant").style.color = 'green';
};

function set_constants() {
    
  
    // I'm sure there's a cleaner/better way to store these.
    //I'd like to get these all set in a json file
    //Looks like you need something like Browserfly to use json files client side.
    //list of questions
    questions = ['what is a boolean?', 'What makes a parameter different from an arguement?'];
    //answers to go in list also
    answer1 = {
        "a": "True",
        "b": "False",
        "c": "A value of True or False, but never both.",
        "d": "Something you add to soup."
    };
    answer2 = {
        "a": "A parameter keeps the chickens from escaping. Arguements make them angry.",
        "b": "The context. A parameter is a placeholder, the arguement is the thing that occupies that place.",
        "c": "They are exactly the same.",
        "d": "about 5 kilos give or take.",
    };
    //list of correct answers by index
    correct = ["c", "b"];
    //maybe add more responses for sillier questions or images
    response_list = [
        "Try again.",
        "Correct",
    ];

    // as we add answers we can just pop them into this list/array
    answer_list = [answer1, answer2];
    current_index = 0;
    which_question = document.getElementById('which_question');

    // if we do only one question on the page, these elements don't ever need to change
    Quiz_question = document.getElementById("question");
    answer_a = document.getElementById("answerA");
    answer_b = document.getElementById("answerB");
    answer_c = document.getElementById("answerC");
    answer_d = document.getElementById("answerD");
    results = document.getElementById("results");
};


function check_answer(i, answer) {
    // if the clicked item matches the place in list "a" == "a"
    // else:  result == try again.
    var valid = correct[i];
    console.log("check answer:");
    console.log("current_answer = "); console.log(current_answer);
    if (answer == valid) {
        results.style.display = 'inline';
        results.innerHTML = 'Fantastic!';
        //move on to next question  i = i+1 load_quiz(i)
        current_index += 1;
        if (current_index < questions.length) {
            load_quiz(current_index);
        }
    }
    else {
        results.style.display = 'inline';
        results.innerHTML = 'Try again.';
    }
}

function load_quiz(i) {
    // load the constants defined above by index 
    // as we add more questions and answers we can increment through the different arrays/lists
    //console.log("activating load_quiz:");
    //results.style.display = 'none'; //can't see the fantastic after reload with this.
    var ques_num = i + 1;
    var message = "Question number:  " + " " + ques_num;
    which_question.innerHTML = message;
    which_question.style.display = 'inline';
    Quiz_question.innerHTML = questions[i];
    //console.log("Quiz_question=");
    //console.log(Quiz_question);
    let options = answer_list[i];
    //console.log("options = ", options);
    answer_a.innerHTML = options.a;
    answer_b.innerHTML = options.b;
    answer_c.innerHTML = options.c;
    answer_d.innerHTML = options.d;
}

function set_current_answer() {
    current_answer = this.id;
    check_answer(current_index, current_answer);
}


function add_ears() {
    // add event listeners to answer_a, b, c, d elements.
    // user clicks one of the answers and recieves results.
   // I was going to add event listener but not sure how to add the 'a b c d' or whatnot.....
    let choices = document.getElementsByClassName('quiz_answers');
    for (let i = 0; i < choices.length; i++) {
        let element = choices[i];
        //let answer = element.id;
        
        //console.log(answer);
        element.addEventListener("click", set_current_answer);
        
    };
};


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
    add_ears();
    
    // Need an event driver here instead of for loop
    load_quiz(current_index);
    //test *since button can only be clicked after screen load, these constants should exist (not null):
    //test_constants()
};

// load it up using a start button to set all the values.
// that way all elements are loaded before we modify them.


