// JavaScript source code for QuizMockV10
let testing_something; // for 'set_a_constant'() test

// get quiz questions from firebase

db.collection('terminology').get().then( (snapshot) => {
  snapshot.docs.forEach(doc => {
    questions.push(doc.data())
  })
})

//  Quiz elements to be written to DOM
var questions = [];  // used for length of JSON array
var json_question;  // for JSON load
let json_answer;    // for JSON load
let correct;        // for JSON load

// document elements
let Quiz_question;
let answer_a;
let answer_b;
let answer_c;
let answer_d;
let answer_T;
let answer_F;
let box_type;
// constants NOT from JSON, control items
let results;
let current_answer;
let current_index;
let which_question;
let quiz_box;
let true_false_box;
//items to hide on start of quiz ----
let image1_display; // ---------new-------
let start_button;
let instructions;
let image2_display; //--new------------------
let congrats;

// Make call to Firebase and set questions into an array
//
function retrieve_JSON(i) {
    // return fetch('https://nelliesnoodles.github.io/test_quiz_voyage10.github.io/quiz_obj.json')
    //     .then(response => {
    //         console.log("getting json response...")
    //         return response.json()
    //     })
    console.log("Assigning data to constants")
      var dict = questions[i];
      var fetchedQuestion = dict.question; //set question text
      json_question = fetchedQuestion;
      var fetchedCorrect = dict.answer; //set correct answer value
      correct = fetchedCorrect; // set the correct answer value
      var fetchedAnswer = dict.choices;
      json_answer = fetchedAnswer;
      //for question number display
      var ques_num = i + 1;
      var message = "Question number:  " + " " + ques_num;
      which_question.innerHTML = message;
      which_question.style.display = 'inline';
      Quiz_question.innerHTML = json_question;

      var fetchedBoxType = dict.qType;
      box_type = fetchedBoxType;
      if (box_type == "multiple") {
          setQuizBoxType(true);
          let options = json_answer;
          //console.log("options = ", options);
          answer_a.innerHTML = options[0];
          answer_b.innerHTML = options[1];
          answer_c.innerHTML = options[2];
          answer_d.innerHTML = options[3];
      }
      else {
          setQuizBoxType(false);
      }
};

function setDOMconstants() {
    current_index = 0;
    which_question = document.getElementById('which_question');
    quiz_box = document.getElementById("quiz_box");
    true_false_box = document.getElementById("true_false_box");
    start_button = document.getElementById("start_button");
    image1_display = document.getElementById("image1");
    instructions = document.getElementById("instructions");
    image2_display = document.getElementById("image2");
    congrats = document.getElementById("congrats"); //starts at display: none

    // if we do only one question on the page, these elements don't ever need to change
    Quiz_question = document.getElementById("question");
    answer_a = document.getElementById("answerA");
    answer_b = document.getElementById("answerB");
    answer_c = document.getElementById("answerC");
    answer_d = document.getElementById("answerD");
    answer_T = document.getElementById("True");  // needed?
    answer_F = document.getElementById("False");  // needed?
    results = document.getElementById("results");
    hide_element(start_button);
    hide_element(image1_display);
    hide_element(instructions);   // maybe move end elements and start elements to entire function?
    hide_element(congrats);
    hide_element(image2_display);
    show_element(quiz_box);

};

function hide_element(element) {
    console.log(element);
    element.style.display = 'none';
}


function show_element(element) {
    element.style.display = 'inline-block';
}

function loadCurrentQuestion(i) {
    retrieve_JSON(i);
};


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
/*
 *   end JSON  functions.
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
        else{
             //end quiz
            hide_element(quiz_box);
            hide_element(true_false_box);
            hide_element(results);
            hide_element(which_question);
            hide_element(Quiz_question);
            show_element(congrats);
            show_element(image2_display);
        }
    }
    else {
        current_index = previous_index;
        results.style.display = 'inline';
        results.innerHTML = 'Try again.';
    }
}


function set_current_answer() {
    current_answer = this.nextElementSibling.textContent;
    console.log('Just clicked button.  our answer is ', current_answer)
    check_answer(current_answer);
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
    setDOMconstants();
    loadCurrentQuestion(current_index);

    //test *since button can only be clicked after screen load, these constants should exist (not null):
    //test_constants()
};

// load it up using a start button to set all the values.
// that way all elements are loaded before we modify them.
