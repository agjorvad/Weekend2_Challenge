class Calculator {
    constructor() {
        this.x = '';
        this.y = '';
        this.type = '';
        this.history = [];
        this.result = '';
    }

    compute() {
        if (this.type == '+') {
            this.result = Number(this.x) + Number(this.y);
        }
        else if( this.type == '-') {
            this.result = Number(this.x) - Number(this.y);
        }
        else if( this.type == '*') {
            this.result = Number(this.x) * Number(this.y);
        }
        else if( this.type == '/') {
            this.result = Number(this.x) / Number(this.y);
        }
        this.history.push(`${this.x} ${this.type} ${this.y} = ${this.result}`)
    }
}
module.exports = Calculator

// module.exports = function calculateOperations(newObject){
//     let xValue = Number($('#firstNumber').val());
// let yValue = Number($('#secondNumber').val());
// let sum = xValue + yValue;
// }
// // let operation = 0;
//         if(newObject.type == "Add") {
//         console.log(newObject.x + newObject.y);
//         return (operation += (newObject.x + newObject.y));
//     }
//     else if(newObject.type == "Subtract") {
//         console.log(newObject.x - newObject.y);
//         return (operation += (newObject.x - newObject.y));
//     }
//     else if(newObject.type == "Multiply"){
//         console.log(newObject.x * newObject.y);
//         return (operation += (newObject.x * newObject.y));
//     }
//     else if (newObject.type == "Divide"){
//         console.log(newObject.x / newObject.y);
//         return (operation += (newObject.x / newObject.y));
//     }
//     else{
//         return false;
//     }
// }
