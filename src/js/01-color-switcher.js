function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  body: document.body,
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
};

refs.stopButton.setAttribute('disabled', true);

const changeColor = () => {
  refs.startButton.setAttribute('disabled', true);
  refs.stopButton.removeAttribute('disabled');

  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

const stopChangeColor = () => {
  refs.startButton.removeAttribute('disabled');
  refs.stopButton.setAttribute('disabled', true);

  clearInterval(intervalId);
};

refs.startButton.addEventListener('click', changeColor);
refs.stopButton.addEventListener('click', stopChangeColor);
