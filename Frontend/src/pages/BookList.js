import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBooks, deleteBook } from "../redux/action";
import { useNavigate } from "react-router-dom";

import styles from "./BookList.module.css";
import EmptyBox from "./EmptyBox";

const BookList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { books } = useSelector((state) => state.data);
  const [msg, setMsg] = useState("");
  // console.log(books);
  // const { loading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadBooks());
  }, [dispatch]);

  const deleteHandler = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name} book ?`)) {
      setMsg(`${name} was deleted sucessfully.`);
      dispatch(deleteBook(id));
      dispatch(loadBooks());

      // reloading page manually
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  };

  return (
    <div>
      <div className={styles.logoHeader}>
        <h1>GeekLib</h1>
      </div>

      <button
        className={styles.addBookbtn}
        onClick={() => navigate("/addBook")}
      >
        Add Book
      </button>
      {msg && (
        <h3 style={{ color: "red", marginLeft: "40%", paddingTop: "5px" }}>
          {msg}
        </h3>
      )}

      <h1 className={styles.showList}>Library Item List</h1>

      {books == "" ? (
        <EmptyBox />
      ) : (
        <table className={styles.tablelist}>
          <tbody>
            <tr className={styles.listHeadings}>
              <th>S No.</th>
              <th>Name</th>
              <th>Genre</th>
              <th>Author</th>
              <th>Edition</th>
              <th>Action</th>
            </tr>

            {books &&
              books.map((book, i) => (
                <tr key={book._id}>
                  <td style={{ paddingLeft: "10px" }}>{i + 1}.</td>
                  <td>{book.name}</td>
                  <td>{book.gener}</td>
                  <td>{book.author}</td>
                  <td>{book.edition}</td>
                  <td>
                    <button
                      id="edit-btn"
                      className={styles.updatebtn}
                      onClick={() => navigate(`/updateBook/${book._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      id="delete-btn"
                      className={styles.deletebtn}
                      onClick={() => deleteHandler(book._id, book.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookList;
