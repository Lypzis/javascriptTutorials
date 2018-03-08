/////////////////////////////////////////
// Coding Challenge

/*
----- Let's build a fun quiz game in the console! ----

1. Build a function constructor called Question to describe a question.  A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here,
array, objects, etc...)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers
(each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the 
number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct or not
(Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all
your code is private and doesn't interfere with the other programmers code (Hint: we learned a special
technique to do exactly that).

----- Expert level -----

8. After you display the result, display the next random question, so that the game never ends
(Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if 
the user writes 'exit' instead of the answer. In this case, DON'T call the function from Task 8

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to
the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this
with tools you feel more comfortable at this point)

11. Display the score in the console. Use yet another method for this
*/

(function () {
/////////////////////////////////////////////////////////////////////
// Question Constructor
var Question = function(question, answer, correctAnswer){
    this.question = question;
    this.answer = answer;
    this.correctAnswer = correctAnswer; 
}

/////////////////////////////////////////////////////////////////////
// Questions
var question0 = new Question(
    'What is the best coding laguange?',
    ['0. Java', '1. JavaScript', '2. C++'],
    1
);

var question1 = new Question(
    'What are you doing now?',
    ['0. Reading', '1. Answering', '2. Nothing'],
    0
);

var question2 = new Question(
    'Why is the sky blue?',
    ['0. It\'s black', '1. Because it was painted blue', '2. Water reflection'],
    2
);

var question3 = new Question(
    'How much wine can a halph filled glass of wine support?',
    ['0. halph', '1. entire glass', '2. 100ml'],
    1
);

var question4 = new Question(
    'What is between a rock and a bird?',
    ['0. and a', '1. a tree', '2. air'],
    0
);

/////////////////////////////////////////////////////////////////////////////////////////////
// Array of questions
var questions = [
    question0,
    question1,
    question2,
    question3,
    question4 
];

/////////////////////////////////////////////////////////////////////////////////////////////
// Question prototype functions

// Console a question and its answers
Question.prototype.doQuestion = function(number){
    console.log(number + '. ' +this.question);

    for (var i = 0; i < this.answer.length; ++i){
        console.log(this.answer[i]);
    }
}

// Check wheter the answer is correct 
Question.prototype.verifyAnswer = function(answer){
    var correct = false;

    if (this.correctAnswer == answer){
        console.log('correct!');
        correct = true;
    } else {
        console.log('wrong!');
    }

    return function() {
        if(correct){
            ++points;
            console.log('points: ' + points);
        }else{
            console.log('points: ' + points);
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////
// Loop

var points = 0;

// Questions loop, keeps the game alive until one types 'exit'
while (true) {
    var questionNumber = Math.floor((Math.random() * questions.length));
    questions[questionNumber].doQuestion(questionNumber+1);

    //input
    var answer = prompt('Input the number of your answer or \'exit\' to finish the game!');
    
    if (answer == 'exit'){
        break;
    }

    questions[questionNumber].verifyAnswer(answer)();
}

})();