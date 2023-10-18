const USER = require('../models/user')

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "Username and password are required."
        })
    }
    
    // Create a User
    const user = new USER({
        username: req.body.username,
        password: req.body.password, 
    })

    // Save User in the database
    user.save()
        .then(data => {
            res.send(data)
            console.log(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
            console.log(err)
        })
}

// findALl users and will have hashed password

exports.findAll = (req, res) => {
    USER.find() 
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err }));
}

exports.update = (req, res) => {
    const user = new USER({
        _id: req.params.id,
        username: req.body.username,
        password: req.body.password,
      })
      USER.updateOne({_id: req.params.id}, user).then(
        () => {
          res.status(201).json({
            message: 'User updated successfully!'
          })
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          })
        }
      )
}
exports.delete  = (req, res) => {
    USER.deleteOne({_id: req.params.id}).then(
        () => {
          res.status(200).json({
            message: 'Deleted!'
          })
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          })
        }
      )
}

