console.log('client.js has been loaded');

$(document).ready(onReady);

function onReady() {
    console.log('JQuery is ready');
    $('#addButton').on('click', addNew);
    $('#subtractButton').on('click', addNew);
    $('#multiplyButton').on('click', addNew);
    $('#divideButton').on('click', addNew);
    $('#clearButton').on('click', clearHistory);
}

function clearHistory() {
    $.ajax({
        type: 'GET',
        url: '/objects'
    })
        .then(function (response) {
            console.log(response);
            $('#historyList').children().remove();
        });
}

function getAllHistory() {
    $.ajax({
        type: 'GET',
        url: '/objects'
    })
        .then(function (response) {
            console.log(response);
            $('#historyList').empty();
            response.forEach(function (response) {
                $('#historyList').prepend(`<li>${response}</li>`);
            });
        });
}

function addNew() {
    const newObject = {
        x: $('#firstNumber').val(),
        y: $('#secondNumber').val(),
        type: $(this).closest("button").val()
    }
    console.log(newObject);
    $.ajax({
        method: 'POST',
        url: '/add-object',
        data: newObject
    })
        .then(function (response) {
            console.log(response);
            getAllHistory();
        });
}