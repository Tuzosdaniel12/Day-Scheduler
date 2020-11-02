// <div  class="row">
// <div class="col-1 hour">9AM</div>
// <textarea class="col description"></textarea>
// <button class="col-1 saveBtn"><img src="Assets/images/save.png"></button>
// </div>
// </div>

//create elements variables
var timeBLock = $('.time-block');
var currentDayEl =$('#currentDay')


var hoursList = [9,10,11,12,1,2,3,4,5];
var dataWords= ["zero","one","two","three","four","five","six","seven","eight","nine"];
var currentDay= moment();
var currentHour = moment().format("h");
currentDayEl.text(currentDay.format("dddd, MMMM Do YYYY"));
var schedule = []
var armyTime = 12;
//this function creates, elements for each row in the schedule 

    for(var i =0; i < hoursList.length; i++){
       // console.log(hoursList);
        var row = $('<div>').addClass('row').attr('data-index',i);//create each row
        timeBLock.append(row);//appendt o time block
        row.attr('data-index', hoursList[i]);
        //console.log(row.attr('data-index'));
        var hourDiv = $('<div>').addClass('col-2 col-md-1 hour');
        var textArea = $('<textarea>').addClass('col-8 col-md-10 description').attr('id',dataWords[i]);
        var saveBtn = $('<button>').addClass('col-2 col-md-1 saveBtn').attr('data-index', i);
        var icon = $('<img>').attr('src', 'Assets/images/save.png').attr('data-index', i);
        if(i < 3){//formats the the text from Am to Pm
            hourDiv.text(hoursList[i]+'AM');
            hourDiv.attr('data-index', hoursList[i]);
        }
        else{
            hourDiv.text(hoursList[i]+'PM');
            hourDiv.attr('data-index', armyTime);
            armyTime++;
        }
        
        console.log(hourDiv.attr('data-index'));
        row.append(hourDiv, textArea, saveBtn);
        saveBtn.append(icon);
        //console.log(saveBtn);
    }

    
    
    function savaInfo(event){
        event.preventDefault();
        console.log();
        var index =parseInt( $(event.target).attr('data-index'));//grab button dataindex and call a function to save text content matching data -index
        console.log(index);
        switch(index){
            case 0:
                var string = $(event.target.parentElement.children[1]).val();
                saveData(index, string);
                console.log(string);
                break;
            case 1:
                var string = $(event.target.parentElement.children[1]).val();
                saveData(index, string);
                console.log(string);
                break;
            case 2:
                var string = $(event.target.parentElement.children[1]).val();
                saveData(index, string);
                console.log(string);
                break;
            case 3:
                var string = $(event.target.parentElement.children[1]).val();
                saveData(index, string);
                console.log(string);
                break;
            case 4:
                var string = $(event.target.parentElement.children[1]).val();
                saveData(index, string);
                console.log(string);
                break;
            case 5:
                var string = $(event.target.parentElement.children[1]).val();
                saveData(index, string);
                console.log(string);
                break;
            case 6:
                var string = $(event.target.parentElement.children[1]).val();
                saveData(index, string);
                console.log(string);
                break;
            case 7:
                var string = $(event.target.parentElement.children[1]).val();
                saveData(index, string);
                console.log(string);
                break;
            case 8:
                var string = $(event.target.parentElement.children[1]).val();
                saveData(index, string);
                console.log(string);
                break;
        }
}
function saveData(index, string){
    var schedule = [" "," "," "," "," "," "," "," "," "];
    console.log(schedule.length);
    
    if(JSON.parse(localStorage.getItem("schedule")) === undefined){
        schedule[index] = string;
    }
    else{
        schedule = JSON.parse(localStorage.getItem("schedule"));
    }
    schedule[index] = string;
    localStorage.setItem("schedule", JSON.stringify(schedule));
    schedule = JSON.parse(localStorage.getItem("schedule"));

    for(var i =0; i < schedule.length; i++){
        timeBLock.children().eq(i).children().eq(1).text(schedule[i]);
    }
}

timeBLock.on('click', '.saveBtn', savaInfo);///delagate funtion for all save buttons