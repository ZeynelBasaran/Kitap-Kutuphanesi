import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { BookContext } from "../../Context/BookContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";


import Alerts from "../../Components/Alert";

function Kitap() {
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedCategories, setSelectedCategories] = useState("");

  const {
    newBook,
    setNewBook,
    setBooks,
    publisher,
    author,
    category,
    update,
    setUpdate,
    getPublisher,
    getCategory,
    getAuthor,
    getBooks,
    books,
    setAlerts,
    editBook,
    setEditBook,
    alerts,
    editing,setEditing
    
  } = useContext(BookContext);
  const tr = [
    "Edit",
    "Book Name",
    "Author İnfo",
    "Categories",
    "Publisher İnfo",
    "Delete",
  ];

  //Fetches authors, publishers, categories, and books when the page loads or 'update' changes.
  useEffect(() => {
    getAuthor();
    getPublisher();
    getCategory();
    getBooks();

    const timer = setTimeout(() => {
      setAlerts({
        type: "",
        message: "",
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [update]);

  //Sends new book data to the API with a POST request.
  const sendToBook = () => {
    console.log("bitti", newBook);
    axios
      .post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/books`, newBook)
      .then((response) => {
        console.log("Veri başarıyla gönderildi:", response.data);
        setNewBook({
          name: "",
          establishmentYear: "",
          address: "",
        });
        setUpdate(false);
        setAlerts({
          type: "success",
          message: "Book Added Successfully",
        });
      }).catch(() => {
        setAlerts({
          type: "error",
          message: "Book not added",
        });
        setUpdate(false);
      });
  };

  //Captures input field changes (name and value).
  const newBookİnp = (e) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value,
    });
  };
  //Captures the selected author from the dropdown.
  const authorSelect = (e) => {
    const { value } = e.target;
    const selectAuthor = author.find((item) => item.id === value);
    setNewBook((prev) => ({
      ...prev,
      author: selectAuthor,
    }));
  };
  //Captures the selected author from the dropdown.
  const categorySelect = (e) => {
    const { value } = e.target;
    const selectCategory = category.find((item) => item.id === value);
    setNewBook((prev) => ({
      ...prev,
      categories: [selectCategory],
    }));
  };
  //Captures the selected publisher from the dropdown.
  const publisherSelect = (e) => {
    const { value } = e.target;
    const selectPublisher = publisher.find((item) => item.id === value);
    setNewBook((prev) => ({
      ...prev,
      publisher: selectPublisher,
    }));
  };

  //// 1. Sends a DELETE request to remove the selected book from the API.
  const removeBook = (item) => {
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/books/${item.id}`)
      .then(() => {
        setBooks((prev) => prev.filter((items) => items.id !== item.id));
        setAlerts({
          type: "warning",
          message: "Book successfully deleted",
        });
        setUpdate(false);
      }).catch(()=>{
        setAlerts({
          type: "error",
          message: "Book not deleted",
        });
        setUpdate(false);
      });
  };

  //Sends updated book data to the API via PUT request.
  const sendEditBookİnp = () => {
    axios
      .put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/books/${editBook.id}`,
        editBook
      )
      .then(() => {
        setEditBook({
          id: 0,
          name: "",
          publicationYear: 0,
          stock: 0,
          author: {
            id: 0,
            name: "",
            birthDate: "",
            country: "",
          },
          publisher: {
            id: 0,
            name: "",
            establishmentYear: 0,
            address: "",
          },
          categories: [
            {
              id: 0,
              name: "",
              description: "",
            },
          ],
        });
        setUpdate(false);
        setAlerts({
          type: "info",
          message: "Book successfully change",
        });
        setEditing(false)
      }).catch((error)=> {
        console.log(error)
        setAlerts({
          type: "warning",
          message: `Book information could not be edited`,
        });
      })
  };

  //Captures input field changes (name and value).
  const editBookİnp = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setEditBook((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(editBook);
  };
  //Captures the selected author from the dropdown.
  const editAuthorSelect = (e) => {
    setSelectedAuthor(e.target.value);
    const { value } = e.target;
    const selectAuthor = author.find((item) => item.id === value);
    setEditBook((prev) => ({
      ...prev,
      author: selectAuthor,
    }));
  };
  //Captures the selected publisher from the dropdown.
  const editPublisherSelect = (e) => {
    setSelectedPublisher(e.target.value);
    const { value } = e.target;
    const selectPublisher = publisher.find((item) => item.id === value);
    setEditBook((prev) => ({
      ...prev,
      publisher: selectPublisher,
    }));
    console.log(editBook)
  };
  // Captures the selected category from the dropdown.
  const editCategoriesSelect = (e) => {
    setSelectedCategories(e.target.value);
    const { value } = e.target;
    const selectCategory = category.find((item) => item.id === value);
    setEditBook((prev) => ({
      ...prev,
      categories: [selectCategory],
    }));
  };
  
  //Sets the selected book's data in the form fields for editing.
  const handleEditBtn = (item) => {
    setEditBook(item);
    setSelectedAuthor(item.author.id);
    setSelectedPublisher(item.publisher.id);
    setSelectedCategories(item.categories[0].id);
    setEditing((prev) => !prev);
  };

  return (
    <div className="kitap">
    <Alerts type={alerts.type} message={alerts.message} />
    <Accordion className="addİtem">
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <Typography>{editing ? "EDIT BOOK" : "ADD NEW BOOK"}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="on"
          className="input-box"
        >
          <TextField
            required
            id="outlined-required"
            label="Publication Name"
            type="text"
            onChange={editing ? editBookİnp : newBookİnp}
            value={editing ? editBook.name : newBook.name}
            name="name"
            size="small"
          />
  
          <TextField
            required
            id="outlined-required"
            label="Publication Year"
            type="number"
            onChange={editing ? editBookİnp : newBookİnp}
            value={editing ? editBook.publicationYear : newBook.publicationYear}
            name="publicationYear"
            size="small"
          />
          <TextField
            required
            id="outlined-required"
            label="Stock"
            type="number"
            onChange={editing ? editBookİnp : newBookİnp}
            value={editing ? editBook.stock : newBook.stock}
            name="stock"
            size="small"
          />
        </Box>
  
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="on"
          className="input-box selectBox"
        >
          <Select
            name="author"
            value={editing ? selectedAuthor : 0}
            onChange={editing ? editAuthorSelect : authorSelect}
            size="small"
          >
            <MenuItem value={0} disabled>
              Select Author
            </MenuItem>
            {author?.map((item, idx) => (
              <MenuItem value={item.id} key={`${item.name}${idx}`}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
  
          <Select
            name="publisher"
            value={editing ? selectedPublisher : 0}
            onChange={editing ? editPublisherSelect : publisherSelect}
            size="small"
          >
            <MenuItem value={0} disabled>
              Select Publisher
            </MenuItem>
            {publisher?.map((item, idx) => (
              <MenuItem value={item.id} key={`${item.name}${idx}`}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
  
          <Select
            name="categories"
            value={editing ? selectedCategories : 0}
            onChange={editing ? editCategoriesSelect : categorySelect}
            size="small"
          >
            <MenuItem value={0} disabled>
              Select Category
            </MenuItem>
            {category?.map((item, idx) => (
              <MenuItem value={item.id} key={`${item.name}${idx}`}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
  
        <Box className="addBox">
          <Button
            variant="contained"
            color="success"
            onClick={editing ? sendEditBookİnp : sendToBook}
          >
            {editing ? "CHANGE" : "ADD TO BOOK"}
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  
    <table>
      <thead>
        <tr>
          {tr.map((item, idx) => (
            <th key={`${item}${idx}`}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {books?.map((item, idx) => (
          <tr key={`${item}${idx}`}>
            <td className="cursor-icon">
              <ModeEditIcon
                onClick={() => {
                  handleEditBtn(item);
                }}
              />
            </td>
            <td>{`${item?.name} (${item?.publicationYear}) Stok: ${item?.stock}`}</td>
            <td>{`${item.author?.name} (${item.author?.birthDate}) - ${item.author?.country}`}</td>
            <td>{item.categories[0]?.name} - {item.categories[0]?.description}</td>
            <td>{item.publisher?.name} - {item.publisher?.establishmentYear}</td>
            <td>
              <DeleteIcon
                className="cursor-icon"
                onClick={() => {
                  removeBook(item);
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
}

export default Kitap;

/*
   <div className="kitap">
      <Alerts type={alerts.type} message={alerts.message} />
      <Accordion className="addİtem">
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>ADD NEW BOOK</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="on"
            className="input-box"
          >
            <TextField
              required
              id="outlined-required"
              label="Publication Name"
              type="text"
              onChange={newBookİnp}
              value={newBook.name}
              name="name"
              size="small"
            />

            <TextField
              required
              id="outlined-required"
              label="Publication Year"
              type="number"
              onChange={newBookİnp}
              value={newBook.publicationYear}
              name="publicationYear"
              size="small"
            />
            <TextField
              required
              id="outlined-required"
              label="Stock"
              onChange={newBookİnp}
              value={newBook.stock}
              name="stock"
              size="small"
              type="number"
            />
          </Box>

          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="on"
            className="input-box selectBox"
          >
            <Select
              name="author"
              defaultValue={0}
              onChange={authorSelect}
              size="small"
            >
              <MenuItem value={0} disabled>
                Select Author
              </MenuItem>

              {author?.map((item, idx) => (
                <MenuItem value={item.id} key={`${item.name}${idx}`}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>

            <Select
              name="publisher"
              defaultValue={0}
              onChange={publisherSelect}
              size="small"
            >
              <MenuItem value={0} disabled>
                Select Publisher
              </MenuItem>

              {publisher?.map((item, idx) => (
                <MenuItem value={item.id} key={`${item.name}${idx}`}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>

            <Select
              name="categories"
              defaultValue={0}
              onChange={categorySelect}
              size="small"
            >
              <MenuItem value={0} disabled>
                Select Category
              </MenuItem>
              {category?.map((item, idx) => (
                <MenuItem value={item.id} key={`${item.name}${idx}`}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box className="addBox">
            <Button variant="contained" color="success" onClick={sendToBook}>
              ADD TO BOOK
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion className="addİtem">
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>EDİT BOOK</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="on"
            className="input-box"
          >
            <TextField
              required
              id="outlined-required"
              label="Publication Name"
              type="text"
              onChange={editBookİnp}
              value={editBook.name}
              name="name"
              size="small"
            />

            <TextField
              required
              id="outlined-required"
              label="Publication Year"
              type="number"
              onChange={editBookİnp}
              value={editBook.publicationYear}
              name="publicationYear"
              size="small"
            />
            <TextField
              required
              id="outlined-required"
              label="Stock"
              onChange={editBookİnp}
              value={editBook.stock}
              name="stock"
              size="small"
              type="number"
            />
          </Box>

          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="on"
            className="input-box selectBox"
          >
            <Select
              name="author"
              onChange={editAuthorSelect}
              size="small"
              value={selectedAuthor}
            >
              <MenuItem disabled>Select Author</MenuItem>

              {author?.map((item, idx) => (
                <MenuItem value={item.id} key={`${item.name}${idx}`}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>

            <Select
              name="publisher"
              onChange={editPublisherSelect}
              size="small"
              value={selectedPublisher}
            >
              <MenuItem disabled>Select Publisher</MenuItem>

              {publisher?.map((item, idx) => (
                <MenuItem value={item.id} key={`${item.name}${idx}`}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>

            <Select
              name="categories"
              onChange={editCategoriesSelect}
              size="small"
              value={selectedCategories}
            >
              <MenuItem disabled>Select Categories</MenuItem>
              {category?.map((item, idx) => (
                <MenuItem value={item.id} key={`${item.name}${idx}`}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box className="addBox">
            <Button
              variant="contained"
              color="success"
              onClick={sendEditBookİnp}
            >
              CHANGE
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

      <table>
        <thead>
          <tr>
            {tr.map((item, idx) => (
              <th key={`${item}${idx} `}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {books.map((item, idx) => (
            <tr key={`${item}${idx}`}>
              <td className="cursor-icon">
                <ModeEditIcon
                  onClick={() => {
                    handleEditBtn(item);
                  }}
                />
              </td>
              <td>{`${item?.name} (${item?.publicationYear}) Stok:${item?.stock}`}</td>
              <td>{`${item.author?.name} (${item.author?.birthDate}) - ${item.author?.country}`}</td>
              <td>
                {item.categories[0]?.name}-{item.categories[0]?.description}
              </td>
              <td>
                {item.publisher?.name}-{item.publisher?.establishmentYear}
              </td>
              <td>
                <DeleteIcon
                  className="cursor-icon"
                  onClick={() => {
                    removeBook(item);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

*/
