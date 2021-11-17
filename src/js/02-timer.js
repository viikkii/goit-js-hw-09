import { time } from 'console';
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { start } from 'repl';
require("flatpickr/dist/themes/dark.css");



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

// логика таймера и его остановка
const timer = {
    intervalId: null,
    isActive: false,

    start() {
        if (this.isActive) {
            return;
        }
        const startTime = Date.now();
        this.isActive = true;

        this.intervalId = setInterval(() => {
            const currentTIme = Date.now();
            const deltaTime = currentTIme - startTime;
            const time = convertMs(deltaTime);
            updateClockface(time);
            console.log(time)
        }, 1000)
    }, 
    stop() {
        clearInterval(this.intervalId)
        this.isActive = false;
    }
};

// обращаемся к кнопке
const refs = {
    btnStart: document.querySelector('button[data-start]'),
    inputForm: document.querySelector('#datetime-picker'),
    daysData: document.querySelector('.timer [data-days]'),
    hoursData: document.querySelector('.timer [data-hours]'),
    minutesData: document.querySelector('.timer [data-minutes]'),
    secondsData: document.querySelector('.timer [data-seconds]')
};

flatpickr(refs.inputForm, options)

// вызываем запуск таймера + добавлем слушателя
refs.btnStart.addEventListener('click', () => {
    timer.start();
    refs.btnStart.setAttribute("disabled", "true");
})

// выводим в интерфейс 
function updateClockface(time) {
    refs.daysData.textContent = addLeadingZero(time.days);
    refs.hoursData.textContent = addLeadingZero(time.hours);
    refs.minutesData.textContent = addLeadingZero(time.minutes);
    refs.secondsData.textContent = addLeadingZero(time.seconds);
}

// добавляем 0 перед 0-9
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

// функция рассчета секундомера
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}