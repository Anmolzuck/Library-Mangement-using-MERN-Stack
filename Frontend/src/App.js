import React from "react";
import { Routes, Route } from "react-router-dom";
import BookList from "./pages/BookList";
import AddBookNew from "./pages/AddBookNew";
import UpdateBook from "./pages/UpdateBook";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<BookList />}></Route>
      <Route exact path="/addBook" element={<AddBookNew />}></Route>
      <Route exact path="/updateBook/:id" element={<UpdateBook />}></Route>
    </Routes>
  );
}

export default App;
