const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');
const app = express();
const router = express.Router();
const bookController = require('../controllers/bookController'); // Assuming bookController is correctly defined
const Book = require('../models/book');
const booksRoute = require('../routes/books'); 

// Configure the app and routes
app.use(express.json());

beforeAll(async () => {
  await mongoose.connect('mongodb+srv://youssefcharafeddine:jSfA1hgs14fL2PSK@cluster0.mdhh0e7.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

// Mount the booksRoute, not the bookController
app.use('/books', booksRoute);

describe('Book Controller API', () => {
 it('should create a new book', async () => {
  const bookData = { title: 'Test Book', author: 'Test Author' }

  const response = await request(app)
    .post('/books')
    .send(bookData);

  expect(response.status).toBe(200)
  expect(response.body.title).toBe('Test Book')
  expect(response.body.author).toBe('Test Author')
});


  it('should get all books', async () => {
    const response = await request(app).get('/books');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should update a book', async () => {
    const book = new Book({ title: 'Initial Title', author: 'Initial Author' });
    await book.save();

    const updatedBookData = { title: 'Updated Title', author: 'Updated Author' };

    const response = await request(app)
      .put(`/books/${book._id}`)
      .send(updatedBookData);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Updated Title');
    expect(response.body.author).toBe('Updated Author');
  });

  it('should delete a book', async () => {
    const book = new Book({ title: 'To Be Deleted', author: 'Author' });
    await book.save();

    const response = await request(app).delete(`/books/${book._id}`);

    expect(response.status).toBe(200);

    const deletedBook = await Book.findById(book._id);
    expect(deletedBook).toBeNull();
  });
});

