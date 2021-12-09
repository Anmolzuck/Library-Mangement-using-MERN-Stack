import styles from "./EmptyBox.module.css";
import { useNavigate } from "react-router-dom";

const EmptyBox = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.emptyDiv}>
      <table className={styles.tablelist}>
        <tr className={styles.listHeadings}>
          <th>S No.</th>
          <th>Name</th>
          <th>Genre</th>
          <th>Author</th>
          <th>Edition</th>
          <th>Action</th>
        </tr>
      </table>
      <h1>"No Books available"</h1>
      <button className={styles.addBtn} onClick={() => navigate("/addBook")}>
        Add Book
      </button>
    </div>
  );
};

export default EmptyBox;
