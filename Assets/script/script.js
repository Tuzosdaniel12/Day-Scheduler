// <div  class="row">
// <div class="col-1 hour">9AM</div>
// <textarea class="col description"></textarea>
// <button class="col-1 saveBtn"><img src="Assets/images/save.png"></button>
// </div>
// </div>

//create elements variables
var timeBLock = $('.time-block');

var rowDiv = $('.row');
var hourDiv = $('.hour');
var descriptionTextareaEl = $('.description');
var saveBtnEl = $('.saveBtn');
var currentDay =$('#currentDay')


var hoursList = [9,10,11,12,1,2,3,4,5];



for(var i =0; i < hoursList.length; i++){
    console.log(hoursList);
    var row = $('<div>').addClass('row')

    timeBLock.append(row);
    var hourDivv = $('<div>').addClass('col-1 hour');
    if(i < 3){
        hourDivv.text(hoursList[i]+'AM');
    }
    else{
        hourDivv.text(hoursList[i]+'PM');
    }
    var textArea = $('<textarea>').addClass('col description');
    var saveBtn = $('<button>').addClass('col-1 saveBtn');
    var icon = $('<img>').attr('src', 'Assets/images/save.png');
    row.append(hourDivv, textArea, saveBtn);
    saveBtn.append(icon);
    row.attr('data-index', hoursList[1]);
    console.log();
}
