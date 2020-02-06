//Sag taraf
$(document).ready(onReady);

let operatorKey = '';
let inputNumber = '';
let number1 = 0;
let number2 = 0;
let inputFormula = '';

function onReady() {
    displayHistory2();    
    $('.number').on('click', getKeyValue);
    //operatorler
    $('.operatorKey').on('click', getOperator);
    //=
    $('.equal').on('click', calculation);
    //clear keys
    $('#keyClearButton').on('click', clearInput2);
    //history temizle
    $('#clearHistory2').on('click', clearHistory2);
    //historyden veri cekme
    $('#historyUl2').on('click', 'li', retrieveHistory2);
}

function displayHistory2() {
    $.ajax({
        method: 'GET',
        url: '/history2'
    }).then(
        response => {
            $('#historyUl2').empty();
            response.forEach(element => {
                let itemToAppend = $(`
                <li>${element.firstNumber} ${element.operator} ${element.secondNumber} = ${element.result}</li>
                `);
                $('#historyUl2').append(itemToAppend);
                itemToAppend.data('id', element.id);
            })
        }

    )
}

function getKeyValue() {
    let keyClicked = $(this).html();
    inputFormula += keyClicked;
    inputNumber += keyClicked;
    keyClicked = '';
    $('#keyInput').val(inputFormula);
}

function getOperator() {
    number1 = Number(inputNumber);
    inputNumber = '';
    operatorKey = $(this).html();
    inputFormula += operatorKey;
    $('#keyInput').val(inputFormula);
}

    //='e basilinca calisir
function calculation() {
    number2 = Number(inputNumber);
    inputNumber = '';
    inputFormula += '=';
    $('#keyInput').val(inputFormula);
    //Server tarafina yollanan obje
    let calculationObj = {
        firstNumber: number1,
        secondNumber: number2,
        operator: operatorKey
    } 

    if(number1 === '' || number2 === '' || operatorKey === '') {
        alert('fields can not be empty');
        return;
    }

   

    $.ajax({
        //Server tarafi yapilan islemler
        method: 'POST',
        url: '/calculation2',
        data: calculationObj
    }). then(
        response => {
            let result = response.result;
            inputFormula += result;
            $('#keyInput').val(inputFormula);
            $('#result2').html(`<h2>${result}</h2>`);
            inputFormula = '';
            inputNumber = '';
            displayHistory2();
        }
    )
}
function isNumber(str){
    return !/\D/.test(str);
}
function clearInput2() {
    $('#keyInput').val('');
    $('#result2').empty();
    inputFormula = '';
    inputNumber = '';
    
}

//Server tarafinda calisan gecmisi silme islemi
function clearHistory2() {
    $.ajax({
        method: 'DELETE',
        url: '/delete2'
    }).then(() => {
        displayHistory2();
    }  
    )
}

function retrieveHistory2() {
    let idClicked = $(this).data().id;
    $.ajax({
        method: 'GET',
        url: '/history2/'+idClicked
    }).then(
        response => {
            inputFormula = response.firstNumber + response.operator + response.secondNumber;
            $('#keyInput').val(inputFormula);
            number1 = Number(response.firstNumber);
            inputNumber = Number(response.secondNumber);
            operatorKey = response.operator;
       
        }
    )

}