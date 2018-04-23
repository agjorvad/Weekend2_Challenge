const express = require('express');
// const objectHistory = require('./modules/object-history');
// const calculation = require('./modules/calculate-object');
const Calculator = require('./modules/calculate-object');
const allCalculations = new Calculator();
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;


app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/objects', (req, res) =>{
    res.send(allCalculations.history);
}); 

app.post('/add-object', (req, res) => {
        allCalculations.x = req.body.x;
        allCalculations.y = req.body.y;
        allCalculations.type = req.body.type;
        console.log(allCalculations);
        allCalculations.compute();
        console.log(allCalculations);
        res.sendStatus(200);
    });

app.listen(PORT, () => {
    console.log(`up and runnning on port ${PORT}`);
    });


// function calculateOperations() {
//     if( newObject.type == "Add") {
//         return (newObject.x + newObject.y);
//     }
//     else if(newObject.type == "Subtract") {
//         return (newObject.x - newObject.y);
//     }
//     else if(newObject.type == "Multiply"){
//         return (newObject.x * newObject.y);
//     }
//     else if (newObject.type == "Divide"){
//         return (newObject.x / newObject.y);
//     }
//     else{
//         return false;
//     }
//     }
