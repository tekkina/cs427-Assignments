const express = require('express');
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/calculate', (req, res) => {
  const { num1, num2, operator } = req.body;
  let result;
  switch (operator) {
    case 'add':
      result = Number(num1) + Number(num2);
      break;
    case 'subtract':
      result = Number(num1) - Number(num2);
      break;
    case 'multiply':
      result = Number(num1) * Number(num2);
      break;
    case 'divide':
      result = Number(num1) / Number(num2);
      break;
  }
  res.redirect(`/result?result=${result}`);
});

app.get('/result', (req, res) => {
  const { result } = req.query;
  res.render('result', { result });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});