const express = require('express');

const nunjucks = require('express-nunjucks');
const bodyParser = require('body-parser');

const app = express();

nunjucks(app);
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(`${__dirname}/static`));
app.use('/scripts', express.static(`${__dirname}/scripts`));
app.get('/', (req, res) => {
    res.render('login');
});

// app.post('/signupResult', (req, res) => {
//     const pred = req.body.email === 'a@b.c' && req.body.password === '123';
//     const signupResult = pred ? 'Signed up correctly' : 'Failed to sign up';
//     res.render('signupResult', { result: signupResult });
// });

app.get('/home', (req, res) => {
    res.render('home', { selected: 'home' });
});

app.get('/games', (req, res) => {
    res.render('games', { selected: 'games' });
});

app.get('/addGame', (req, res) => {
    res.render('addGame', { selected: 'games' });
});

app.get('/detailsGame', (req, res) => {
    res.render(`detailsGame`, { selected: 'games' });
});

app.get('/consoles', (req, res) => {
    res.render('consoles', { selected: 'consoles' });
});

app.get('/addConsole', (req, res) => {
    res.render('addConsole', { selected: 'consoles' });
});

app.get('/detailsConsole', (req, res) => {
    res.render(`detailsConsole`, { selected: 'consoles' });
});

app.get('/accessories', (req, res) => {
    res.render('accessories', { selected: 'accessories' });
});

app.get('/addAccessory', (req, res) => {
    res.render('addAccessory', { selected: 'accessories' });
});

app.get('/detailsAccessory', (req, res) => {
    res.render(`detailsAccessory`, { selected: 'accessories' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { selected: 'contact' });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/forgotPassword', (req, res) => {
    res.render('forgotPassword');
});




app.listen(8080, () => {
    console.log('Example app listening on port 8080!');
});