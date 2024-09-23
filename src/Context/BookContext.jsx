import axios from "axios";
import { createContext, useState } from "react";
const BookContext = createContext();
axios;

function BookContextComp({ children }) {

  //
  const [update, setUpdate] = useState(false);

  //Publisher States
  const [publisher, setPublisher] = useState([]);
  const [newPublisher, setNewPublisher] = useState({
    name: "",
    establishmentYear: "",
    address: "",
  });
  const [editPublisher, setEditPublisher] = useState({
    id:"",
    name: "",
    establishmentYear: "",
    address: "",
  });


  //Category States
  const [category, setCategory] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });


  //Books States
  const [books, setBooks] = useState({});
  const [newBook, setNewBook] = useState({
    id: 0,
    name: "",
    publicationYear: 0,
    stock: 0,
    author: {
      id: 0,
      name: "",
      birthDate: "",
      country: ""
    },
    publisher: {
      id: 0,
      name: "",
      establishmentYear: 0,
      address: ""
    },
    categories: [
      {
        id: 0,
        name: "",
        description: ""
      }
    ]
  });


  //Author States
  const [author, setAuthor] = useState([]);
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    birthDate: "",
    country: "",
  });

  const [alerts, setAlerts] = useState({
    type: "",
    message: "",
  });

//Datebase Get İstekleri
  const getPublisher = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers`
      );
      console.log(response.data);
      setPublisher(response.data);
      setUpdate(true);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Publisher Yüklendi.");
    }
  };
  const getCategory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories`
      );
      console.log(response.data);
      setCategory(response.data);
      setUpdate(true);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Category Yüklendi.");
    }
  };
  const getAuthor = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/authors`
      );
      console.log(response.data);
      setAuthor(response.data);
      setUpdate(true);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Author Yüklendi.");
    }
  };
  const getBooks= async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/books`
      );
      console.log(response.data);
      setBooks(response.data);
      setUpdate(true);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Books Yüklendi.");
    }
  };


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
        setNewCategory,
        setAlerts,
        alerts,
        editPublisher,
        setEditPublisher,
        update,
        setUpdate,
        getPublisher,
        getCategory,
        getAuthor,
        getBooks
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export default BookContextComp;
export { BookContext };
