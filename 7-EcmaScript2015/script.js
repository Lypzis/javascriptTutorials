//////////////////////////////////////////////////////////
// lecture: let and const

// ES5
/*
var name5 = 'Jane Smith';
var age5 = 23;
name5 ='JaneMiller';
//console.log(name5);

// ES6
//const -> constant
const name6 = 'Jane Smith';
//let -> mutatable variable
let age6 = '23';
//name6 = 'Jane Miller'; won't work
//console.log(name6);
age6 = '25'
console.log(age6);
*/

// ES5
/*
function driversLicence5(passedTest){
    if (passedTest){
        var firstName = 'John';
        var yearOfBirth = 1990;
    }

    console.log(firstName + ' born in ' + yearOfBirth + 
    ' is now officially allowed to drive a car.');
}

driversLicence5(true);

// ES6

function driversLicence6(passedTest){
    let firstName;
    const yearOfBirth = 1990;

    if (passedTest){
        firstName = 'John';
    }

    console.log(firstName + ' born in ' + yearOfBirth + 
    ' is now officially allowed to drive a car.');
}

driversLicence6(true);
*/

/*
let i = 23;

//the i inside the for loop is a complete different variable
for (let i = 0; i < 5; ++i){
    console.log(i);
}

console.log(i);

*/

//////////////////////////////////////////////////////
// Lecture: Blocks and IIFEs

// ES6
/*
{
    const a = 1;
    let b = 2;
    var c = 3;
}

//console.log(a+b);
console.log(c);

// ES5
(function() {
    var c = 3;
})();

//console.log(c);
*/

///////////////////////////////////////////////////////////////
// Lecture: Strings

/*
// ES6
let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
    return 2016 - year;
}

// ES5
console.log('This is '+firstName+
    ' ' + lastName + '. He was born in '+
    yearOfBirth + '. Today, he is '+
    calcAge(yearOfBirth) + ' years old.');

// ES6
console.log(`This is ${firstName} ${lastName}.
He was born in ${yearOfBirth}. 
Today he is ${calcAge(yearOfBirth)} years old.`);

const n = `${firstName} ${lastName}`;
console.log(n.startsWith('j'));
console.log(n.endsWith('th'));
console.log(n.includes(' '));
console.log(`${firstName} `.repeat(5));
*/

/////////////////////////////////////////////////////////////////
// Lecture: Arrow Functions
/*
const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function(current){
    return 2018 - current;
});
console.log(ages5);

// ES6
let ages6 = years.map(current => 2018 - current);
console.log(ages6);

ages6 = years.map((current, index) => `age element ${index + 1}:`+ 
                    `${2018 - current}.`);
console.log(ages6);

ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}: ${age}.`;
});
console.log(ages6)
 */

//////////////////////////////////////////////////////////////////////
// Lecture: Arrow Functions: Lexical 'this' Keyword

// ES5
/*
 var box5={
    color: 'green',
    position: '1',
    clickMe: function (){
        var self = this; //self is this, so there is no need to repeat all of the attributes to new ones.

        document.querySelector('.green').addEventListener('click', function(){
            var str = 'This is box number ' + self.position + ' and ' +
            'it is ' + self.color;

            alert(str);
        });
    }
 }
 box5.clickMe(); 

// ES6
const box6 = {
    color: 'green',
    position: '1',
    clickMe: function (){
        
        document.querySelector('.green').addEventListener('click', 
        () => {
            var str = 'This is box number ' + this.position + ' and ' +
            'it is ' + this.color;

            alert(str);
        });
    }
}
//box6.clickMe();
*/
/*
const box66 = {
    color: 'green',
    position: '1',
    clickMe: () => { //the surrounding here is the global and
                     //since there is nothin declared in there
                     //the attributes will be undefined
        
        document.querySelector('.green').addEventListener('click', 
        () => { //the arrow function can 'get' from the surrouding
            var str = 'This is box number ' + this.position + ' and ' +
            'it is ' + this.color;

            alert(str);
        });
    }
}
box66.clickMe(); */
/*
function Person(name){
    this.name = name;
}

// ES5
Person.prototype.myFriends = 
function(friends){

    var arr = friends.map(function(el){
        return this.name + ' is with ' + el;
    }.bind(this));

    console.log(arr);
};

var friends = ['John', 'Mary', 'Elizabeth'];
new Person('John').myFriends(friends);
 

var box5={
    color: 'green',
    position: '1',
    clickMe: function (){
        document.querySelector('.green').addEventListener('click', function(){
            var str = 'This is box number ' + this.position + ' and ' +
            'it is ' + this.color;

            alert(str);
        }.bind(this));
    }
 }
 box5.clickMe(); 

 // ES6
 function Person (name) {
    this.name = name;
}

const friends = ['John', 'Mary', 'Elizabeth'];

Person.prototype.myFriends6 = 
function(friends){

    const arr = friends.map(el => `${this.name} is with ${el}`);

    console.log(arr);
};

new Person('Karl').myFriends6(friends); */

