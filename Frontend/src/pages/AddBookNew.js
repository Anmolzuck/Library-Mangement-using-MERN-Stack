import React, { useState } from "react";
import styles from "./AddBookNew.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBook } from "../redux/action";

const AddBookNew = () => {
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

  const { name, author, gener, edition } = state;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });
  };

  const submitChangeHandler = (event) => {
    event.preventDefault();
    if (!name || !author || !gener || !edition) {
      setError("Please fill all the fields.");
    } else {
      dispatch(addBook(state));
      setMsg(`${name} was added sucessfully.`);
      setError("");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className={styles.modalBox}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h1>Add a new book</h1>
          <span className={styles.closeBtn} onClick={() => navigate("/")}>
            &times;
          </span>
        </div>

        {msg && <h3 style={{ color: "green", paddingLeft: "200px" }}>{msg}</h3>}

        {error && (
          <h3 style={{ color: "red", paddingLeft: "200px" }}>{error}</h3>
        )}

        <form onSubmit={submitChangeHandler}>
          <div className={`${styles.inputField} ${styles.field1}`}>
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              name="name"
              value={name}
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
              value={author}
              id="author"
              placeholder="Enter author name"
              onChange={handleInputChange}
            />
          </div>

          <div className={`${styles.inputField} ${styles.field2}`}>
            <label htmlFor="genre">Genre</label>
            <br />
            <input
              type="text"
              name="gener"
              value={gener}
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
              value={edition}
              id="edition"
              placeholder="Enter edition"
              onChange={handleInputChange}
            />

            <button className={styles.cancelBtn} onClick={() => navigate("/")}>
              Cancel
            </button>
            <button className={styles.addBook}>Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookNew;
