const express = require('express');
const Calculator = require('./modules/calculate-object');
const calculations = new Calculator();
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;


app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/calculator', (req, res) => {
    res.send(calculations.history);
});

app.delete('/delete-history', (req, res) => {
    calculations.deleteHistory();
    res.sendStatus(200);
});

app.post('/calculator', (req, res) => {
    calculations.x = req.body.x;
    calculations.y = req.body.y;
    calculations.type = req.body.type;
    console.log(calculations);
    calculations.compute();
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`up and runnning on port ${PORT}`);
});