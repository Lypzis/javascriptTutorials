// Coding Challenge 5
// Rules:

/* 
Suppose that you're working in a small town administration,
and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there ar only 3 parks
and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with
the following:

1. Tree density of each park in the town(formula: numberTrees/parkArea).
2. Average age of each town's park(formula: sumOfAllAges/numberOfParks).
3. The name of the park that has more than 1000 trees.
4. Total and average length of the town's streets.
5. Size classification of all streets: tiny/small/normal/big/huge.
If the size is unknown, the default is normal.

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template
strings, default parameters, maps, arrow functions, destructuring, etc.
*/

/* testing babel.js:
    npm install
    ./node_modules/.bin/babel --presets env script.js --out-file script-transpiled.js
*/

////////////////////////////////////////////////////////////////////
// Main Class
class TownAdm extends Map{
    constructor(name, year){
        super();
        this.set('name', name)
        this.set('year', year)
    }

    calculateAge(){
        let date = new Date().getFullYear();
        return date - this.get('year');
    }
}

///////////////////////////////////////////////////////////////////
// Park Class
class Park extends TownAdm{
    constructor(name, year, numberOfTrees, area){
        super(name, year)
        this.set('trees', numberOfTrees)
        this.set('area', area)
    }

    treeDensity(){
        let density;

        density = (this.get('trees')/this.get('area')*100);

        return Math.round(density);
    }

    averageAge(sum, numParks){
        console.log(sum/numParks);
    }

    tooManyTrees(trees){
        if (this.get('trees') > trees) {
            console.log(this.get('name'));
        }
    }
}

//////////////////////////////////////////////////////////////////
// Street Class 
class Street extends TownAdm{
    constructor(name, year, length, size='normal'){
        super(name, year)
        this.set('length', length)
        this.set('size', size)
    }
}

///////////////////////////////////////////////////////////////
// Parks List
const park1 = new Park('Parkin', 1968, 564, 1300);
const park2 = new Park('Trent', 1850, 1555, 2000);
const park3 = new Park('Hamilton', 1999, 360, 900);

let parkList = [park1, park2, park3];

///////////////////////////////////////////////////////////////
// Streets List
const sizes = ['tiny', 'small', 'normal', 'big', 'huge'];

const street1 = new Street('Jupa', 1856, 150);
const street2 = new Street('Jupiratan', 1700, 300, sizes[4]);
const street3 = new Street('Hermit', 2000, 30, sizes[0]);
const street4 = new Street('Ornitorrinco', 1799, 75, sizes[1]);

let streetList = [street1, street2, street3, street4];

// Calculates the average age of all the parks in the list
function calcYearAverage(){
    let total = 0;
    let average = 0;

    for (let e of parkList){
        total += e.calculateAge();
    }
    
    average = total/parkList.length;

    console.log(`Our ${parkList.length} parks have an average age of ${average} years.`);
}

// Console log tree density of the parks
function eachParkTreeDensity(){
    parkList.forEach(e => 
        console.log(`${e.get('name')} has a tree density of ${e.treeDensity()}%.`)
    );
}

// Console log total and average length of streets
function totalAndAverage(){
    console.log(`Our ${streetList.length} have a total length of ${totalStreetLength()}, \nwith an average of ${averageStreetLength()}`);
}

// Return total length of streets
function totalStreetLength(){
    let total = 0;
    streetList.forEach((e) => {total += e.get('length')});
    return total;
}

// Return average legth of streets
function averageStreetLength(){
    let average = 0;
    average = totalStreetLength()/streetList.length;
    return average;
}

function streetsInfo(){
    streetList.forEach(e => 
        console.log(`${e.get('name')}, built in ${e.get('year')} is a ${e.get('size')} street.`)
    );
}

// start application
function init(){
    console.log('--------Parks Report--------');
    calcYearAverage();
    eachParkTreeDensity();

    console.log('-------Streets Report-------');
    totalAndAverage();
    streetsInfo();
}

init();


