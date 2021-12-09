import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateBook, getSingleBook } from "../redux/action";

import styles from "./UpdateBook.module.css";

const UpdateBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    author: "",
    gener: "",
    edition: "",
  });

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  let { id } = useParams();
  const { book } = useSelector((state) => state.data);

  const { name, author, gener, edition } = state;

  useEffect(() => {
    dispatch(getSingleBook(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (book) {
      setState({ ...book });
    }
  }, [book]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const submitChangeHandler = (event) => {
    event.preventDefault();
    if (!name || !author || !gener || !edition) {
      setError("Please fill all the fields");
    } else {
      dispatch(updateBook(state, id));
      setMsg(`${name} was updated sucessfully`);
      setError("");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className={styles.boxModal}>
      <div className={styles.contentBox}>
        <div className={styles.heading}>
          <h1>Update Book</h1>
          <span className={styles.closeModal} onClick={() => navigate("/")}>
            &times;
          </span>
        </div>

        {error && (
          <h3 style={{ color: "red", paddingLeft: "200px" }}>{error}</h3>
        )}
        {msg && <h3 style={{ color: "green", paddingLeft: "200px" }}>{msg}</h3>}

        <form onSubmit={submitChangeHandler}>
          <div className={`${styles.dataField} ${styles.field1}`}>
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              name="name"
              value={name || ""}
              id="name"
              placeholder="Enter book name"
              onChange={handleInputChange}
            />
            <br />
            <br />
            <label htmlFor="author">Author</label>
            <br />
            <input
              type="text"
              name="author"
              value={author || ""}
              id="author"
              placeholder="Enter author name"
              onChange={handleInputChange}
            />
          </div>

          <div className={`${styles.dataField} ${styles.field2}`}>
            <label htmlFor="genre">Genre</label>
            <br />
            <input
              type="text"
              name="gener"
              value={gener || ""}
              id="genre"
              placeholder="Enter genre"
              onChange={handleInputChange}
            />
            <br />
            <br />
            <label htmlFor="edition">Edition</label>
            <br />
            <input
              type="text"
              name="edition"
              value={edition || ""}
              id="edition"
              placeholder="Enter edition"
              onChange={handleInputChange}
            />

            <button className={styles.cancelBtn} onClick={() => navigate("/")}>
              Cancel
            </button>
            <button className={styles.updateBook}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
