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

//display current day in jumbotron
currentDayEl.text(currentDay.format("dddd, MMMM Do YYYY"));

//this function creates, elements for each row in the schedule 
function createElements(){
for(var i =0; i < hoursList.length; i++){

    row = $('<div>').addClass('row').attr('data-index',i);//create each row

    timeBLock.append(row);//append o time block

    hourDiv = $('<div>').addClass('col-2 col-md-1 hour');//create time dive and set style
    textArea = $('<textarea>').addClass('col-8 col-md-10 description').attr('id',dataWords[i]);//create text area and set style and attributes
    saveBtn = $('<button>').addClass('col-2 col-md-1 saveBtn').attr('data-index', i);//create save button
    icon = $('<i>').addClass('fas fa-save');//create icon

    hourDiv.text(formatTime(hoursList[i], i));//format time to am or pm
  
    //setting special data to each element
    textArea.attr('data-index', armyTime);
    saveBtn.attr('data-hour',armyTime); 
    icon.attr('data-hour',armyTime); 
    armyTime++;

    //append all children
    row.append(hourDiv, textArea, saveBtn);
    saveBtn.append(icon);

    //create this array so later i can target each text area according to time
    textAreaList[i] = $("#"+dataWords[i]); 

    }
}

function savaInfo(event){
        event.preventDefault();
        //get value of text and id to be store later
        var string = $(event.target).parent().children().eq(1).val();
        var textareaId = $(event.target).parent().children().eq(1).attr('id');

        // var currentHour = formatTime();
        var checkIfPresent = parseInt($(event.target).attr('data-hour'));

        //check with user if they have enough time to schedule a meeting
        if(currentHour() == checkIfPresent ){
            if(!confirm("Are you sure you want to Schedule a task with an hour or less left?")){return};  
        }

        //if they hit icon travel up from icon and id and value 
        if(textareaId === undefined && string === undefined){

            string = $(event.target).parent().parent().children().eq(1).val();
            textareaId = $(event.target).parent().parent().children().eq(1).attr('id');   

        }

        //check if user is saving anything, I could do this on start of function 
        //but need to check that is no empty because they hit the icon
        if(string == ""){
            return;
        }

        //call function to save data to local storage
        setData(string, textareaId);  
}

//set data to JSON
function setData(string, iD){
    if(localStorage.getItem('textValue') !== null) {
        textAreaValue = getJsonData();
    }

    textAreaValue.push({textareaId:iD, savedText:string});

    localStorage.setItem("textValue", JSON.stringify(textAreaValue));
}

function renderData(){
    //this function render the data back to the browser 
    //by finding matching id of text area and store key then I store the data in to the textarea
    var arrayJSON = getJsonData();

    if (!arrayJSON) {
        return;//return iff JSON array is empty
    }
    for(var i = 0; i < arrayJSON.length;i++){//I don't know how I thought of this, but Im glad i did makes me proud
        $('#'+arrayJSON[i].textareaId).text(arrayJSON[i].savedText);//target text area by id
    }               
}

///set style to text area according to time
function checkTime(){
    for(var i = 0; i < hoursList.length; i++){
        //var currentHour = currentHour();
        var textAreaHour = parseInt(textAreaList[i].attr('data-index'));

        if(textAreaHour < currentHour()){//check if hour is less then change class to past,and disable textArea
            trueFunction(textAreaList[i], 'past');
        }
        else if(textAreaHour == currentHour()){//check if hour is the same and change class to present 
            falseFunction(textAreaList[i], 'present');
        }
        else if(textAreaHour > currentHour()){//check if hour is greater then current hour then change class to future and make textarea available
            falseFunction(textAreaList[i], 'future');
        }
    }
}

///set text area and sibling button to able
function falseFunction(textArea, className){
    textArea.addClass(className);
    textArea.prop('disabled', false);
    textArea.siblings().eq(1).prop('disabled', false);
}

///set text area and sibling button to disabled
function trueFunction(textArea, className){
    textArea.addClass(className);
    textArea.prop('disabled', true);
    textArea.siblings().eq(1).prop('disabled', true);
}

///gets Json data 
function getJsonData(){
    return JSON.parse(localStorage.getItem("textValue"));
} 

//sets time to int format to check on if statements
function currentHour(){
    return parseInt(moment().format("H"));
}

//formats the the text from Am to Pm
function formatTime(formatAmPm, num){
    if(num < 3){
        return formatAmPm+'AM';
    }
    else{
         return formatAmPm +'PM' ;
    }
}

createElements();
checkTime();
renderData();
timeBLock.on('click', '.saveBtn', savaInfo);//delegate function for all save buttons