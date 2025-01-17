let express = require('express');
require('dotenv').config();
let bodyParser = require('body-parser');
let cors = require('cors');
let authRoutes = require('./routes/authRoutes');
let authMiddleware = require('./middleware/auth');

let app = express();
let port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/auth', authRoutes);

app.get('/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});