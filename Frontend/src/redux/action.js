import * as types from "./actionType";
import axios from "axios";

const getBooks = (books) => ({
  type: types.GET_BOOKS,
  payload: books,
});

const bookDeleted = () => ({
  type: types.DELETE_BOOK,
});

const bookAdded = () => ({
  type: types.ADD_BOOK,
});

const getBook = (book) => ({
  type: types.GET_SINGLE_BOOK,
  payload: book,
});

const bookUpdated = () => ({
  type: types.UPDATE_BOOK,
});

// Get all Books
export const loadBooks = () => {
  return function (dispatch) {
    axios
      .get("http://127.0.0.1:4500/api/v1/books")
      .then((res) => {
        console.log("response", res.data.books);

        dispatch(getBooks(res.data.books));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// Add Book
export const addBook = (book) => {
  return function (dispatch) {
    axios
      .post("http://127.0.0.1:4500/api/v1/book/new", book)
      .then((res) => {
        console.log("response", res.data.books);
        dispatch(bookAdded());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// Delete book
export const deleteBook = (id) => {
  return function (dispatch) {
    axios
      .delete(`http://127.0.0.1:4500/api/v1/book/${id}`)
      .then((res) => {
        console.log("response", res.data.books);

        dispatch(bookDeleted());
        dispatch(getBooks(res.data.books));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//Get Single Book
export const getSingleBook = (id) => {
  return function (dispatch) {
    axios
      .get(`http://127.0.0.1:4500/api/v1/books/${id}`)
      .then((res) => {
        console.log("response", res.data);

        dispatch(getBook(res.data.books));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// Update Single book
export const updateBook = (book, id) => {
  return function (dispatch) {
    axios
      .put(`http://127.0.0.1:4500/api/v1/book/${id}`, book)
      .then((res) => {
        console.log("response", res.data.books);
        dispatch(bookUpdated());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
