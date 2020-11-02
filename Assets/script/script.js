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
var currentDayEl =$('#currentDay')


var hoursList = [9,10,11,12,1,2,3,4,5];
var currentDay= moment();
var currentHour = moment().format("h");
currentDayEl.text(currentDay.format("dddd, MMMM Do YYYY"));
//this function creates, elements for each row in the schedule 

    for(var i =0; i < hoursList.length; i++){
       // console.log(hoursList);
        var row = $('<div>').addClass('row')//create each row
        timeBLock.append(row);//appendt o time block
        row.attr('data-index', hoursList[i]);
        console.log(row.attr('data-index'));
        var hourDivv = $('<div>').addClass('col-2 col-md-1 hour');
        if(i < 3){
            hourDivv.text(hoursList[i]+'AM');
            hourDiv.attr('data-index', hoursList[i]);
        }
        else{
            hourDivv.text(hoursList[i]+'PM');
            hourDiv.attr('data-index', hoursList[i]);
        }
        var textArea = $('<textarea>').addClass('col-8 col-md-10 description').attr('data-index', hoursList[i]);
        var saveBtn = $('<button>').addClass('col-2 col-md-1 saveBtn').attr('data-index', hoursList[i]);
        var icon = $('<img>').attr('src', 'Assets/images/save.png');
        row.append(hourDivv, textArea, saveBtn);
        saveBtn.append(icon);
        console.log(saveBtn);
    }

    timeBLock.on('click', '.saveBtn', savaInfo);
    
    function savaInfo(event){
        console.log();
        var index = $(event.target).attr('data-index');//grab button dataindex and call a function to save text content matching data -index
        console.log(index);
        // switch(index){
        //     case 9:
        //         //savedata(index);
        //         console.log(index);
        //     case 10:
        //         //savedata(index);
        //         console.log(index);
        //     case 11:
        //         //savedata(index);
        //         console.log(index);
        //     case 12:
        //         //savedata(index);
        //         console.log(index);
        //     case 1:
        //         //savedata(index);
        //         console.log(index);
        //     case 2:
        //         //savedata(index);
        //         console.log(index);
        //     case 3:
        //         //savedata(index);
        //         console.log(index);
        //     case 4:
        //         //savedata(index);
        //         console.log(index);
        //     case 5:
        //         //savedata(index);
        //         console.log(index);
        // }
}