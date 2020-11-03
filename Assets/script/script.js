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
//var textAreaValue = [];
var armyTime = 12;


//display current day in jumbotron
currentDayEl.text(currentDay.format("dddd, MMMM Do YYYY"));


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
        if(i < 3){//formats the the text from Am to Pm
            hourDiv.text(hoursList[i]+'AM');
            textArea.attr('data-index',hoursList[i] + ":00");
            
        }
        else{
            hourDiv.text(hoursList[i]+'PM');
            textArea.attr('data-index', hoursList[i] + ":00");
            armyTime++;
        }
        //console.log(textArea.attr('id'));
        row.append(hourDiv, textArea, saveBtn);
        saveBtn.text('SAVE');
        console.log(textArea.attr('data-index'));
        //console.log(saveBtn);
    }

    function savaInfo(event){
        event.preventDefault();
        event.stopPropagation();
        console.log();
        var index =parseInt( $(event.target).attr('data-index'));//grab button dataindex and call a function to save text content matching data -index
        //console.log(index);
         
        var string = $(event.target.parentElement.children[1]).val();
        var textareaId = $(event.target.parentElement.children[1]).attr('id');
        console.log(string, textareaId);

        var textAreaValue = [];
        //textAreaValue.push({textareaId:textareaId, savedText:string});
        if (JSON.parse(localStorage.getItem("array"))=== undefined){
            textAreaValue = [{textareaId:textareaId, savedText:string}];
            console.log(textAreaValue);

        }
        else{
            textAreaValue = JSON.parse(localStorage.getItem("array")); 
        }

        textAreaValue.concat({textareaId:textareaId, savedText:string});
        localStorage.setItem("array", JSON.stringify(textAreaValue));
        console.log(textAreaValue);
        textAreaValue = JSON.parse(localStorage.getItem("array"));  
        // $(event.target.parentElement.children[1]).text(textAreaValue.savedText);
}




function renderData(){
    var arrayJSON = JSON.parse(localStorage.getItem("array"));
    for(var i = 0; i < arrayJSON.length;i++){
        console.log(arrayJSON[i].textareaId);
        switch(arrayJSON[i].textareaId){   
            case "zero":
                $('zero').text(arrayJSON[i].savedText);
                break;
            case "one":
                $('one').text(arrayJSON[i].savedText);
                break;
            case "two":
                $('two').text(arrayJSON[i].savedText);
                break;
            case "three":
                $('three').text(arrayJSON[i].savedText);
                break; 
            case "four":
                $('four').text(arrayJSON[i].savedText);
                break;
            case "five":
                $('five').text(arrayJSON[i].savedText);
                break;
            case "six":
                $('six').text(arrayJSON[i].savedText);
                break;
            case "seven":
                $('seven').text(arrayJSON[i].savedText);
                break;
            case "eight":
                $('eight').text(arrayJSON[i].savedText);
                break;   
        }
    }
}


timeBLock.on('click', '.saveBtn', savaInfo);//delagate funtion for all save buttons