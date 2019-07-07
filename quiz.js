// JavaScript source code for QuizMockV10
let testing_something; // for 'set_a_constant'() test

//  Quiz elements to be written to DOM

var questions;  // used for length of JSON array
var json_question;  // for JSON load
let json_answer;    // for JSON load
let correct;        // for JSON load


// document elements
let Quiz_question;
let answer_a;
let answer_b;
let answer_c;
let answer_d;
// constants NOT from JSON, control items 
let results;
let current_answer;
let current_index;
let which_question;
let quiz_box;
let start_button;
let true_false_box;
let box_type;


//removed all old functions.  Json holds our data now.

function setQuizBoxType(multiple) {
    if (multiple == true) {
        quiz_box.style.display = 'inline-block';
        true_false_box.style.display = 'none';
    }
    else {
        quiz_box.style.display = 'none';
        true_false_box.style.display = 'inline-block';
    }
};

function retrieve_JSON(i) {
    
    
    return fetch('quiz_obj.json')
        .then(response => {
            return response.json()
        })
        .then(data => {
            // Work with JSON data here
            // had to add a _j  at the end of my content
            // because of variables declared above, these must be different
            //----------------------------------------//
            //          data format:                  
            // array:[
            // quiz content {
            //               'question_j': 'string',   
            //               'correct_j' : 'string',
            //               'box_type'  : 'string',
            //               'answers_j' : object{
            //                           'a': 'string',
            //                           'b': 'string',
            //                           'c': 'string',
            //                           'd': 'string'
            //                           }
            //               },
            // next content (same as above)  {
            //               'question_j': 'string',   
            //               'correct_j' : 'string',
            //               'box_type'  : 'string',
            //               'answers_j' : object{
            //                           'a': 'string',
            //                           'b': 'string',
            //                           'c': 'string',
            //                           'd': 'string'
            //                           }
            //               },
            //  box_type 'TorF'  does not require answers.
        
            var dict = data[i];
            questions = data; //for check answers-- needs length of array
            //console.log(dict);
            var fetchedQuestion = dict.question_j;
            json_question = fetchedQuestion;
            console.log(fetchedQuestion);
            var fetchedCorrect = dict.correct_j;
            correct = fetchedCorrect;
            //console.log(fetchedCorrect);
            var fetchedAnswer = dict.answers_j;
            //console.log(fetchedAnswer)
            json_answer = fetchedAnswer;
            var ques_num = i + 1;
            var message = "Question number:  " + " " + ques_num;
            which_question.innerHTML = message;
            which_question.style.display = 'inline';
            Quiz_question.innerHTML = json_question;
            //console.log("Quiz_question=");
            //console.log(Quiz_question);
            var fetchedBoxType = dict.box_type;
            box_type = fetchedBoxType;
            console.log(box_type);
            if (box_type == 'multiple') {
                setQuizBoxType(true);
                let options = json_answer;
                //console.log("options = ", options);
                answer_a.innerHTML = options.a;
                answer_b.innerHTML = options.b;
                answer_c.innerHTML = options.c;
                answer_d.innerHTML = options.d;
            }
            else {
                setQuizBoxType(false);                
            }
            
            
            
        })
        .catch(err => {
            // Do something for an error here
            console.log("JSON file is not accessable or error in data assignment.")
        })
};

function setDOMconstants() {
    

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

function loadCurrentQuestion(i) {
    retrieve_JSON(i);    
};

/*   
 *   end JSON  functions.  
 *  to switch back to old set,  just change the load_quiz type in start_quiz()*bottom*
*/

function check_answer(answer) {
    // if the clicked item matches the place in list "a" == "a"
    // else:  result == try again.
    var valid = correct;
    console.log("current question:"); console.log(json_question);
    console.log("check answer:"); console.log(valid);
    console.log("current_answer = "); console.log(current_answer);
    let previous_index = current_index;
    if (answer == valid) {
        results.style.display = 'inline';
        results.innerHTML = 'Fantastic!';
        current_index += 1;
        
        //move on to next question  i = i+1 load_quiz(i)
        if (current_index < questions.length) {
            
            //load_quiz(current_index);
            loadCurrentQuestion(current_index);
        }
    }
    else {
        current_index = previous_index;
        results.style.display = 'inline';
        results.innerHTML = 'Try again.';
    }
}


function set_current_answer() {
    current_answer = this.id;
    check_answer(current_index, current_answer);
};


function addEventHandlersToButtons() {
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

/*   test functions: 
* test our constants have been loaded
 *
function set_a_constant() {
    testing_something = document.getElementById("constant");
    console.log("id = constant");
    console.log(testing_something);
    document.getElementById("constant").style.color = 'green';
};
function test_constants() {
    set_a_constant(); //html element for this is commented out in html file
    console.log("id=question");
    console.log(Quiz_question);
    console.log("id=answerA");
    console.log(answer_a);
    console.log("id=answerB");
    console.log(answer_b);
    console.log("id=answerC");
    console.log(answer_c);
    console.log("id=answerD");
    console.log(answer_D);
};
*/

function start_quiz() {
    // set our constants now that page is loaded:
    addEventHandlersToButtons()
    
    //updatePageWithNewElements()
    //set_constants();   
    setDOMconstants();
    loadCurrentQuestion(current_index);
   
    //test *since button can only be clicked after screen load, these constants should exist (not null):
    //test_constants()
};

// load it up using a start button to set all the values.
// that way all elements are loaded before we modify them.
