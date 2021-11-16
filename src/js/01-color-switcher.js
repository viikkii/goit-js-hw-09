function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let timerId = null;

btnStart.addEventListener("click", changeColor)
btnStop.addEventListener("click", stopChangeColor)


function changeColor() {
   timerId = setInterval(() => {
        document.body.style.background = getRandomHexColor();
    }, 1000);
    btnStart.disabled = true;
}

function stopChangeColor() {
    clearInterval(timerId);
    btnStop.disabled = false;
    if (btnStop.disabled = true) {
        btnStart.disabled = false
    } 
}


