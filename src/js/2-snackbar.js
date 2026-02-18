import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  const promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(function (delay) {
      iziToast.success({
        title: 'Success',
        message: 'Fulfilled promise in ${delay}ms',
        position: 'bottomCenter',
      });
    })
    .catch(function (delay) {
      iziToast.error({
        title: 'Error',
        message: '"Rejected promise in ${delay}ms"',
        position: 'bottomCenter',
      });
    });
}

