const displayTimer = document.getElementById("display-timer");
let isRunning = false;
let hr = 0;
let min = 0;
let sec = 0;
let mili = 0;
let timerRef = null;
let startTime = 0;
let timeDifference = 0;
let lapTimes = [];

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
  lapTimes = [];
  displayTimer.innerText = "00:00:00:00";
  hr = 0;
  min = 0;
  sec = 0;
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

  //store in display variable to time format
  const display = formatTime(timeDifference);

  //show Timer on Webpages
  displayTimer.innerText = display;
}

//This function for time laps after click laps BUtton
function lapClick() {
  if (isRunning) {
    document.getElementById("laps-timer").style.display = "block";
    let elapsedTime = Date.now() - startTime;
    let lapTime = formatTime(elapsedTime);
    let lapIndex = lapTimes.length + 1;
    let previousLapTime =
      lapTimes.length > 0 ? lapTimes[lapTimes.length - 1].time : 0;
    let lapDuration = elapsedTime - previousLapTime;

    lapTimes.push({ time: elapsedTime, duration: lapDuration });
    const textNode = `
  <div class="laps-row">
  <p class="lap-no">${lapIndex}</p>
  <p class="lap-no">+${formatTime(lapDuration)}</p>
  <p class="total">${lapTime}</p>
</div>`;
    document
      .getElementById("laps-timer")
      .insertAdjacentHTML("beforeend", textNode);
  }
}

//To manage zero for single zero
const formatWithLeadingZero = (number) => {
  if (number < 10) return "0" + number;
  else return number;
};

//Convert milliseconds to hour , min ,sec ,milisec
function formatTime(milliseconds) {
  let hours = Math.floor(milliseconds / 3600000);
  let minutes = Math.floor((milliseconds % 3600000) / 60000);
  let seconds = Math.floor((milliseconds % 60000) / 1000);
  let millis = Math.floor((milliseconds % 1000) / 10);
  return `${formatWithLeadingZero(hours)}:${formatWithLeadingZero(
    minutes
  )}:${formatWithLeadingZero(seconds)}:${formatWithLeadingZero(millis)}`;
}
