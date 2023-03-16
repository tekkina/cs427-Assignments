const express = require('express');
const app = express();

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
    default:
      // If the operator is not one of the above, return an error response
      return res.status(400).send('Invalid operator');
  }

  // Send the result to the result page with a query parameter
  res.redirect(`/result?result=${result}`);
});

app.get('/result', (req, res) => {
  // Get the result from the query parameter
  const result = req.query.result;

  // If the result is not provided, return an error response
  if (!result) {
    return res.status(400).send('No result provided');
  }

  // Send the result page with the result value
  res.sendFile(__dirname + '/public/result.html');
});

app.listen(2800, () => {
  console.log('Server started on port 2800');
});