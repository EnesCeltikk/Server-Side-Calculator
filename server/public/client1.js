//sol taraf
$(document).ready(onReady);
let operator = '';

function onReady() {
    displayHistory();
    $('.operatorButton').on('click', function() {
        operator = $(this).html();
        //tiklanan butonlarin rengini degistirme islemi
        $(this).addClass('operatorClicked');
    })
    $('#submitButton').on('click', getInputValueAndCalculate);
    $('#clearButton').on('click', clearInput);
    $('#historyUl').on('click', 'li', retrieveHistory);
    $('#clearHistory').on('click', clearHistory);

}

function displayHistory() {
    $.ajax({
        method: 'GET',
        url: '/history1'
    }).then(
        response => {
            $('#historyUl').empty();
            response.forEach(element => {
                let itemToAppend = $(`
                <li>${element.firstNumber} ${element.operator} ${element.secondNumber} = ${element.result}</li>
                `);
                $('#historyUl').append(itemToAppend);
                itemToAppend.data('id', element.id);
            })
        }

    )
}

function getInputValueAndCalculate() {
    let firstNumber = $('#firstNumInput').val();
    let secondNumber = $('#secondNumInput').val();
    let calculationObj = {
        firstNumber: firstNumber,
        secondNumber: secondNumber,
        operator: operator
    }
    if(firstNumber === '' || secondNumber === '' || operator === '' ) {
        alert('fields can not be empty');
        return;
    }
    if(isNumber(firstNumber)===false)
    {
        alert('Only numbers!');
        return;
    }
    if(isNumber(secondNumber)===false)
    {
        alert('Only numbers!');
        return;
    }

    

    //Islem bitince butonlarin rengini default yapar
    operator = '';
    $('.operatorButton').removeClass('operatorClicked');

    $.ajax({
        method: 'POST',
        url: '/calculation1',
        data: calculationObj
    }).then(
        response => {
            //Server tarafindan islem sonucunu alir. Response geriye obje dondurur.
            let result = response.result;
            //Sonucu browser'da gosterme
            $('#result').html(`<h2>${result}</h2>`);
            displayHistory();
        }
    )

}
function isNumber(str){
    return !/\D/.test(str);
}

function clearInput() {
    $('#firstNumInput').val('');
    $('#secondNumInput').val('');
    $('#result').empty();
}

function retrieveHistory() {
    let idClicked = $(this).data().id;
    $.ajax({
        method: 'GET',
        url: '/history1/'+idClicked
    }).then(
        response => {
            $('#firstNumInput').val(response.firstNumber);
            $('#secondNumInput').val(response.secondNumber);
            operator = response.operator;
            let buttonId = '';
            switch(operator){
                case '+':
                    buttonId = 'additionButton';
                    break;
                case '-':
                    buttonId = 'subtractionButton';
                    break;
                case '*':
                    buttonId = 'multiplicationButton';
                    break;
                case '/':
                    buttonId = 'divisionButton';
                    break;
            }
            $(`#${buttonId}`).addClass('operatorClicked');
        }
    )

}

function clearHistory() {
    $.ajax({
        method: 'DELETE',
        url: '/delete1'
    }).then(() => {
        displayHistory();
    }  
    )
}