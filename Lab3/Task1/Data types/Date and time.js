//1
let d1 = new Date(2012, 1, 20, 3, 12);
alert( d1 );

//2
function getWeekDay(date) {
  let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  return days[date.getDay()];
}

let date = new Date(2014, 0, 3);
alert( getWeekDay(date) );

//3

function getLocalDay(date) {

  let day = date.getDay();

  if (day == 0) {
    day = 7;
  }

  return day;
}

let date3 = new Date(2012, 0, 3);
alert( getLocalDay(date3) );

//5

function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

alert( getLastDayOfMonth(2012, 0) ); 
alert( getLastDayOfMonth(2012, 1) ); 
alert( getLastDayOfMonth(2013, 1) );
