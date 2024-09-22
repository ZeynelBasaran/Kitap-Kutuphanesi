import { useEffect, useContext } from "react";
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
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import "./kitap.css"

const kitap = [
  {
    id: 0,
    name: "string",
    publicationYear: 0,
    stock: 0,
    author: {
      id: 0,
      name: "string",
      birthDate: "2024-09-20",
      country: "string",
    },
    publisher: {
      id: 0,
      name: "string",
      establishmentYear: 0,
      address: "string",
    },
    categories: [
      {
        id: 0,
        name: "string",
        description: "string",
      },
    ],
  },
];

function Kitap() {
  const { newBook, setNewBook, setBooks } = useContext(BookContext);

  //Get to Book
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/books`)
      .then((res) => setBooks(res.data));
  }, [newBook]);

  const newBookİnp = (e) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value,
    });
    console.log(newBook);
  };
  //Add New Book
  const sendToBook = () => {
    axios
      .post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers`, newBook)
      .then((response) => {
        console.log("Veri başarıyla gönderildi:", response.data);
        setNewBook({
          name: "",
          establishmentYear: "",
          address: "",
        });
      })
      .catch((error) => {
        console.error("Bir hata oluştu:", error);
      });
  };

  return (
    <div className="kitap">
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
              label="Publication Year"
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
          <div>
            <Button variant="contained" color="success" onClick={sendToBook}>
              ADD
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Kitap;
