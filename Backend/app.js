const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

mongoose
  .connect(" mongodb://127.0.0.1:27017/library", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connceted with MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//Implement cors
app.use(cors());
//Acess-Control-Allow-Origin

app.options("*", cors());

const bookSchema = new mongoose.Schema({
  name: String,
  gener: String,
  edition: String,
  author: String,
});

const Book = new mongoose.model("Book", bookSchema);

app.post("/api/v1/book/new", async (req, res) => {
  const book = await Book.create(req.body);

  if (!book) {
    return res.status(500).json({
      success: false,
      message: "Book Not Found..",
    });
  }

  res.status(201).json({
    success: true,
    book,
  });
});

app.get("/api/v1/books", async (req, res) => {
  const book = await Book.find();

  if (!book) {
    return res.status(500).json({
      success: false,
      message: "Book Not Found..",
    });
  }

  const count = book.length;

  res.status(200).json({
    success: true,
    Total_books: count,
    books: book,
  });
});

app.get("/api/v1/books/:id", async (req, res) => {
  let book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(500).json({
      success: false,
      message: "Book Not Found..",
    });
  }

  res.status(200).json({
    success: true,

    books: book,
  });
});

app.put("/api/v1/book/:id", async (req, res) => {
  let book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(500).json({
      success: false,
      message: "Book Not Found..",
    });
  }

  book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    book,
  });
});

app.delete("/api/v1/book/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(500).json({
      success: false,
      message: "Book Not Found..",
    });
  }

  await book.remove();

  res.status(200).json({
    success: true,
    message: "Book deleted sucessfully..",
  });
});

const port = 4500;

app.listen(port, () => {
  console.log(`listening on port ${port} ...`);
});
