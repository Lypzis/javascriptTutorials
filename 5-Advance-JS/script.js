/*Important Notes: 
    -Every JavaScript object has a prototype property, which
    makes inheritance possible in JavaScript;

    -The prototype property of an object is where we put methods
    and properties that we want other objects to inherit;

    -The Constructo's prototype property is NOT the prototype of
    the Constructor itself, it's the prototype of ALL instances
    that are created through it;

    -When a certain method (or property) is called, the search
    starts in the object itself, and if it cannot be found, the search moves
    on to the object's prototype. This continues until the method 
    is found: prototype chain.
*/


//////////////////////////////////////////////////////////////
// Lecture 1: Function Constructor

/*var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
} */

/*
//constructor
var Person = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person.prototype.calculateAge = 
function(){
    console.log(2018 - this.yearOfBirth);
};

Person.prototype.lastName = 'Smith'; //not good practice;

//instanciation
var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Jane', 1948, 'retired');


john.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(john.lastName);
console.log(jane.lastName);
console.log(mark.lastName);
*/

///////////////////////////////////////////////////////////////////
// Lecture 2: Prototype Chain in the Console
// check lesson 1 in the console;

//////////////////////////////////////////////////////////////////
// Lecture 3: Object create
//Object.create
/*
var personProto = {
    calculateAge: function(){
        console.log(2018 - this.yearOfBirth);
    }
}


//wrong way
////*
var john = Object.create(personProto);

john.name = 'john';
john.yearOfBirth = 1999;
john.job = 'teacher';
////*


var jane = Object.create(personProto,
{
    name: { value: 'Jane' },
    yearOfBirth: { value: 1969 },
    job: { value: 'designer' }
});
*/

/////////////////////////////////////////////////////////////
// Lecture 4: Primitives vs objects
/*
// Primitives
var a = 23;
var b = a;
a = 46;

console.log(a);
console.log(b);
////////////

// Objects
var obj1 = {
    name: 'John',
    age: 26
};

var obj2 = obj1;
obj1.age = 30;
console.log(obj1.age);
console.log(obj2.age);
/////////////

//Functions
var age = 27;
var obj = {
    name: 'Jonas',
    city: 'Lisbon'
};

function change(a, b){
    a = 30;
    b.city = 'San Francisco';
}

change(age, obj);

console.log(age);
console.log(obj.city);
//////////////////////
*/

///////////////////////////////////////////////////////////////////
// Lecture 5: First Class Function: Passing Functions as arguments
// VERY IMPORTANT
/*
var years = [1990, 1965, 1937, 2005, 1995];

// callback generic function
// uses each element of an array in a specified function
function arrayCalc(arr, fn){
    var arrRes = [];

    for (var i = 0; i < arr.length; ++i){
        arrRes.push(fn(arr[i]));
    }

    return arrRes;
}

function calculateAge(el){
    return 2018 - el;
}

function isFullAge(el){
    return el >= 18;
}

function maxHearthRate(el){
    if (el >= 18 && el <= 81){
        return Math.round(206.9 - (0.67 * el));
    }else{
        return -1;
    }
}

var age = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(age, isFullAge);
var rates = arrayCalc(age, maxHearthRate);

console.log(age);
console.log(fullAges);
console.log(rates);
*/

///////////////////////////////////////////////////////////////////
// Lecture 6: First Class Function: Functions Returning Functions
/*
function interviewQuestion(job){
    if (job === 'designer'){
        return function(name){
            console.log(name + ', can you please explain what' +
            ' Ux design is?')
        }
    }else if (job === 'teacher'){
        return function(name){
            console.log('What subject do you teach, '+ name + '?');
        }
    }else {
        return function(name){
            console.log('Hello '+ name + ', what do you do?');
        }
    }
}

//function returned is stored in the var
var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');
var anything = interviewQuestion('somethingElse');
teacherQuestion('John');
designerQuestion('John');
designerQuestion('Mark');
designerQuestion('Jane');
anything('Mike');

//best way
interviewQuestion('teacher')('Mark');
*/

/////////////////////////////////////////////////////////////////////////////////////////
// Lecture 7: Immediately Invoked Function Expressions (IIFE)
/*
function game(){
   var score = Math.random() * 10;
   console.log(score >= 5);
}
game(); 

//right way (data privacy, cannot be called)
(function(){
       var score = Math.random() * 10;
       console.log(score >= 5);
})();

//console.log(score);

//with an argument
(function(goodluck){
   var score = Math.random() * 10;
   console.log(score >= 5 - goodluck);
})(5);
*/

//////////////////////////////////////////////////////////////////
// Lecture 8: Closures

/*
    An inner function has always access to the
    variables and parameters of its outer function,
    even after the outer function has returned.


function retirement(retirementAge) {
    var a = ' years left until retirement.';
    return function (yearOfBirth) {
        var age = 2018 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

var retirementUS = retirement(66);
var retirementGermany = retirement(65);
var retirementIceland = retirement(67);

retirementUS(1990);
retirementGermany(1990);
retirementIceland(1990);


//retirement(66)(1990);

// function from 'lecture 6', but now using closure
function interviewQuestion(job){
    var a = ', can you please explain what UX design is?';
    var b = 'What subject do you teach, ';
    var c = ', what do you do?';
    return function(name){
        switch(job){
            case 'designer':
                console.log(name + a);
                break;
            case 'teacher':
                console.log(name + b);
                break;
            default:
                console.log(name + c);
        }
    }
}

interviewQuestion('designer')('Vector');

var interviewDesigner = interviewQuestion('designer');
var anyJob = interviewQuestion('any');

interviewDesigner('Mark');
interviewDesigner('Jane');

anyJob('physician');
*/

/////////////////////////////////////////////////////////////////
// Lecture 9: Bind, Call and Apply

var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay){
        if (style === 'formal'){
            console.log('Good ' + 
            timeOfDay + ', Ladies and gentlemen! I\'m ' +
            this.name + ', I\'m a ' + this.job +
            ' and I\'m ' + this.age + ' years old.');
        } else if (style === 'friendly'){
            console.log('Hey! What\'s up? I\'m ' +
            this.name + ', I\'m a ' + this.job +
            ' and I\'m ' + this.age + ' years old.' +
            ' Have a nice ' + timeOfDay + '.');
        }
    }
};

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};

john.presentation('formal', 'morning');

// call method
john.presentation.call(emily, 'friendly', 'afternoon');


// apply method
//john.presentation.apply(emily, ['friendly', 'afternoon']);

// bind call
var johnFriendly = john.presentation.bind(john, 'friendly');

johnFriendly('morning');
johnFriendly('night');

var emilyFormal = john.presentation.bind(emily, 'formal');

emilyFormal('afternoon');

var years = [1999, 1965, 1937, 1998, 1995];

function arrayCalc(arr, fn){
    var arrRes = [];

    for (var i = 0; i < arr.length; ++i){
        arrRes.push(fn(arr[i]));
    }

    return arrRes;
}

function calculateAge(el){
    return 2018 - el;
}

function isFullAge(limit, el){
    return el >= limit;
}

var ages = arrayCalc(years, calculateAge);
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));

console.log(ages);
console.log(fullJapan);















