//create elements variables
let row;
let hourDiv;
let textArea;
let saveBtn;
let icon;
const timeBLock = $('.time-block');
const currentDayEl =$('#currentDay');


const currentDay= moment();

let textAreaList = [];
let textAreaValue = [];

//display current day in jumbotron
currentDayEl.text(currentDay.format("dddd, MMMM Do YYYY"));

//this function creates, elements for each row in the schedule 
createElements = () =>{
    let armyTime = 9;
    const hoursList = [9,10,11,12,1,2,3,4,5];
    const dataWords= ["zero","one","two","three","four","five","six","seven","eight","nine"];
for(let i =0; i < hoursList.length; i++){

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

function savaInfo  (event){
        event.preventDefault();
        //get value of text and id to be store later
        const string = $(this).parent().children().eq(1).val();
        const textareaId = $(this).parent().children().eq(1).attr('id');
        //console.log(event.target);
        //console.log(this);
        // var currentHour = formatTime();
        const checkIfPresent = parseInt($(event.target).attr('data-hour'));

        //check with user if they have enough time to schedule a meeting
        if(currentHour() == checkIfPresent ){
            if(!confirm("Are you sure you want to Schedule a task with an hour or less left?")){return};  
        }
        //make sure user saves something
        if(string == ""){
            return;
        }

        //call function to save data to local storage
        setData(string, textareaId);  
}

//set data to JSON
setData = (string, iD) =>{
    //check if text value  is not empty
    if(localStorage.getItem('textValue') !== null) {
        textAreaValue = getJsonData();
    }

    //push new data after getting textValue from local storage
    textAreaValue.push({textareaId:iD, savedText:string});

    //set data to JSON
    localStorage.setItem("textValue", JSON.stringify(textAreaValue));
}

renderData = () =>{
    //this function render the data back to the browser 
    //by finding matching id of text area and store key then I store the data in to the textarea
    const arrayJSON = getJsonData();

    if (!arrayJSON) {
        return;//return iff JSON array is empty
    }
    for(let i = 0; i < arrayJSON.length;i++){//I don't know how I thought of this, but Im glad i did makes me proud
        $('#'+arrayJSON[i].textareaId).text(arrayJSON[i].savedText);//target text area by id
    }               
}

///set style to text area according to time
checkTime = () =>{
    const hoursList = [9,10,11,12,1,2,3,4,5];
    for(let i = 0; i < hoursList.length; i++){
        //var currentHour = currentHour();
        const textAreaHour = parseInt(textAreaList[i].attr('data-index'));

        if(textAreaHour < currentHour()){//check if hour is less then change class to past,and disable textArea
            trueFunction(textAreaList[i], 'past');
        }
        else if(textAreaHour == currentHour()){//check if hour is the same and change class to present 
            falseFunction(textAreaList[i], 'present');
        }
        else if(textAreaHour > currentHour()){//check if hour is greater then current hour then change class to future and make textarea available
            falseFunction(textAreaList[i], 'future');
        }
        if(currentHour() >= 18){localStorage.removeItem("textValue");}
    }
}

///set text area and sibling button to able
falseFunction = (textArea, className) =>{
    textArea.addClass(className);
    textArea.prop('disabled', false);
    textArea.siblings().eq(1).prop('disabled', false);
}

///set text area and sibling button to disabled
trueFunction = (textArea, className) =>{
    textArea.addClass(className);
    textArea.prop('disabled', true);
    textArea.siblings().eq(1).prop('disabled', true);
}

///gets Json data 
getJsonData = () => JSON.parse( localStorage.getItem( "textValue" ) ); 

//sets time to int format to check on if statements
currentHour = () => parseInt(moment().format("H"));


//formats the the text from Am to Pm
formatTime = (formatAmPm, num) =>{
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