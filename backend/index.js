const express = require('express')
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
var cors = require('cors')

const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));

app.use(express.static(path.join(__dirname, '../frontend/dist/frontend')));

// Body parser
app.use(express.urlencoded());
app.use(express.json());

// Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport config
require('./config/passport')(passport);

// Connect to Mongo
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDb Connected...'))
  .catch((err) => console.log(err));

var db = mongoose.connection;
db.set('debug', true);
app.db = db;

// Routes
require('./routes/features/index')(app);
require('./routes/roles/index')(app);
require('./routes/users/index')(app);

app.get('*', async (req, res) => {
  res.status(301).sendFile(path.resolve(__dirname, '../frontend/dist/frontend', 'index.html'));
})

const port = 3000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})