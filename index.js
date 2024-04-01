let flag = false;
let displayTimer = document.getElementById("display-timer");
let hr = 0;
let min = 0;
let sec = 0;
let mili = 0;
let lapNO = 0;

//To Store last lap Time
let lapHr = 0;
let lapMin = 0;
let lapSec = 0;
let lapMili = 0;

function startTimer() {
  if (flag) {
    return;
  } else {
    flag = true;
    document.getElementById("lapButton").style.display = "block";
    document.getElementById("playButton").style.display = "none";
    document.getElementById("stopButton").style.display = "block";
    document.getElementById("resetButton").style.display = "block";
    timer();
  }
}

function lapTimer() {
  if (flag) {
    document.getElementById("laps-timer").style.display = "block";
    let node = document.createElement("div");
    let textNode = `
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

function stopTimer() {
  flag = false;
  document.getElementById("stopButton").style.display = "none";
  document.getElementById("playButton").style.display = "block";
}

function resetTimer() {
  flag = false;
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

function timer() {
  if (flag) {
    mili++;
    if (mili === 100) {
      sec++;
      mili = 0;
      if (sec === 60) {
        min++;
        sec = 0;
        if (min === 60) {
          hr++;
          min = 0;
        }
      }
    }
    const time = `${hr < 10 ? "0" + hr : hr}:${min < 10 ? "0" + min : min}:${
      sec < 10 ? "0" + sec : sec
    }:${mili < 10 ? "0" + mili : mili}`;
    displayTimer.innerText = time;
    setTimeout(timer, 10);
  }
}
