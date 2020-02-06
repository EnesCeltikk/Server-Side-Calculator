const express = require('express');
const calculationHistory1 = [];//to store the history from sol taraf
const calculationHistory2 = [];//to store the history from sag taraf

const app = express();
const bodyParser = require('body-parser');

const port = 5000;

let id1 = 0;//for calculationHistory1
let id2 = 0;//for calculationHistory2

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.get('/history1', (req, res) => {
    res.send(calculationHistory1);
})

app.get('/history2', (req, res) => {
    res.send(calculationHistory2);
})

app.post('/calculation1', (req, res) => {
    let firstNumber = req.body.firstNumber;
    let secondNumber = req.body.secondNumber;
    let operator = req.body.operator;
    let result = 0;
    switch(operator) {
        case '+':
            result = Number(firstNumber) + Number(secondNumber);
            break;
        case '-':
            result = Number(firstNumber) - Number(secondNumber);
            break;
        case '*':
            result = Number(firstNumber) * Number(secondNumber);
            break;
        case '/':
            result = Number(firstNumber) / Number(secondNumber);
            break;
    }
    let calculationObj = {
        firstNumber: firstNumber,
        secondNumber: secondNumber,
        operator: operator,
        result: result,
        id: id1
    }
    id1 += 1;
    calculationHistory1.push(calculationObj);
    res.send(calculationObj);
})

app.post('/calculation2', (req, res) => {
    let firstNumber = req.body.firstNumber;
    let secondNumber = req.body.secondNumber;
    let operator = req.body.operator;
    let result = 0;
    switch(operator) {
        case '+':
            result = Number(firstNumber) + Number(secondNumber);
            break;
        case '-':
            result = Number(firstNumber) - Number(secondNumber);
            break;
        case '*':
            result = Number(firstNumber) * Number(secondNumber);
            break;
        case '/':
            result = Number(firstNumber) / Number(secondNumber);
            break;
        default:
            result = Number(firstNumber);
            break;
    }
    let calculationObj = {
        firstNumber: firstNumber,
        secondNumber: secondNumber,
        operator: operator,
        result: result,
        id: id2
    }
    id2 += 1;
    calculationHistory2.push(calculationObj);
    res.send(calculationObj);
})

app.get('/history1/:id', (req, res) => {
    let idRequested = req.params.id;
    for(let item of calculationHistory1) {
        if(item.id == idRequested) {
            res.send(item);
        }
    }
})

app.delete('/delete1', (req, res) => {
    calculationHistory1.splice(0, calculationHistory1.length);
    res.sendStatus(201);
})

app.delete('/delete2', (req, res) => {
    calculationHistory2.splice(0, calculationHistory2.length);
    res.sendStatus(201);
})

app.get('/history2/:id', (req, res) => {
    let idRequested = req.params.id;
    for(let item of calculationHistory2) {
        if(item.id == idRequested) {
            res.send(item);
        }
    }
})

app.listen(port, () => {
    console.log(`in port ${port}`);
})

