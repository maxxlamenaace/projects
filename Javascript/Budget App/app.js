var budgetController = function() {
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
        this.calculatePercentage = function(totalIncome){
            if(totalIncome > 0){
                this.percentage = Math.round((this.value / totalIncome) * 100);
            } else {
                this.percentage = -1;
            }
           
        };
        this.getPercentage = function(){
            return this.percentage;
        };
    };

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotalBudget = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(element){
            sum = sum + element.value;
        });
        data.total[type] = sum;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function(type, description, value){
            var newItem, id;
            // Créer un nouvel identifiant
            if(data.allItems[type].length > 0){
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                id = 0;
            }
            // Créer un nouvel élément Income ou Expense
            if(type === 'inc'){
                newItem = new Income(id, description, value)
            } else if (type === 'exp') {
                newItem = new Expense(id, description, value)
            }
            // Insérer le nouvel élément dans l'architecture de données
            data.allItems[type].push(newItem);
            return newItem;
        },
        deleteItem: function(type, id){
            var id, index;
            ids = data.allItems[type].map(function(element){
                return element.id;
            });
            index = ids.indexOf(id);
            if(index !== -1){
                // Enlever l'item de l'architecture de données
                data.allItems[type].splice(index, 1);
            }
        },
        calculateBudget: function(){
            // Calculer les dépenses et recettes totales
            calculateTotalBudget('exp');
            calculateTotalBudget('inc');
            // Calculer le budget
            data.budget = data.total.inc - data.total.exp;
            // Calculer le pourcentage de de revenue dépensé
            if(data.total.inc > 0){
                data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },
        calculatePercentages: function(){
            data.allItems['exp'].forEach(function(element){
                element.calculatePercentage(data.total.inc);
            });
        },
        getPercentages: function(){
            var allPercentages = data.allItems['exp'].map(function(element){
                return element.getPercentage();
            });
            return allPercentages;
        },
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.total.inc,
                totalExp: data.total.exp,
                percentage: data.percentage
            }
        },
        testingData: function(){
            console.log(data);
        }
    }
}();

var UIController = function() {
    var DOMInputs = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        percentagesLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    }

    var formatNumber = function(number, type){
        var numberSplit, integerPart, decimalPart, sign;
        number = Math.abs(number);
        number = number.toFixed(2);
        numberSplit = number.split('.');
        integerPart = numberSplit[0];
        decimalPart = numberSplit[1];
        if (integerPart.length > 3) {
            integerPart = integerPart.substr(0, integerPart.length - 3) + ',' + integerPart.substr(integerPart.length - 3, integerPart.length);
        }
        return (type === 'exp' ? sign = '-' : sign = '+') + ' ' + integerPart + '.' + decimalPart;
    }

    var nodeListForEach = function(nodeList, callBack){
        for(var i = 0; i < nodeList.length; i++){
            callBack(nodeList[i], i);
        }
    };

    return {
        getInputs: function(){
            return {
                type: document.querySelector(DOMInputs.inputType).value,
                description: document.querySelector(DOMInputs.inputDescription).value,
                value: parseFloat(document.querySelector(DOMInputs.inputValue).value)
            }
        },
        getDOMInputs: function(){
            return DOMInputs;
        },
        addListItem: function(object, type) {
            var html, newHtml, element;
            
            if(type === 'inc') {
                element = DOMInputs.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix">'
                +'<div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'
                +'</div></div></div>';
            } else if (type === 'exp') {
                element = DOMInputs.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix">'
                +'<div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete">'
                +'<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } 

            newHtml = html.replace('%id%', object.id);
            newHtml = newHtml.replace('%description%', object.description);
            newHtml = newHtml.replace('%value%', formatNumber(object.value, type));

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        deleteListItem: function(id){
            var selectedElement = document.getElementById(id)
            selectedElement.parentNode.removeChild(selectedElement);
        },
        clearFields: function(){
            var fields, fieldsArray;
            fields = document.querySelectorAll(DOMInputs.inputDescription +', '+ DOMInputs.inputValue);
            fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach(function(element){
                element.value = "";
            });
            fieldsArray[0].focus();
        },
        displayBudget: function(object) {
            var type;
            object.budget > 0 ? type = 'inc' : type = 'exp'
            document.querySelector(DOMInputs.budgetLabel).textContent = formatNumber(object.budget, type);
            document.querySelector(DOMInputs.incomeLabel).textContent = formatNumber(object.totalInc, 'inc');
            document.querySelector(DOMInputs.expenseLabel).textContent = formatNumber(object.totalExp, 'exp');
            if(object.percentage > 0){
                document.querySelector(DOMInputs.percentageLabel).textContent = object.percentage + '%';
            } else {
                document.querySelector(DOMInputs.percentageLabel).textContent = '--';
            }
        },
        displayPercentages: function(allPercentages){
            var fields = document.querySelectorAll(DOMInputs.percentagesLabel);
            nodeListForEach(fields, function(current, index){
                if(allPercentages[index] > 0){
                    current.textContent = allPercentages[index] + '%';
                } else {
                    current.textContent = '--';
                }
            });
        },
        displayDate: function() {
            var now, month, year, allMonth;
            now = new Date();
            allMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            year = now.getFullYear();
            document.querySelector(DOMInputs.dateLabel).textContent = allMonth[month] + ' ' + year;
        },
        changeType: function() {
            var fields = document.querySelectorAll(
                DOMInputs.inputType + ',' +
                DOMInputs.inputDescription + ',' +
                DOMInputs.inputValue
            );
            nodeListForEach(fields, function(current){
                current.classList.toggle('red-focus');
                document.querySelector(DOMInputs.inputButton).classList.toggle('red');
            });
        }
    }
}();

var controller = function(budgetCtrl, UICtrl){
    var setUpEventListeners = function() {
        var DOMInputs = UICtrl.getDOMInputs();
        document.querySelector(DOMInputs.inputButton).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
        document.querySelector(DOMInputs.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(DOMInputs.inputType).addEventListener('change', UICtrl.changeType);
    };

    var updateBudget = function(){
        budgetCtrl.calculateBudget();
        var budgetData = budgetCtrl.getBudget();
        UICtrl.displayBudget(budgetData);
    };

    var updatePercentages = function() {
        budgetCtrl.calculatePercentages();
        var allPercentages = budgetCtrl.getPercentages();
        UICtrl.displayPercentages(allPercentages);
    };

    var ctrlAddItem = function(){
        var input, newItem;
        input = UICtrl.getInputs();
        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            UICtrl.addListItem(newItem, input.type);
            UICtrl.clearFields();
            updateBudget();
            updatePercentages();
        }
    };

    var ctrlDeleteItem = function(event) {
        var itemId, splitId, type, id;
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemId){
            splitId = itemId.split('-');
            type = splitId[0];
            id = parseInt(splitId[1]);
            budgetCtrl.deleteItem(type, id);
            UICtrl.deleteListItem(itemId);
            updateBudget();
            updatePercentages();
        }
    };

    return {
        init: function(){
            console.log('Application has started');
            UICtrl.displayDate();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            UICtrl.displayPercentages([]);
            setUpEventListeners();
        }
    }
}(budgetController, UIController);

controller.init();