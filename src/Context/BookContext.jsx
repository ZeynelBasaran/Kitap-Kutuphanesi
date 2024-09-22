import axios from "axios";
import { createContext, useState } from "react";
const BookContext = createContext();
axios;

function BookContextComp({ children }) {
  const [publisher, setPublisher] = useState([]);
  const [newPublisher, setNewPublisher] = useState({
    name: "",
    establishmentYear: "",
    address: "",
  });

  const [category, setCategory] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    name: "",
    publicationYear: "",
    stock: "",
  });

  const [author, setAuthor] = useState([]);
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    birthDate: "",
    country: "",
  });

  return (
    <BookContext.Provider
      value={{
        publisher,
        setPublisher,
        category,
        setCategory,
        books,
        setBooks,
        setAuthor,
        author,
        newPublisher,
        setNewPublisher,
        newBook,
        setNewBook,
        newAuthor,
        setNewAuthor,
        newCategory,
        setNewCategory
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export default BookContextComp;
export { BookContext };
