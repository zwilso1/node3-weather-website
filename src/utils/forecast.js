const request = require('postman-request');

const forecast = (lat, lng, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=68f42bd6d55715cf30a957a944a50956&query=' +
    lat +
    ',' +
    lng +
    '&units=f';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to Weather Service.', undefined);
    } else if (body.error) {
      callback('Unable to find location!', undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          '. It is currently ' +
          body.current.temperature +
          ' degrees out. It feels like ' +
          body.current.feelslike +
          ' degrees out!'
      );
    }
  });
};

module.exports = forecast;
