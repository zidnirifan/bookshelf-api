const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const requestBody = request.payload;
  const { pageCount, readPage, name } = requestBody;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    ...requestBody,
    id,
    finished,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: { bookId: id },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });

  response.code(500);
  return response;
};

const getAllBooks = () => {
  const allBooks = books.map((book) => {
    const { id, name, publisher } = book;
    const newBook = { id, name, publisher };
    return newBook;
  });

  const response = {
    status: 'success',
    data: {
      books: allBooks,
    },
  };

  return response;
};

module.exports = { addBookHandler, getAllBooks };
