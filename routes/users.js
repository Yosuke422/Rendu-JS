const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
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

router.post('/', userController.create)
router.get('/', userController.findAll)

router.put('/:id', authenticationMiddleware, userController.update)
router.delete('/:id', authenticationMiddleware, userController.delete)

module.exports = router
