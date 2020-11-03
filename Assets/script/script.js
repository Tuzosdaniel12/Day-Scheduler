//create elements variables
var row;
var hourDiv;
var textArea;
var saveBtn;
var icon;
var timeBLock = $('.time-block');
var currentDayEl =$('#currentDay');

var hoursList = [9,10,11,12,1,2,3,4,5];
var dataWords= ["zero","one","two","three","four","five","six","seven","eight","nine"];
var currentDay= moment();
var armyTime = 9;
var textAreaList = [];
var textAreaValue = [];

//console.log(string, textareaId);
if(localStorage.getItem('textValue') !== null) {
    textAreaValue = JSON.parse(localStorage.getItem("textValue"));
    console.log(textAreaValue);
}

//display current day in jumbotron
currentDayEl.text(currentDay.format("dddd, MMMM Do YYYY"));

//this function creates, elements for each row in the schedule 
function createElements(){
for(var i =0; i < hoursList.length; i++){
    // console.log(hoursList);
    row = $('<div>').addClass('row').attr('data-index',i);//create each row
    timeBLock.append(row);//append o time block
    //row.attr('data-index', hoursList[i]);
    //console.log(row.attr('data-index'));
    hourDiv = $('<div>').addClass('col-2 col-md-1 hour');
    textArea = $('<textarea>').addClass('col-8 col-md-10 description').attr('id',dataWords[i]);
    saveBtn = $('<button>').addClass('col-2 col-md-1 saveBtn').attr('data-index', i);
    icon = $('<img>').attr('src', './Assets/images/save.png');

    if(i < 3){//formats the the text from Am to Pm
            hourDiv.text(hoursList[i]+'AM');//this just formats time
    }
    else{
            hourDiv.text(hoursList[i]+'PM');//format time
    }
    //setting special data to each element
    textArea.attr('data-index', armyTime);
    saveBtn.attr('data-hour',armyTime); 
    icon.attr('data-hour',armyTime); 
    armyTime++;
    //create this array so later i can target each text area accoring to time
    row.append(hourDiv, textArea, saveBtn);
    saveBtn.append(icon);

    textAreaList[i] = $("#"+dataWords[i]); 
    console.log( textAreaList[i].attr('data-index'));
    //console.log(textArea.attr('data-index'));
    //console.log(saveBtn);
    }
}

function savaInfo(event){
        event.preventDefault();
        event.stopPropagation();
        var string = $(event.target.parentElement.children[1]).val();
        var textareaId = $(event.target.parentElement.children[1]).attr('id');
        var currentHour = parseInt(moment().format("kk"));
        var checkIfPresent = parseInt($(event.target).attr('data-hour'));

        if(currentHour == checkIfPresent ){//check with user if they have enought time to schedule a meeting
            if(!confirm("Are you sure you want to Schedule a task with an hour or less left?")){return};  
        }
        
        // console.log('hit');
        //grab button id and value and send it to local storage

        if(textareaId === undefined && string === undefined){//when they click the icon send them one branch up to get the values
            //console.log(string, textareaId);
            string = $(event.target.parentElement.parentElement.children[1]).val();
            textareaId = $(event.target.parentElement.parentElement.children[1]).attr('id');
            ///console.log(string, textareaId);
        }
        if(string == ""){//check if user is saving anything
            return;
        }
        
        textAreaValue.push({textareaId:textareaId, savedText:string});
        console.log('second:' + textAreaValue);
        localStorage.setItem("textValue", JSON.stringify(textAreaValue));
        //console.log(textAreaValue);
}

function renderData(){
    //this function render the data back to the browser that once store during session 
    //by getting the data and storing the data on a array after 
    //loops around finds matching text box by using queryselector and inputs the data 
    var arrayJSON = JSON.parse(localStorage.getItem("textValue"));
    console.log('JSON: ' + arrayJSON);
    if (!arrayJSON) {
        return;//return iff JSON array is empty
    }
    for(var i = 0; i < arrayJSON.length;i++){
        $('#'+arrayJSON[i].textareaId).text(arrayJSON[i].savedText);//target text area by id
    }               
}


function checkTime(){
    for(var i = 0; i < hoursList.length; i++){
        var currentHour = parseInt(moment().format("kk"));
        var textAreaHour = parseInt(textAreaList[i].attr('data-index'));
        //console.log("CURRENT HOUR "+currentHour);
        //console.log("textAreaHour "+textAreaHour);
        if (currentHour == 24){currentHour = 0;}//had to add this because when is 12am it formats as 24 I thought it would had been 00;
        if(textAreaHour < currentHour){//check if hour is less then chage class to past,and disable textArea
            //console.log("hit");
            textAreaList[i].addClass('past');
            trueFunction(textAreaList[i]);
        }
        else if(textAreaHour == currentHour){//check if hour is the same and change class to pressent and disable text area
            textAreaList[i].addClass('present');
            falseFunction(textAreaList[i]);
        }
        else if(textAreaHour > currentHour){//check if hour is greater then current hour thenn change class to futureand make texarea avaliable
            textAreaList[i].addClass('future');
            falseFunction(textAreaList[i]);
        }
    }
}
///set text area and sibling button to able
function falseFunction(textArea){
    textArea.prop('disabled', false);
    textArea.siblings().eq(1).prop('disabled', false);
}
///set text area and sibling button to disabled
function trueFunction(textArea){
    textArea.prop('disabled', true);
    textArea.siblings().eq(1).prop('disabled', true);
}
createElements();
checkTime();
renderData();
timeBLock.on('click', '.saveBtn', savaInfo);//delagate funtion for all save buttons