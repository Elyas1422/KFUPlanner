
// Structure of timing  "Specifies each state what dedicated time"
const timer = {
    focusTime: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakIteration: 4,
    sessions: 0, // for automatic start next session
    //state: blah..
    //Remaining: {?}
  };

  let isReseted = false;
timer.Remaining = {
  total: 0,
  minutes: 0,
  seconds: 0
};
  let isPaused = false;
let interval;
// getting the div that contains buttons
const stateButtons = document.querySelector('#js-state-buttons');
const startButton = document.getElementById('js-btn');

startButton.addEventListener('click', () => {
    const { action } = startButton.dataset;
    (action === 'start') ? startTiming() : stopTiming();
}
    
);
stateButtons.addEventListener('click', setState);

//Get updated remaining time sync.
function getRemaining(endTime) {
    const currentTime = Date.parse(new Date());
    const difference = endTime - currentTime;
    // calculate remaining with respect to updated difference
    const total = Number.parseInt(difference / 1000, 10);
    const minutes = Number.parseInt((total / 60) % 60, 10);
    const seconds = Number.parseInt(total % 60, 10);
  
    return { total, minutes, seconds};
  }
  function startTiming() {
    let { total } = timer.Remaining;
  
    if (interval) {
      // Timer is already running, pause it
      clearInterval(interval);
      interval = null;
  
      isPaused = true;
      startButton.textContent = 'Continue';
    } else {
      // Timer is not running, start it or resume from pause
      if (total <= 0) {
        // If the remaining time is already 0 or negative, reset the timer
        resetTiming();
      } else {
        const endTime = Date.parse(new Date()) + total * 1000;
  
        if (timer.state === 'focusTime') {
          timer.sessions++;
        }
  
        startButton.dataset.action = 'stop';
        isPaused = false;
        isReseted = false;
        startButton.textContent = 'Pause';
  
        interval = setInterval(function () {
          timer.Remaining = getRemaining(endTime);
          updateRemaining();
  
          total = timer.Remaining.total;
          if (total <= 0) {
            clearInterval(interval);
            switch (timer.state) {
              case 'focusTime':
                if (timer.sessions % timer.longBreakIteration === 0) {
                  switchState('longBreak');
                } else {
                  switchState('shortBreak');
                }
                break;
              default:
                switchState('focusTime');
            }
            startTiming();
          }
        }, 1000);
      }
    }
  }
  

  function stopTiming() {
    clearInterval(interval);
    interval = null;
  
    isPaused = false;
    startButton.dataset.action = 'start';
    startButton.textContent = 'Start';
  }

// update the time UI
function updateRemaining() {
    const { Remaining } = timer; // get current remaining time values
    // store them in variable '.padStart is incase its one number such 1,2,3,4, .. we put 0 before
    const minutes = `${Remaining.minutes}`.padStart(2, '0');
    const seconds = `${Remaining.seconds}`.padStart(2, '0');
    //get that span tags inside html, to update
    const min = document.getElementById('js-minutes');
    const sec = document.getElementById('js-seconds');
    // re set whatever inside these tags with NEWLY assigned variable ^ 
    min.textContent = minutes;
    sec.textContent = seconds;
  }

// change the state function 
function switchState(state) {
    timer.state = state; //add state property inside timer dic.
    timer.Remaining = {
      total: timer[state] * 60,//total of remaing seconds
      minutes: timer[state],//only minutes
      seconds: 0,//default starting seconds.
    };//add Remaining prop.
  
    document // removing active for not stated element.
      .querySelectorAll('button[data-state]')
      .forEach(e => e.classList.remove('active'));//3lshan yro7 alstayling.
    document.querySelector(`[data-state="${state}"]`).classList.add('active');

    // const body = document.querySelector('body');
    const rotateProp = '--rotate';
    const initialRotateValue = '132deg';
    
    const keyframes = [
      { [rotateProp]: '0deg' },
      { [rotateProp]: '360deg' }
    ];

    const spinAnimation = new Animation(new KeyframeEffect(document.body, keyframes, { duration: 2000, easing: 'linear', iterations: Infinity }));
    document.body.style.setProperty(rotateProp, initialRotateValue);
    let myObject = {
        'focusTime': `linear-gradient(  var(${rotateProp}), hsl(223, 24%, 24%), hsl(223, 24%, 24%), hsl(47, 22%, 24%))`,
        'shortBreak': `linear-gradient(  var(${rotateProp}), hsl(47, 22%, 24%), hsl(47, 22%, 24%), hsl(102, 15%, 23%))`,
        'longBreak':  `linear-gradient( var(${rotateProp}), hsl(102, 15%, 23%), hsl(102, 15%, 23%), hsl(223, 24%, 24%))`
        // more key-value pairs
      };
    // document.body.style.background = stateBg;
    document.body.style.backgroundImage = `${myObject[state]}`;
    document.body.animate(spinAnimation);
  
    updateRemaining();
    //if state changes, stop the timer
    stopTiming();
  }

  // reset button
  const resetButton = document.getElementById('js-reset-btn');

  resetButton.addEventListener('click', () => {
    resetTiming();
  });
  
  function resetTiming() {
    clearInterval(interval);
  
    startButton.dataset.action = 'start';
    startButton.textContent = 'start';
    startButton.classList.remove('active');
  
    // Reset the timer state and remaining time
    switchState('focusTime');
    timer.sessions = 0;
    timer.Remaining = {
      total: timer.focusTime * 60,
      minutes: timer.focusTime,
      seconds: 0,
    };
  
    updateRemaining();
  }
// get the specific button that was clicked 'in state'
function setState(event) {
  const { state } = event.target.dataset;
    console.log(state);
  if (!state) return; // in case any error occurs

  switchState(state); // if no error, go into switchState function
}

//ensure default state
document.addEventListener('DOMContentLoaded', () => {
    switchState('focusTime');
  });