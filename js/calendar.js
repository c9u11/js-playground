// Variable
var currentDate = new Date();
currentDate.setHours(0,0,0,0);
var settingDay = 0;
var settingColor = "sky";
var COLORS = ['lightsky','sky','blue','lightgray','gray','darkgray','white','black'];
var calendarList = {
  "Google" : "../simple.ics",
  "Default" : "../sample.ics",
};
var ICS = {};
var selectedDate = currentDate;

// prototype
Number.prototype.toMonth = function () {
  switch (this*1) {
    case 0:
      return "January"
    case 1:
      return "February"
    case 2:
      return "March"
    case 3:
      return "April"
    case 4:
      return "May"
    case 5:
      return "June"
    case 6:
      return "July"
    case 7:
      return "August"
    case 8:
      return "September"
    case 9:
      return "October"
    case 10:
      return "November"
    case 11:
      return "December"
    default:
      return "Unknown"
  }
}
Number.prototype.toDay = function () {
  switch (this * 1){
    case 0 :
      return "SUN"
    case 1 :
      return "MON"
    case 2 :
      return "TUE"
    case 3 :
      return "WED"
    case 4 :
      return "THU"
    case 5 :
      return "FRI"
    case 6 :
      return "SAT"
    default : 
      return "NAN"
  }
}
Date.prototype.toYYYYMMDDHHMISS = function(){
  return this.getFullYear() +
    pad2(this.getMonth() + 1) + 
    pad2(this.getDate()) +
    "T" +
    pad2(this.getHours()) +
    pad2(this.getMinutes()) +
    pad2(this.getSeconds());

  function pad2(n) {  // always returns a string
    return (n < 10 ? '0' : '') + n;
  }
}

// Init
refreshCalendar();
refreshTask();

// Event
document.getElementsByClassName("month")[0].onclick = function(event){
  var target = event.target.id || event.target.classList[0] || event.target.innerText;
  switch(target){
    case "prev":
      currentMonth = currentDate.getMonth();
      currentDate.setMonth(currentMonth-1)
      refreshCalendar();
      break;
    case "next":
      currentMonth = currentDate.getMonth();
      currentDate.setMonth(currentMonth+1)
      refreshCalendar();
      break;
  }
};
document.getElementById("days").onclick = function(event){
  var target = event.target.children[0] || event.target;
  var selectedElement = document.getElementsByClassName("selected")[0];
  if(selectedElement == target) return
  if(selectedElement){
    selectedElement.classList.remove("selected");
    selectedElement.classList.remove(`after-${settingColor}`);
  }
  target.classList.add("selected");
  selectedDate = new Date(target.getAttribute("value") * 1);
  refreshColor();
};

// Function
function refreshCalendar(newDate = new Date(currentDate.getTime())) {
  // Get Element
  var $year = document.getElementById("year");
  var $month = document.getElementById("month");
  var $week = document.getElementById("weekdays");
  var $days = document.getElementById("days");
  // Get Parameter
  var year = newDate.getFullYear();
  var month = newDate.getMonth();

  // Set Text
  $year.innerText = year + "";
  $month.innerText = month.toMonth();
  $week.innerHTML = refreshWeekdays();
  $days.innerHTML = refreshDays();

  // Set Color
  refreshColor();

  function refreshWeekdays(num = settingDay) {
    var weekdays = "";
    for(var i=num ; i<7+num ; i++){
      var day = (i>6 ? i-7 : i).toDay();
      weekdays += `<li>${day}</li>`
    }
    return weekdays
  }
  function refreshDays(num = settingDay) {
    var today = new Date();
    var days = "";
    var firstDay = getFistDay();
    var tempDate = new Date(currentDate.getTime());
    var offset = 1 + num - firstDay;
    if(offset > 1) offset = offset - 7;
    tempDate.setDate(offset);
    tempDate.setHours(0,0,0,0);

    for(var i=0 ; i<42 ; i++){
      var option = "";

      if( today.getFullYear() === tempDate.getFullYear() 
          && today.getMonth() === tempDate.getMonth()
          && today.getDate() === tempDate.getDate())
        option += "today ";

      if(currentDate.getMonth() !== tempDate.getMonth()) option += "diff ";

      if(tempDate.getDay() === 0) option += "weekend ";

      if(selectedDate.getTime() == tempDate.getTime()) option += "selected ";

      days += `<li><span class="${option}" value="${tempDate.getTime()}">${tempDate.getDate()}</span></li>`
      tempDate.setDate(tempDate.getDate() + 1);
    }
    return days

    function getFistDay(){
      var tempDate = new Date(currentDate.getTime());
      tempDate.setDate(1);
      return tempDate.getDay()
    }
  }
}
function refreshColor(color = settingColor){
  // Elements
  var $calHeader = document.getElementsByClassName("month")[0];
  var $today = document.getElementsByClassName("today")[0];
  var $selected = document.getElementsByClassName("selected")[0];
  var $task = document.getElementById("task");

  // Set Color
  if($calHeader) setColor($calHeader);
  if($today) setColor($today);
  if($selected) setAfterColor($selected);
  if($task) setColor($task);

  function setColor(element){
    COLORS.forEach(function(value){ element.classList.remove(value); });
    element.classList.add(color);
  }
  function setBgColor(element){
    COLORS.forEach(function(value){ element.classList.remove(`bg-${value}`); });
    element.classList.add(`bg-${color}`);
  }
  function setAfterColor(element){
    COLORS.forEach(function(value){ element.classList.remove(`after-${value}`); });
    element.classList.add(`after-${color}`);
  }
}
function refreshTask(list = calendarList){
  for(let site in list){
    new Promise(function(){
      ICS[site] = new ical_parser(list[site]);
      console.log(list[site]);
    })
  }
  console.log(ICS);
  function sleep(ms) {
    const wakeUpTime = Date.now() + ms
    while (Date.now() < wakeUpTime) {}
  }
}
function getTasks(date = selectedDate){
  for(var key in ICS){
    ICS[key].events.forEach(function(data){
      var start = data.DTSTART.getTime();
      var end = data.DTEND.getTime();
      if(start <= date && date <= end){
        console.log(data);
      }
      else{
        console.log(false);
      }
    })
  }
}
