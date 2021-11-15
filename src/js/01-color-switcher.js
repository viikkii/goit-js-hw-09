function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btn = document.querySelector('.change-color');
const span = document.querySelector('.color');

btn.addEventListener("click", (changeColor) => {
  const color = getRandomHexColor();
  span.textContent = color;
  document.body.style.background = color;
 }
)

console.log(getRandomHexColor());