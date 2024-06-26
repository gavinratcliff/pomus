const TIMER_PAUSED = 0;
const TIMER_RUNNING = 0;



document.addEventListener('DOMContentLoaded', (event) => {
    let minutes = 24;  // Set the number of minutes for the timer
    let timeRemaining = minutes * 60;  // Convert minutes to seconds

    const timerElement = document.getElementById('timer');
    const stopButton = document.getElementById('stopButton');

    function updateTimer() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        if (timeRemaining > 0) {
            timeRemaining--;
        } else {
            clearInterval(timerInterval);
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);

    stopButton.addEventListener('click', () => {
        clearInterval(timerInterval);
    });

    updateTimer();  // Initial call to display the timer immediately
});
