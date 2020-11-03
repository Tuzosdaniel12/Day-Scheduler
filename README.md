# Day-Scheduler
* [Task](#Task)
* [User Story](#User-Story)
* [Acceptance Criteria](#Acceptance-Criteria)
* [Process](#Process)
* [Work Examples](#Work-Examples)
* [Links](#Links)

## Task
 * For this task the user wants a day planner app to help them plan there busy day

 * User Expectation
 ![CODE](https://github.com/Tuzosdaniel12/Day-Scheduler/blob/main/Assets/images/05-third-party-apis-homework-demo.gif)

## User-Story

Implement the following user story:

```
AS AN employee with a busy schedule
I WANT to add important events to a daily planner
SO THAT I can manage my time effectively
```

## Acceptance-Criteria

Aim to meet the following acceptance criteria:

```
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist
```
## Process
* Used Bootstrap to style the app form
* I used index html and lay out Bootstrap to see what would be the elements I dynamically needed to create with Jquery
* On script I created every element and added all necessary classes and id that I had planed before
* Used provided Css to add extra style to app
* After every element was created I focus on the saved event to save all the data
* I used data attributes and id to target specific textarea, to get the values and store the value back again, this helped a lot because I didn't know in what order the user was going to save the data 
* Last step was to dynamically change the back ground color of the text area by checking time
* When past then grey, present then red, future then green.
* Also added a extra future that disables text area and button if time has past
## Work-Examples
![CODE](https://github.com/Tuzosdaniel12/Day-Scheduler/blob/main/Assets/images/code-1.png)
![CODE](https://github.com/Tuzosdaniel12/Day-Scheduler/blob/main/Assets/images/code-2.png)
![CODE](https://github.com/Tuzosdaniel12/Day-Scheduler/blob/main/Assets/images/code-3.png)
![CODE](https://github.com/Tuzosdaniel12/Day-Scheduler/blob/main/Assets/images/code-4.png)
![CODE](https://github.com/Tuzosdaniel12/Day-Scheduler/blob/main/Assets/images/code-5.png)
## Links
* Live Website
    * https://tuzosdaniel12.github.io/Day-Scheduler/.

* Repo
    * https://github.com/Tuzosdaniel12/Day-Scheduler