/////////////////////////////////////////////////////////
// Lecture: Destructuring
/*
// ES5
var john = ['John', 26];
//var name = john[0];
//var age = john[1];

// ES6
const [name, year] = ['John', 26];
console.log(name);
console.log(year);

const obj = {
    firstName: 'John',
    lastName: 'Smith'
}
const {firstName, lastName} = obj;
console.log(firstName);
console.log(lastName);

const {firstName: a, lastName: b} = obj;
console.log(a);
console.log(b);

function calcAgeRetirement(year){
    const age = new Date().getFullYear() - year;

    return [age, 65 - age];
}

const [age, retirement] = calcAgeRetirement(1995);
console.log(age);
console.log(retirement);
*/

///////////////////////////////////////////////////////////////
// Lecture: Arrays
/*
const boxes = document.querySelectorAll('.box');

// ES5

var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(cur) {
    cur.style.backgroundColor = 'dodgerblue';
});


// ES6

const boxesArr6 = Array.from(boxes); */
/*boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue');


// ES5
var boxesArr5 = Array.prototype.slice.call(boxes);
for (var i = 0; i < boxesArr5.length; ++i){

    if (boxesArr5[i].className === 'box blue'){
        continue;
    } else {
        boxesArr5[i].textContent = 'I Changed to blue!';
    }
    
}


// ES6
for (const cur of boxesArr6){
    if (cur.className.includes('blue')){
        continue;
    } else {
        cur.style.backgroundColor = 'dodgerblue';
        cur.textContent = 'I Changed to blue!';
    }
}


// ES5
var ages = [12, 17, 8, 21, 14, 11];

var full = ages.map(function(cur){
    return cur >= 18;
});

console.log(full);
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);

// ES6
console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));
*/

////////////////////////////////////////////////////////////////////
// Lecture: The Spread Operator
/*
function addFourAges(a,b,c,d){
    return a+b+c+d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

// ES5
var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

// ES6
const max3 = addFourAges(...ages);
console.log(max3);

const familyStith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familyStith, 'Lily', ...familyMiller];
console.log(bigFamily);

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const all = [h, ...boxes];
Array.from(all).forEach(cur => cur.style.color = 'purple');
*/

//////////////////////////////////////////////////////////////
// Lecture: Rest Parameters
/*
// ES5
function isFullAge5(limit) {
  //console.log(arguments);
  var arr = Array.prototype.slice.call(arguments, 1);

  arr.forEach(function(element) {
    var date = new Date().getFullYear();
    return console.log(date - element >= limit);
  });
}
//const years = [1990, 2005, 1965];
//isFullAge5(10, 1990, 2005, 1965);

// ES6
function isFullAge6(limit, ...years) {
  //now it's already an array. Rest is used in the function
  // and spread is in the call of the function
  const date = new Date().getFullYear();

  years.forEach(cur => console.log(date - cur >= limit));
}
isFullAge6(30, 1990, 2005, 1965);
*/

