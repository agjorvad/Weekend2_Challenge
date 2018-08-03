// global variable assigned by click-handler and
// sent over in AJAX call by the submit button
var operator;
// symbol to be displayed on the calculatorDisplay
var symbol;
// number variables used to store input from the numerical keypad on the DOM
var x = "";
var y = "";

$(document).ready(function() {
    $('.operators').on('click', 'button', addEventListeners);
    $('.numbers').on('click', 'button', addNum);
    $('#clear').on('click', clearInput);
    $('#btnDeleteHistory').on('click', deleteHistory);
}); // END of document.ready

function displayResult(result) {
  // clear any previous result
  $('.results').empty();
  // display current calculation's result
  $('.results').append('<p>Result: ' + result + '</p>');
}

// AJAX 'POST' call to the server
// sending calculation to be done (object)
// receiving calculation result (string)
// displayResult() function call on success
function postCalculate(calculation) {
  $.ajax({
    type: 'POST',
    url: '/calculator',
    data: calculation,
    success: function(res) {
      // display waiting message
      $('.results').append('<p>Minions busy crunching the numbers...</p>');
      // display results on the DOM upon success
      setTimeout(function() {
        $('.results').empty();
        // display current calculation's result
        $('.results').append('<p>Result: ' + res + '</p>');
      }, 3000);
      // reset x to equal the result of the prior calculation
      setx(res);
      getAllHistory();
    }
  }); // END AJAX 'POST' '/calculator'
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
        });
}

function addEventListeners() {
  // click handler for mathematical operator buttons
    if (x === "") { // require user to enter a number if none has been entered yet
      alert('Please enter a number before choosing a mathematical operator. Thank you, kindly.');
    } else if (y === "") { // only if x has been entered, and y HAS NOT
      // assign operator/symbol variables based on the button that was clicked
      setOperation($(this).val(), $(this).text());
      console.log($(this).text());
      // update calculatorDisplay with x and the selected operator
      $('.calculatorDisplay').empty();
      $('.calculatorDisplay').append('<span>' + x + ' ' + symbol + ' </span>');
    } else { // both x && y have been entered, operator is already assigned
      // store numbers entered by the user and
      // the currently assigned operator in an object
      var calculation = {
        x: x,
        y: y,
        type: operator
      };
      // send calculation to the server via postCalculate() function
      postCalculate(calculation);
      // assign operator/symbol variables based on the button that was clicked
      setOperation($(this).val(), $(this).text());
    } // END else statement
     // END mathematical operators click handler

  // click handler for "Crunch the Numbers" button
  $('#calculator').on('submit', function(e) {
    // prevent auto-refresh of the page
    e.preventDefault();
    // store numbers entered by the user and
    // the currently selected operator in an object
    var calculation = {
      x: x,
      y: y,
      type: operator
    };
    // send calculation to the server via postCalculate() function
    postCalculate(calculation);
  }); // END on.submit click handler
}

  function clearInput() {
  // click handler for "Clear" button
    // reset x, y, operator and symbol variables
    x = '';
    y = '';
    operator = undefined;
    symbol = undefined;
    // un-highlight any button that was selected
    $('button').removeClass('highlight');
    // empty both number inputs and any results that are displayed on the DOM
    $('.results').empty();
    $('.calculatorDisplay').empty();
  } // END of "Clear" button click handler

  function addNum () {
  // click handler for number buttons
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
  } // END number buttons click handler
  // END addEventListeners() function

// setter for operator & symbol
function setOperation(operand, mathOperator) {
  operator = operand;
  symbol = mathOperator;
}
// setter for x
function setx(num) {
  x = num;
}
// setter for y
function sety(num) {
  y = num;
}

function clearResults () {
    $('#historyList').empty();
  }
  
function deleteHistory () {
    clearInput();
    clearResults();
    
    $.ajax ({ 
      method: 'DELETE',
      url: '/delete-history'
    })
      .then (function (response) {
        console.log(response);
      });
  };
