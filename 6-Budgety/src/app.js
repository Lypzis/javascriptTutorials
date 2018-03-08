
//////////////////////////////////////////////////////////////
// Budget Controller
var budgetController = (function () {

    var Income = function (ID, description, value) {
        this.ID = ID;
        this.description = description;
        this.value = value
    }

    var Expense = function (ID, description, value) {
        this.ID = ID;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    Expense.prototype.calcPercentage = function(totalInc){

        if(totalInc > 0){
            this.percentage = Math.round((this.value / totalInc) * 100);
        } else {
            this.percentage = -1;
        }
    }

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }

    function calculateTotal (type){
        var sum = 0;

        data.allItems[type].forEach(function(cur) {
            sum += cur.value; //cur refers to each value of the current array type;
        }); 

        data.totals[type] = sum;
    }

    var data = {

        allItems: {
            exp: [],
            inc: []
        },

        totals: {
            exp: 0,
            inc: 0
        },

        budget: 0,
        percentage: -1

    }

    return {
        addItem: function (type, desc, val) {
            var newItem,
                ID;

            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].ID + 1; //last item ID of the array +1
            } else {
                ID = 0;
            }

            // Create new item based on 'income' or 'expense' type
            if (type === 'exp') {
                newItem = new Expense(ID, desc, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, desc, val);
            }

            // Insert new item to its corresponding data structure
            data.allItems[type].push(newItem);

            // Return the new item
            return newItem;

        },

        deleteItem: function(type, id) {
            var ids,
                index;

            //map returns a new array of ids;
            ids = data.allItems[type].map(function(current){
                return current.ID;
            });

            //set desired ID position/index from ids to start looking
            index = ids.indexOf(id);


            if (index !== -1) {
                //delete the object of the corresponding first index and only one
                data.allItems[type].splice(index, 1);
            }

        },

        calculateBudget: function () {

            //calculate total income and expense
            calculateTotal('exp');
            calculateTotal('inc');

            //calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            if (data.totals.inc > 0){
                // calculate the percentage of expenses
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }

        },

        calculatePercentages: function(){
            data.allItems.exp.forEach(function(current){
                current.calcPercentage(data.totals.inc);
            });
        },

        //returns all expense percentages
        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function(current){
                return current.getPercentage();
            });

            return allPerc;
        },

        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function(){
            return data;
        }
    }

})();

/////////////////////////////////////////////////////////////////
// UI Controller (User Interface)
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    }

    //reusable node code list
    function nodeListForEach(list, callback){
        for (var i = 0; i < list.length; ++i){
            callback(list[i], i);
        }
    };

    function formatNumber(num, type){
        var numSplit,
            int,
            dec;

        /* 
            + or - before number 
            exactly 2 decimal points
            comma separating the thousand

            2310.4567 => + 2,310.46
            2000 => + 2,000.00 
        */

        //two decimal numbers after the point
        num = Math.abs(num);
        num = num.toFixed(2);

        //adding the comma
        numSplit = num.split('.');

        int = numSplit[0];

        if (int.length > 3){
            int = int.substr(0, int.length -3) + ',' + int.substr(int.length - 3 , 3);
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };

    return {
        getinput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will either be income or expense
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },


        addListItem: function (object, type) {
            var html,
                newHtml,
                element;

            // Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%">' +
                    '<div class="item__description">%description%</div>' +
                    '<div class="right clearfix">' +
                    '<div class="item__value">%value%</div>' +
                    '<div class="item__delete">' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%">' +
                    '<div class="item__description">%description%</div>' +
                    '<div class="right clearfix">' +
                    '<div class="item__value">%value%</div>' +
                    '<div class="item__percentage">10%</div>' +
                    '<div class="item__delete">' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', object.ID);
            newHtml = newHtml.replace('%description%', object.description);
            newHtml = newHtml.replace('%value%', formatNumber(object.value, type));

            // Insert the HTML into the DOM as a child of the container
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        deleteListItem: function(selectorID){
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        displayBudget: function(obj){
            var type;

            obj.budget > 0 ? type='inc' : type='exp'; 

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
           
            if (obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---'
            }

        },

        clearFields: function (){
            var fields,
                fieldsArr;

            // returns a list not an array of the fields I want to clean
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            // now it becomes an array
            fieldsArr = Array.prototype.slice.call(fields);

            // loops through all fields of the array and set the value to empty
            fieldsArr.forEach(function (current, index, array){
                current.value = "";

                document.querySelector(DOMstrings.inputDescription).focus();
            });

            // focus on first field of the template array
            fieldsArr[0].focus();

        },


        displayPercentages: function(percentages){
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            nodeListForEach(fields, function(current, index){

                if (percentages[index] > 0){
                    current.textContent = percentages[index] + '%';
                }else{
                    current.textContent = '---';
                }

            });

        },

        displayMonth: function(){
            var now, 
                year,
                month,
                months;

            now = new Date();
            //var christmas = new Date(2018, 12, 25);

            month = now.getMonth();

            months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'August', 'September', 'October', 'November', 'December'];

            year = now.getFullYear();

            document.querySelector(DOMstrings.dateLabel).textContent = months[month-1] + ' ' + year;
        },

        changedType: function(){
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue
            );

            nodeListForEach(fields, function(current){
                current.classList.toggle('red-focus');
            })

            document.querySelector(DOMstrings.inputButton).classList.toggle('red');
        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    }

})();


////////////////////////////////////////////////////////////////
// Global App Controller
//don't use original names, bad practice, better to use a 'copy'
var controller = (function (budgetCtrl, UICtrl) {

    function setupEventListeners() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

        //happens anywhere on the document
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
    };

    function updateBudget(){
        //4. Calculate the budget
        budgetController.calculateBudget();

        //4.5 Return the budget
        var budget = budgetCtrl.getBudget();

        //5. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    function updatePercentages(){
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();

        // 2. Read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();

        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    };

    function ctrlAddItem() {
        var input,
            newItem;

        //1. Get the filled input data
        input = UICtrl.getinput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0){
            //2. Add the item to the budget controller
            newItem = budgetController.addItem(input.type, input.description, input.value);

            //3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            //3.1 Clear the Fields
            UICtrl.clearFields();

            // 4. Calculate and Update budget
            updateBudget();

            // 5. Calculate and update percentages
            updatePercentages();
        }
    };

    function ctrlDeleteItem(event){
        var itemID,
            splitID,
            type,
            ID;

        itemID = event.target.parentNode.parentNode.parentNode.id;

        if (itemID){

            //inc-1

            //split by the '-', just like cut and returns and array of the
            //separated parts
            splitID = itemID.split('-');
            type = splitID[0]; //the 'inc' or 'exp' part
            ID = parseInt(splitID[1]); 

            // 1. delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);

            // 2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);

            // 3. Update and show the new budget
            updateBudget();

            // 4. calculate and update percentages
            updatePercentages();
        }

    };

    return {
        init: function () {
            console.log('Application Started.');
            UICtrl.displayMonth();
            UICtrl.displayBudget(budgetCtrl.getBudget());
            setupEventListeners();
        }
    };

})(budgetController, UIController); //receives the two other modules to use;

controller.init();