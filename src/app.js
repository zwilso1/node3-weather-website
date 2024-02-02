const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Zack Wilson',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Zack Wilson',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Zack Wilson',
    helpText:
      'This is the help page!  If you have any questions please email zwilson@smithbrosfurn.com',
  });
});

//app.com/weather

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'You must provide an address!',
    });
  } else {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        // return console.log(error);
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          // return console.log(error);
          return res.send({ error });
        }
        console.log(location);
        console.log(forecastData);
        res.send({
          forecast: forecastData,
          location,
          address,
        });
      });
    });
  }
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term.',
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 - Error',
    errorText: 'Help Article not Found',
    name: 'Zack Wilson',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 - Error',
    errorText: 'Page not found.',
    name: 'Zack Wilson',
  });
});
app.listen(port, () => {
  console.log(`Server is up on port ` + port);
});
