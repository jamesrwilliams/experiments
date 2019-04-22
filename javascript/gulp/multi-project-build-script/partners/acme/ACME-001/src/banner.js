"use strict";

console.log('Fired');

var deadline = new Date(2019, 3, 30, 18, 59, 0, 0);
initializeClock('countdown-clock', deadline);

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor(t / 1000 % 60);
  var minutes = Math.floor(t / 1000 / 60 % 60);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  var hours = Math.floor(t / (1000 * 60 * 60));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {

  var clock = document.getElementById(id); // const daysSpan = clock.querySelector('.clock-digit-days .clock-digit-value');

  var hoursSpan = clock.querySelector('.clock-digit-hours .clock-digit-value');
  var minutesSpan = clock.querySelector('.clock-digit-minutes .clock-digit-value');
  var secondsSpan = clock.querySelector('.clock-digit-seconds .clock-digit-value');

  function updateClock() {
    var t = getTimeRemaining(endtime); // daysSpan.innerHTML = ('0' + t.days).slice(-2);

    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    hoursSpan.innerHTML = t.hours > 100 ? t.hours : ('0' + t.hours).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}
