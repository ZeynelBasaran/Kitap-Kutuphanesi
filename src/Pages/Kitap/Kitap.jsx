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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./kitap.css";

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
  } = useContext(BookContext);

  //Get to Book
  useEffect(() => {
    getAuthor();
    getPublisher();
    getCategory();
    getBooks();
  }, [update]);

  //Send to new Book Database
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
        setUpdate(false);
      })
      .catch((error) => {
        console.error("Bir hata oluştu:", error);
      });
  };

  //Add New Book
  const newBookİnp = (e) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value,
    });
    
  };

  const authorSelect = (e) => {
    const { value } = e.target;
    const selectAuthor = author.find((item) => item.id === value);
    const selectPublisher = publisher.find((item) => item.id === value);
    //const selectCategory = category.find((item) => item.id === value);

    console.log(selectPublisher);
    setNewBook((prev) => ({
      ...prev,
      author: selectAuthor,
      publisher:[selectPublisher],
      //categories:selectCategory,
    }));
    console.log(newBook);
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

          <div>
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
                <MenuItem value={item.id} key={`${item}${idx}`}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>

            <Select
              name="publisher"
              defaultValue={0}
              onChange={authorSelect}
              size="small"
            >
              <MenuItem value={0} disabled>
                Select Publisher
              </MenuItem>
              {publisher?.map((item, idx) => (
                <option value={item.id} key={`${item}${idx}`}>
                  {item.name}
                </option>
              ))}
            </Select>

            <Select
              name="categories"
              defaultValue={0}
              onChange={authorSelect}
              size="small"
            >
              <MenuItem value={0} disabled>
                Select Category
              </MenuItem>
              {category?.map((item, idx) => (
                <option value={item.id} key={`${item}${idx}`}>
                  {item.name}
                </option>
              ))}
            </Select>
          </div>

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

/*


        
           

          

*/
