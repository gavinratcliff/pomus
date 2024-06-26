const TIMER_PAUSED = 0;
const TIMER_RUNNING = 1;

const STATE_WORK = 0;
const STATE_BREAK = 1;

var state = STATE_WORK;
var timer_state = TIMER_PAUSED;

const timerElement = document.getElementById('timer');
const stopButton = document.getElementById('stopButton');
const label = document.getElementById('label');

const work_minutes = 1;
const break_minutes = 1;

var beep = new Audio('beep.mp3');
var click = new Audio('click.wav');

const seconds_per_minute = 3;

var timerInterval = null;

var minutes = work_minutes;  // Set the number of minutes for the timer
var timeRemaining = minutes * seconds_per_minute;  // Convert minutes to seconds

function updateText() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function switchStates() {
    if (state == STATE_WORK) {
        state = STATE_BREAK;
        stopButton.style["background-color"] = "green";
        minutes = break_minutes;
        label.innerText = 'break';


    } else {
        state = STATE_WORK;
        minutes = work_minutes;
        label.innerText = 'work';
    }

    pauseTimer();
    timeRemaining = minutes * seconds_per_minute;  // Convert minutes to seconds
    updateText();
    timeRemaining--;
}

function updateTimer() {
    updateText();
    
    if (timeRemaining > 0) {
        timeRemaining--;
    } else {
        window.electronAPI.timerDone();
        beep.play();
//        window.electronAPI.timerDone();

        switchStates();
    }
}

function clickTimer() {
    click.currentTime = 0;
    click.play();
    if (timer_state == TIMER_RUNNING) {
        pauseTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    timer_state = TIMER_RUNNING;

    timerInterval = setInterval(updateTimer, 1000);

    stopButton.style["background-color"] = "red";
    stopButton.innerText = "stop";
}

function pauseTimer() {
    timer_state = TIMER_PAUSED;

    clearInterval(timerInterval);

    stopButton.innerText = "start";
    stopButton.style["background-color"] = "green";
}

document.addEventListener('DOMContentLoaded', (event) => {
    stopButton.addEventListener('click', clickTimer);
    startTimer();

    updateTimer();  // Initial call to display the timer immediately
});
