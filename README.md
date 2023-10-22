# BookApp
BookApp is a basic CRUD template to be able to create,read, update and delete books.
# Installation
## ExpressJS
```bash
 npm install --save-dev express
```
## Folder Structure

- Create a folder `Controller` where you place the logic that handles the incoming requests and generates responses. Controllers are responsible for processing data, making decisions, 
  and interacting with your application's models and services.
- Create a folder `routes` where it is  is used to define the routes for your application. Routes specify which controller method should handle a particular HTTP request and the URL 
  path associated with it.
- Create a folder `views` where you store your templates and user interface files. These templates are typically used to render HTML and display dynamic data to the client.
  (but in here i didnt not create a views folder since i am not creating user interfaces)

# Libraries

## Bcrypt

```bash
  npm install --save-dev bcrypt
```
- Used bcrypt in my Express.js application because it is important for enhancing the security of your user authentication system, particularly when you are handling user passwords. Bcrypt is a widely 
  used library for securely hashing and storing passwords, and it provides several benefits:
```bash
  userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
      return next();
    }
    bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      next();
    });
  }
  );
  // compare passwords
  userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
  }
```
## Passport

```bash
  npm install --save-dev passport passport-local
```

- Passport is to provide an authentication mechanism to protect certain routes or resources, ensuring that only authenticated users can access them. If the user is not authenticated, they may be redirected to a login page.
  If authentication is successful, they can continue to access the protected resource or route.

```bash
  const passport = require('passport')
  
  const authenticationMiddleware = (req, res, next) => {
    // If authentication fails, it will redirect to the login page
    passport.authenticate('local', (err, user) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.redirect('/login')
      }
      // If authentication is successful, continue to the next middleware or route
      req.logIn(user, (err) => {
        if (err) {
          return next(err) 
        }
        return next()
      });
    })(req, res, next)
  };
```
## bodyParser

```bash
  npm install --save-dev body-parser
```

- I am using body-parser to parse data from the request body, particularly when i have forms or other data sent from the client to the server. It enables me to access this data in my route 
  handlers via req.body.
- i have configured it with ```bash app.use(bodyParser.urlencoded({ extended: true })) ```, which specifies that it should parse URL-encoded data.

## Express-Session

```bash
  npm install --save-dev express-session
```

-  I am using express-session to set up session management. It's important for implementing user authentication because it allows me to maintain user sessions across multiple HTTP requests. 
-  I configure it with options such as a session secret, which is used to sign session cookies and enhance security.
```bash
  app.use(session(options))
```

## mongoose

```bash
  npm install --save-dev mongoose
```

- I aM using mongoose to establish a connection to a MongoDB database. I pass the database connection URI as the first argument to `mongoose.connect()`. This is necessary to store and retrieve data, 
  such as user information, books, or any other data that my application may require.
- You can define schemas and models to work with data in your application.
```bash
  mongoose.connect()
```
## Jest 

```bash
  npm install --save-dev jest
```

- Jest simplifies the process of writing and running tests, making it easier to ensure that the application's components and functionalities behave as expected. It's an essential tool for achieving and maintaining code quality
  in software development.

## To verify 
 - Run `npm install`
 - Run ` npm start` and go to your web browser and open `localhost:3000`
 - To see the list of books redirect to `localhost:3000/books`
 - To see the list of users redirect to `localhost:3000/users`
 - To run the test using jest run in the command `npm test`
