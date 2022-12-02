import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

refs.startButton.setAttribute('disabled', true);

let endTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      refs.startButton.setAttribute('disabled', true);

      Notify.failure('Please choose a date in the future');
    } else {
      refs.startButton.removeAttribute('disabled');
    }

    endTime = selectedDates[0].getTime();
  },
};

flatpickr(refs.datetimePicker, options);

const countdown = {
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = endTime - currentTime;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);

      if (deltaTime < 0) {
        countdown.stop(intervalId);
        return;
      }
      updateClockface({ days, hours, minutes, seconds });
    }, 1000);
  },
  stop(intervalId) {
    clearInterval(intervalId);
  },
};

function updateClockface({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = `${days}`;
  refs.dataHours.textContent = `${hours}`;
  refs.dataMinutes.textContent = `${minutes}`;
  refs.dataSeconds.textContent = `${seconds}`;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

refs.startButton.addEventListener('click', countdown.start);
