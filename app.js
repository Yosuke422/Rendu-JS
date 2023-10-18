const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = express()
const booksRoute = require('./routes/books')
const usersRoute = require('./routes/users')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user')



// Configure MongoDB connection
mongoose.connect('mongodb+srv://youssefcharafeddine:jSfA1hgs14fL2PSK@cluster0.mdhh0e7.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true,})

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(
  session({
    secret: 'nodejs-express',
    resave: false,
    saveUninitialized: true,
  })
)

app.use(passport.initialize());
app.use(passport.session());

// Define a local strategy for authentication
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        // Return if user not found in database
        if (!user) {
            return done(null, false, {
            message: 'User not found'
            });
        }
        // Return if password is wrong
        if (!user.validPassword(password)) {
            return done(null, false, {
            message: 'Password is wrong'
            });
        }
        // If credentials are correct, return the user object
        return done(null, user);
        });
    }
    ));
    // Serialize and deserialize sessions
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
        done(err, user);
        });
    }
    );


// Set Up Routes
app.use('/books', booksRoute)
app.use('/users', usersRoute)

// Start the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});
