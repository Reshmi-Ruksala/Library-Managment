import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/books" element={<BookList />} />
      <Route path="/books/add" element={<AddBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
    </Routes>
  );
}

export default App;
