// global variables
let operator;
// symbol to be displayed on the calculatorDisplay
let symbol;
// number variables used to store input from the numerical keypad on the DOM
let x = "";
let y = "";

$(document).ready(function() {
  addEventListeners();
  $('#clear').on('click', clearDisplay);
  $('#deleteHistory').on('click', deleteHistory);
}); // END of document.ready

// AJAX 'POST' call to the server
function postCalculate(calculation) {
  $.ajax({
    type: 'POST',
    url: '/calculator',
    data: calculation,
  })
  .then(function(response){
      console.log(response);
      getAllHistory();
      clearDisplay();
    }); // END AJAX 'POST'
} // END postCalculate() function

function getAllHistory() {
    $.ajax({
        type: 'GET',
        url: '/calculator'
    })
        .then(function (response) {
            console.log(response);
            $('#historyList').empty();
            response.forEach(function (response) {
                $('#historyList').prepend(`<li>${response}</li>`);
            });
        }); // END AJAX 'GET'
} // END getAllHistory() function

function addEventListeners() {
  // click handler for mathematical operator buttons
  $('.operator').on('click', function() {
    if (x === "") { // require user to enter a number if none has been entered yet
      alert('Please enter a number before choosing a mathematical operator.');
    } else if (y === "") { // only if x has been entered, and y HAS NOT
      // assign operator/symbol variables based on the button that was clicked
      setOperation(this.value, $(this).text());
   console.log(this.value)
      // update calculatorDisplay with x and the selected operator
      $('.calculatorDisplay').empty();
      $('.calculatorDisplay').append('<span>' + x + ' ' + symbol + ' </span>');
    } else { // both x && y have been entered, operator is already assigned
      // store numbers entered by the user and
      // the currently assigned operator in an object
      let calculation = {
        x: x,
        y: y,
        type: operator
      };
      // send calculation to the server via postCalculate() function
      postCalculate(calculation);
      // assign operator/symbol variables based on the button that was clicked
      setOperation(this.value, $(this).text());
    } // END else statement
  }); // END mathematical operators click handler

  // click handler for "Crunch the Numbers" button
  $('#equal').on('click', function(e) {
    // prevent auto-refresh of the page
    e.preventDefault();
    // store numbers entered by the user and
    // the currently selected operator in an object
    let calculation = {
      x: x,
      y: y,
      type: operator
    };
    // send calculation to the server via postCalculate() function
    postCalculate(calculation);
  }); // END on.submit click handler

  // click handler for number buttons
  $('.number').on('click', function() {
    if (operator === undefined) { // string concatenation on x
      x += $(this).text();
      console.log('x', x);
      $('.calculatorDisplay').empty();
      $('.calculatorDisplay').append('<span>' + x + '</span>');
    } else { // string concatenation on y
      y += $(this).text();
      $('.calculatorDisplay').empty();
      $('.calculatorDisplay').append('<span>' + x + ' ' + symbol + ' ' + y + '</span>');
      console.log('y', y);
    } // END else statement
  }); // END number buttons click handler
} // END addEventListeners() function

function clearDisplay () {
  // click handler for "Clear" button
    // reset x, y, operator and symbol variables
    x = '';
    y = '';
    operator = undefined;
    symbol = undefined;
    // empty number input
    $('.calculatorDisplay').empty();
  } // END of "Clear" button click handler

// setter for operator & symbol
function setOperation(operand, mathOperator) {
  operator = operand;
  symbol = mathOperator;
}

function deleteHistory() {
    clearResults();
    clearDisplay();
    $.ajax({
        type: 'DELETE',
        url: '/delete-history'
    })
    .then (function (response) {
        console.log(response);
    }) // END AJAX 'DELETE'
} // END deleteHistory() function

function clearResults () {
    // removes history list from DOM
    $('#historyList').empty();
}