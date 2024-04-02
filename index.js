const displayTimer = document.getElementById("display-timer");
let isRunning = false;
let hr = 0;
let min = 0;
let sec = 0;
let mili = 0;
let lapNO = 0;
let timerRef = null;
let startTime = 0;
let timeDifference = 0;

//To Store last lap Time
let lapHr = 0;
let lapMin = 0;
let lapSec = 0;
let lapMili = 0;

//start timer after click start button
function startTimer() {
  if (!isRunning) {
    //Get Current time
    startTime = Date.now() - timeDifference;
    isRunning = true;
    document.getElementById("lapButton").style.display = "block";
    document.getElementById("playButton").style.display = "none";
    document.getElementById("stopButton").style.display = "block";
    document.getElementById("resetButton").style.display = "block";

    //add setInterval to update Our timer
    timerRef = setInterval(timer, 10);
  }
}

//This function for time laps after click laps BUtton
function lapTimer() {
  if (isRunning) {
    //When laps button created then laps display block
    document.getElementById("laps-timer").style.display = "block";

    //add laps by serially and lap gap and total laps
    const textNode = `
    <div class="laps-row">
    <p class="lap-no">${lapNO < 9 ? "0" + ++lapNO : ++lapNO}</p>
    <p class="lap-no">+${hr - lapHr < 10 ? "0" + (hr - lapHr) : hr - lapHr}:${
      min - lapMin < 10 ? "0" + (min - lapMin) : min - lapMin
    }:${sec - lapSec < 10 ? "0" + (sec - lapSec) : sec - lapSec}:${
      mili - lapMili < 10 ? "0" + (mili - lapMili) : mili - lapMili
    }</p>
    <p class="total">${hr < 10 ? "0" + hr : hr}:${min < 10 ? "0" + min : min}:${
      sec < 10 ? "0" + sec : sec
    }:${mili < 10 ? "0" + mili : mili}</p>
  </div>`;
    lapHr = hr;
    lapMin = min;
    lapSec = sec;
    document
      .getElementById("laps-timer")
      .insertAdjacentHTML("beforeend", textNode);
  }
}

//StopTimer invoke after click of stop button
function stopTimer() {
  //If Timer is Running true then it is stop otherwise  we do nothing
  if (isRunning) {
    //Calculate timeDiffrece how long our timer Running.
    timeDifference = Date.now() - startTime;
    clearInterval(timerRef);
    isRunning = false;
    document.getElementById("stopButton").style.display = "none";
    document.getElementById("playButton").style.display = "block";
  }
}

//Reset Timer invoke after click Reset Button we reset all the things hide stop ,laps, and reset button and show Start button
function resetTimer() {
  clearInterval(timerRef);
  isRunning = false;
  startTime = 0;
  timeDifference = 0;
  displayTimer.innerText = "00:00:00:00";
  hr = 0;
  min = 0;
  sec = 0;
  lapNO = 0;
  document.getElementById("laps-timer").style.display = "none";
  document.getElementById("laps-timer").innerHTML = ` <div class="laps-row">
  <p class="lap-no">Lap</p>
  <p class="lap-no laptime">Lap Time</p>
  <p class="total">Total</p>
</div>`;
  document.getElementById("lapButton").style.display = "none";
  document.getElementById("stopButton").style.display = "none";
  document.getElementById("playButton").style.display = "block";
  document.getElementById("resetButton").style.display = "none";
  lapHr = 0;
  lapMin = 0;
  lapSec = 0;
}

//Timer function update our timer after every 10 milisecond
function timer() {
  //Get current Time
  const current = Date.now();

  //Calculate time diffrence between current time and start time
  timeDifference = current - startTime;

  //Calculate hr, min, sec, mili from timeDiffrence
  hr = Math.floor(timeDifference / 3600000);
  min = Math.floor(timeDifference / 60000) % 60;
  sec = Math.floor(timeDifference / 1000) % 60;
  mili = Math.floor((timeDifference % 1000) / 10);

  //store in display variable to time format
  const display = `${hr < 10 ? "0" + hr : hr}:${min < 10 ? "0" + min : min}:${
    sec < 10 ? "0" + sec : sec
  }:${mili < 10 ? "0" + mili : mili}`;

  //show Timer on Webpages
  displayTimer.innerText = display;
}
