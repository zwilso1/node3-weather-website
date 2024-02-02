// console.log('Client side javascript file is loaded!');

// const url = 'https://puzzle.mead.io/puzzle';
// fetch(url).then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// const wurl = 'http://localhost:3000/weather';
// fetch(wurl + '?address=!').then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
//   // .catch((error) => {
//   //   console.log(error);
//   // });
// });

const wurl = '/weather';

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch(wurl + '?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        // console.log(data.error);
      } else {
        // console.log(data.location);
        messageOne.textContent = 'Location: ' + data.location;
        // console.log(data.forecast);
        messageTwo.textContent = 'Forecast: ' + data.forecast;
      }
    });
  });
  //   console.log(location);
});
