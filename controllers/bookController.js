const BOOK = require('../models/book')

exports.create = (req, res) => {
    console.log(req.body)
    const postBook = req.body

    const book = new BOOK ({
        title : postBook.title,
        author: postBook.author,
    
    })
    book.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            })
        })

}

    exports.findAll = (req, res) => {
        
        BOOK.find()
        .then(data => res.send(data))
        .catch( err => res.status(500).send({message: err}))
    }

    exports.update = (req, res) => {
      const updatedBookData = {
        title: req.body.title,
        author: req.body.author,
      };
    
      // Find the existing book by ID and update its properties
      BOOK.findByIdAndUpdate(req.params.id, updatedBookData, { new: true })
        .then(updatedBook => {
          if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
          }
          res.status(201).json(updatedBook);
        })
        .catch(error => {
          res.status(400).json({ error: error });
        });
    };
    

    exports.delete  = (req, res) => {
        BOOK.deleteOne({_id: req.params.id}).then(
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

