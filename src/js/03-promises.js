import { Notify } from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

function promises(delay, step, amount) {
  let newDelay = 0;
  for (let i = 1; i <= amount; i += 1) {
    newDelay = i === 1 ? delay : newDelay + step;
    createPromise(i, newDelay).then().catch();
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  const delay = refs.delay.value;
  const step = refs.step.value;
  const amount = refs.amount.value;
  console.log(delay, step, amount);

  promises(parseInt(delay), parseInt(step), parseInt(amount));
}

refs.form.addEventListener('submit', onFormSubmit);
