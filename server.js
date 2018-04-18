const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next)=> {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  });
  next();
});

// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=> {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the best site'
  });

  //res.send('<h1>hello express. this is the best site ever. winner</h1>');
  // res.send({
  //   name: 'Bob',
  //   interests: [
  //     'Bikes',
  //     'Running'
  //   ]
  // })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Us',

  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Page Not found'
  });
});

app.listen(port, () => {
  console.log(`${port}`);
});
