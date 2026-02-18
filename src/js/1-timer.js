import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';

//
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const dateInput = document.querySelector("#datetime-picker");

startBtn.disabled = true;

let selectedDate = null;
let timerInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'bottomCenter',
      });
      startBtn.disabled = true;
      return;
    }
    selectedDate = selectedDates[0];
    startBtn.disabled = false;

    iziToast.success({
      title: 'Success',
      message: 'Great choice!!',
      position: 'bottomCenter',
    });
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  if (!selectedDate) return;

  startBtn.disabled = true;
  dateInput.disabled = true;

  timerInterval = setInterval(() => {
    const now = new Date();
    const diff = selectedDate - now;

    if (diff <= 0) {
      clearInterval(timerInterval);
      updateTimer(0);

      dateInput.disabled = false;
      
      iziToast.success({
        title: 'Success',
        message: 'Great choice!!',
        position: 'topCenter',
      });
      return;
    }
    updateTimer(diff);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

