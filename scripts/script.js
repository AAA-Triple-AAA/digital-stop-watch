// Image Information
let imageIndex = 0;
const imageArray = [
    "../images/mountain-climbing.jpg",
    "../images/track-and-field.jpg",
];
const bgImage = document.querySelector(".bg-img");

// Target buttons
const startStop = document.querySelector("#start-stop-button");
const splitButton = document.querySelector("#split-button");
const resetButton = document.querySelector("#reset-button");
const changeBGButton = document.querySelector("#change-bg");

// Target individual clock elements
const milliText = document.querySelector("#m-secs");
const secondsText = document.querySelector("#sec");
const minsText = document.querySelector("#min");
const hoursText = document.querySelector("#hour");

// Split Interval List
const timeContainer = document.querySelector(".times-container");
const timesList = document.querySelector(".times");
const clearTimesButton = document.querySelector(".clear-button");

// Time variables
let startTime;
let elapsedTime = 0;
let minuteCount = 0;
let hourCount = 0;
let firstRun = true;
let isRunning = false;
let stopWatchInterval;
let lastSnapshot;

// Event Functions
function startStopwatch(e) {
    if (e.target.textContent === "STOP") {
        stopStopwatch();
        elapsedTime = new Date().getTime() - startTime + elapsedTime;
        isRunning = false;
        e.target.textContent = "START";
        e.target.style = "background-color: green;";
    } else {
        e.target.textContent = "STOP";
        e.target.style.backgroundColor = "red";
        startTime = new Date().getTime();
        if (firstRun) {
            lastSnapshot = startTime;
        }
        isRunning = true;
        firstRun = false;
        stopWatchInterval = setInterval(updateStopwatch, 1);
    }
}

function stopStopwatch() {
    clearInterval(stopWatchInterval);
}

function updateStopwatch() {
    let getMilli = milliseconds();

    // Display milliseconds
    let milli = "" + getMilli;
    milli = milli.slice(-3);
    milliText.textContent = milli;

    // Display seconds
    let seconds = "" + Math.floor(getMilli / 1000) - minuteCount * 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    secondsText.textContent = seconds;

    let minutes = "" + Math.floor(getMilli / 60000) - hourCount * 60;
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    minsText.textContent = minutes;

    let hours = "" + Math.floor(getMilli / 3600000);
    if (hours < 10) {
        hours = "0" + hours;
    }
    hoursText.textContent = hours;

    if (seconds > 59) {
        minuteCount++;
    }
    if (minutes > 59) {
        hourCount++;
    }
    if (hours > 99) {
        stopStopwatch();
    }
}

function milliseconds() {
    let date = new Date();
    let currTime = date.getTime() + elapsedTime - startTime;
    return currTime;
}

// Function to reset all variables and time displayed
function reset() {
    if (!isRunning) {
        stopStopwatch();
        elapsedTime = 0;
        minuteCount = 0;
        hourCount = 0;
        firstRun = true;
        milliText.textContent = "000";
        secondsText.textContent = "00";
        minsText.textContent = "00";
        hoursText.textContent = "00";
    }
}

function addTime() {
    if (isRunning) {
        timeContainer.style.display = "block";

        let timeSnapshot = new Date().getTime();
        let interval = timeSnapshot - lastSnapshot;
        let intervalDisplay = generateIntervalDisplay(interval);
        lastSnapshot = timeSnapshot;

        let listItem = document.createElement("li");
        listItem.textContent = intervalDisplay;
        listItem.classList.add("list-item");

        timesList.append(listItem);

        return intervalDisplay;
    }
}

function generateIntervalDisplay(interval) {
    let milliInterval = interval;
    if (milliInterval > 99) {
        milliInterval = "" + milliInterval;
        milliInterval = milliInterval.slice(-3);
    }
    if (milliInterval < 10) {
        milliInterval = "00" + milliInterval;
    } else if (milliInterval < 100) {
        milliInterval = "0" + milliInterval;
    }

    let secondInterval = Math.floor(interval / 1000);
    if (secondInterval < 10) {
        secondInterval = "0" + secondInterval;
    }

    let minuteInterval = Math.floor(interval / 60000);
    if (minuteInterval < 10) {
        minuteInterval = "0" + minuteInterval;
    }

    let hourInterval = Math.floor(interval / 3600000);
    if (hourInterval < 10) {
        hourInterval = "0" + hourInterval;
    }

    return `${hourInterval}:${minuteInterval}:${secondInterval}.${milliInterval}`;
}

function clearTimes() {
    timesList.innerHTML = "";
    timeContainer.style.display = "none";
}

// Change Background Function
function changeBG() {
    // If at the last background in array, change to the first
    if (imageIndex === imageArray.length - 1) {
        imageIndex = 0;
    } else {
        imageIndex++;
    }
    bgImage.style.backgroundImage = `url(${imageArray[imageIndex]})`;
}

// Event Listeners
changeBGButton.addEventListener("click", changeBG);
startStop.addEventListener("click", startStopwatch);
resetButton.addEventListener("click", reset);
splitButton.addEventListener("click", addTime);
clearTimesButton.addEventListener("click", clearTimes);
