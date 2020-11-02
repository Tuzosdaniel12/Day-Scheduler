// <div  class="row">
// <div class="col-1 hour">9AM</div>
// <textarea class="col description"></textarea>
// <button class="col-1 saveBtn"><img src="Assets/images/save.png"></button>
// </div>
// </div>

//create elements variables
var timeBLock = $('.time-block');
var currentDayEl =$('#currentDay')

var textAreaElList = [];
var hoursList = [9,10,11,12,1,2,3,4,5];
var dataWords= ["zero","one","two","three","four","five","six","seven","eight","nine"];
var currentDay= moment();
var currentHour = moment().format("h");
currentDayEl.text(currentDay.format("dddd, MMMM Do YYYY"));
var textAreaValue = [];
var armyTime = 12;
var row;
var hourDiv;
var textArea;
var saveBtn;
var icon;

createElements();
renderData();

//this function creates, elements for each row in the schedule 
function createElements(){
    for(var i =0; i < hoursList.length; i++){
       // console.log(hoursList);
        row = $('<div>').addClass('row').attr('data-index',i);//create each row
        timeBLock.append(row);//appendt o time block
        row.attr('data-index', hoursList[i]);
        //console.log(row.attr('data-index'));
        hourDiv = $('<div>').addClass('col-2 col-md-1 hour');
        textArea = $('<textarea>').addClass('col-8 col-md-10 description').attr('id',dataWords[i]);
        saveBtn = $('<button>').addClass('col-2 col-md-1 saveBtn').attr('data-index', i);
        icon = $('<img>').attr('src', 'Assets/images/save.png').attr('data-index', i);
        if(i < 3){//formats the the text from Am to Pm
            hourDiv.text(hoursList[i]+'AM');
            hourDiv.attr('data-index', hoursList[i]);
        }
        else{
            hourDiv.text(hoursList[i]+'PM');
            hourDiv.attr('data-index', armyTime);
            armyTime++;
        }
        //console.log(textArea.attr('id'));
        row.append(hourDiv, textArea, saveBtn);
        saveBtn.append(icon);
        textAreaElList.push({textAreaEl : $('#'+dataWords[i])}); 
        //console.log(saveBtn);
    }
}
    function savaInfo(event){
        event.preventDefault();
        console.log();
        var index =parseInt( $(event.target).attr('data-index'));//grab button dataindex and call a function to save text content matching data -index
        console.log(index);
        //when they hit the save button they will send the right text box text to save to local storage

        var string = $(event.target.parentElement.children[1]).val();
        var textareaId = textAreaElList[index].textAreaEl.attr('id');
        textAreaValue.push({textareaId:textareaId, savedText:string})
        textAreaValue = saveData(textAreaValue);
        
        console.log(textAreaValue);
}

function saveData(array){///this function takes the id of text area and the text that was saved and is stored in array of objects so latter i can fetch it from local storage
    localStorage.setItem("array", JSON.stringify(array));
    return array;
}


function renderData(){
    var array = JSON.parse(localStorage.getItem("array"));
    for(var i = 0; i < array.length;i++){
        switch(array[i].textareaId){
            case "zero":
                textAreaElList[0].textAreaEl.innerHTML = array[i].savedText;
                //console.log(array[i].savedText);
                //console.log(textAreaElList[0].textAreaEl.val());
                break;
            case "one":
                textAreaElList[1].textAreaEl.innerHTML = array[i].savedText;
                break;
            case "two":
                textAreaElList[2].textAreaEl.innerHTML = array[i].savedText;
                break;
            case "three":
                textAreaElList[3].textAreaEl.innerHTML = array[i].savedText;
                break; 
            case "four":
                textAreaElList[4].textAreaEl.innerHTML = array[i].savedText;
                break;
            case "five":
                textAreaElList[5].textAreaEl.innerHTML = array[i].savedText;
                break;
            case "six":
                textAreaElList[6].textAreaEl.innerHTML = array[i].savedText;
                break;
            case "seven":
                textAreaElList[7].textAreaEl.innerHTML = array[i].savedText;
                break;
            case "eight":
                textAreaElList[8].textAreaEl.innerHTML = array[i].savedText;
                break;   
        }
    }
}

timeBLock.on('click', '.saveBtn', savaInfo);//delagate funtion for all save buttons