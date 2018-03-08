'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

////////////////////////////////////////////////////////////////////
// Main Class
var TownAdm = function (_Map) {
    _inherits(TownAdm, _Map);

    function TownAdm(name, year) {
        _classCallCheck(this, TownAdm);

        var _this = _possibleConstructorReturn(this, (TownAdm.__proto__ || Object.getPrototypeOf(TownAdm)).call(this));

        _this.set('name', name);
        _this.set('year', year);
        return _this;
    }

    _createClass(TownAdm, [{
        key: 'calculateAge',
        value: function calculateAge() {
            var date = new Date().getFullYear();
            return date - this.get('year');
        }
    }]);

    return TownAdm;
}(Map);

///////////////////////////////////////////////////////////////////
// Park Class


var Park = function (_TownAdm) {
    _inherits(Park, _TownAdm);

    function Park(name, year, numberOfTrees, area) {
        _classCallCheck(this, Park);

        var _this2 = _possibleConstructorReturn(this, (Park.__proto__ || Object.getPrototypeOf(Park)).call(this, name, year));

        _this2.set('trees', numberOfTrees);
        _this2.set('area', area);
        return _this2;
    }

    _createClass(Park, [{
        key: 'treeDensity',
        value: function treeDensity() {
            var density = void 0;

            density = this.get('trees') / this.get('area') * 100;

            return Math.round(density);
        }
    }, {
        key: 'averageAge',
        value: function averageAge(sum, numParks) {
            console.log(sum / numParks);
        }
    }, {
        key: 'tooManyTrees',
        value: function tooManyTrees(trees) {
            if (this.get('trees') > trees) {
                console.log(this.get('name'));
            }
        }
    }]);

    return Park;
}(TownAdm);

//////////////////////////////////////////////////////////////////
// Street Class 


var Street = function (_TownAdm2) {
    _inherits(Street, _TownAdm2);

    function Street(name, year, length) {
        var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'normal';

        _classCallCheck(this, Street);

        var _this3 = _possibleConstructorReturn(this, (Street.__proto__ || Object.getPrototypeOf(Street)).call(this, name, year));

        _this3.set('length', length);
        _this3.set('size', size);
        return _this3;
    }

    return Street;
}(TownAdm);

///////////////////////////////////////////////////////////////
// Parks List


var park1 = new Park('Parkin', 1968, 564, 1300);
var park2 = new Park('Trent', 1850, 1555, 2000);
var park3 = new Park('Hamilton', 1999, 360, 900);

var parkList = [park1, park2, park3];

///////////////////////////////////////////////////////////////
// Streets List
var sizes = ['tiny', 'small', 'normal', 'big', 'huge'];

var street1 = new Street('Jupa', 1856, 150);
var street2 = new Street('Jupiratan', 1700, 300, sizes[4]);
var street3 = new Street('Hermit', 2000, 30, sizes[0]);
var street4 = new Street('Ornitorrinco', 1799, 75, sizes[1]);

var streetList = [street1, street2, street3, street4];

// Calculates the average age of all the parks in the list
function calcYearAverage() {
    var total = 0;
    var average = 0;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = parkList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var e = _step.value;

            total += e.calculateAge();
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    average = total / parkList.length;

    console.log('Our ' + parkList.length + ' parks have an average age of ' + average + ' years.');
}

// Console log tree density of the parks
function eachParkTreeDensity() {
    parkList.forEach(function (e) {
        return console.log(e.get('name') + ' has a tree density of ' + e.treeDensity() + '%.');
    });
}

// Console log total and average length of streets
function totalAndAverage() {
    console.log('Our ' + streetList.length + ' have a total length of ' + totalStreetLength() + ', \nwith an average of ' + averageStreetLength());
}

// Return total length of streets
function totalStreetLength() {
    var total = 0;
    streetList.forEach(function (e) {
        total += e.get('length');
    });
    return total;
}

// Return average legth of streets
function averageStreetLength() {
    var average = 0;
    average = totalStreetLength() / streetList.length;
    return average;
}

function streetsInfo() {
    streetList.forEach(function (e) {
        return console.log(e.get('name') + ', built in ' + e.get('year') + ' is a ' + e.get('size') + ' street.');
    });
}

// start application
function init() {
    console.log('--------Parks Report--------');
    calcYearAverage();
    eachParkTreeDensity();

    console.log('-------Streets Report-------');
    totalAndAverage();
    streetsInfo();
}

init();
