const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to DB
mongoose.connect(config.database);

// Success connecting to DB
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// Error connecting to DB
mongoose.connection.on('error', (err) => {
    console.log('Database Error: ' + err);
});

// Init route variables
const r_index = require('./routes/index');
const r_user = require('./routes/users');

// Init port variable
const port = 3000;

// Init App Variable
const app = express();

// View Engine
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// CORS MW
app.use(cors());

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Passport MW
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Route
app.use('/', r_index);
app.use('/users', r_user);

// Start Folder
app.listen(port, () => {
    console.log('server running on: http://localhost:' + port);
});
