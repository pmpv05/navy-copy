const express = require('express');
const nj = require('express-nunjucks');

const app = express();
nj(app);

app.get('/', function(req, res) {
  res.render('index');
});

/*
app.get('/result', function(req, res) {
  res.render('result', { texto: req.query.text });
}); */

app.post('/result', function(req, res) {
  res.render('result', { texto: req.body.text });
});

app.listen(8000);