//////////////////////////////////////////////////////////////
// Lecture: Default Parameters
/*
// ES5
function SmithPerson(firstName, yearOfBirth, lastName, nacionality){
    lastName === undefined ? lastName = 'Smith' : lastName;
    nacionality === undefined ? nacionality = 'Canadian' : nacionality;

    this.firstName = firstName,
    this.yearOfBirth = yearOfBirth,
    this.lastName = lastName,
    this.nacionality = nacionality
}
var john = new SmithPerson('John', 1990);
var emily = new SmithPerson('Emily', 1988, 'Diaz', 'Spanish');


// ES6
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nacionality = 'Canadian'){
    this.firstName = firstName,
    this.yearOfBirth = yearOfBirth,
    this.lastName = lastName,
    this.nacionality = nacionality
}
let john = new SmithPerson('John', 1990);
let emily = new SmithPerson('Emily', 1988, 'Diaz', 'Spanish');
*/

/////////////////////////////////////////////////////////////////
// Lecture: Maps(doesn't have anything related with ES5 Map)
/*
class Question extends Map{};

const question = new Question();

question.set('question', 'What is the official name' +
' of the latest major JavaScript version?');

question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct Answer!');
question.set(false, 'Wrong, please try again!');

console.log(question.get('question'));

/*
console.log(question.size);

if (question.has(4)){
    //question.delete(4);
    console.log('Answer 4 is here');
}
//question.clear();

question.forEach((value, key) => 
console.log(`This is ${key}, and
it's set to ${value}`));


// destructuring key and value from question entries
for (let [key, value] of question.entries()){
    console.log(`This is ${key}, and
it's set to ${value}`);
} 

for (let [key, value] of question.entries()){
    if(typeof(key) === 'number'){
        console.log(`Answer ${key}: ${value}`);
    }
}

const ans = parseInt(prompt('Write the correct answer'));
//will return true or false, the keys of the afterward response;
console.log(question.get(ans === question.get('correct'))); 
*/

///////////////////////////////////////////////////////////////
// Lecture: Classes
/*
// ES5 
var Person5 = function(name, yearOfBirth, job){
    this.name = name,
    this.yearOfBirth = yearOfBirth,
    this.job = job
}
Person5.prototype.calculateAge = function(){
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}
var john = new Person5('John', 1995, 'Developer');
john.calculateAge();

// ES6
class Person6{

    constructor(name, yearOfBirth, job){
        this.name = name,
        this.yearOfBirth = yearOfBirth,
        this.job = job
    }

    calculateAge(){
        let age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }

    //NOT inheritable, not usefull
    static greeting(){
        console.log('Hey there!');
    }
}
const john6 = new Person6('John', 1990, 'teacher');
john6.calculateAge();
Person6.greeting();
*/

//////////////////////////////////////////////////////////////
// Lecture: Classes with Subclasses

// ES5 
var Person5 = function(name, yearOfBirth, job){
    this.name = name,
    this.yearOfBirth = yearOfBirth,
    this.job = job
}
Person5.prototype.calculateAge = function(){
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals){
    Person5.call(this, name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
}
Athlete5.prototype = Object.create(Person5.prototype);

Athlete5.prototype.wonMedal = function(){
    this.medals++;
    console.log(this.medals);
}

var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);
johnAthlete5.calculateAge();

johnAthlete5.wonMedal();

// ES6
class Person6{

    constructor(name, yearOfBirth, job){
        this.name = name,
        this.yearOfBirth = yearOfBirth,
        this.job = job
    }

    calculateAge(){
        let age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
}

class Athlete6 extends Person6{
    constructor(name, yearOfBirth, job, olympicGames, medals){
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    wonMedal(){
        this.medals++;
        console.log(this.medals);
    }
}

const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);
johnAthlete6.wonMedal();
johnAthlete6.calculateAge();
