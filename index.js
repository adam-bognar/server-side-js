const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// This is crucial - we need to serve static files from the correct directory
app.use(express.static(path.join(__dirname, 'views')));

const subscribeToRoutes = require('./routing/routing');
subscribeToRoutes(app);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});