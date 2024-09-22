import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useContext, useEffect } from "react";
import { BookContext } from "../../Context/BookContext";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import "./yazar.css";

function Yazar() {
  const { author, setAuthor, newAuthor, setNewAuthor } =
    useContext(BookContext);
  const tr = ["Name", "BirthDate", "Country", "Delete"];

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/authors`)
      .then((res) => setAuthor(res.data));
  }, [newAuthor]);

  const newAuthorİnp = (e) => {
    const { name, value } = e.target;
    setNewAuthor({
      ...newAuthor,
      [name]: value,
    });
  };

  //Remove Author
  const removeAuthor = (item) => {
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/authors/${item.id}`)
      .then(() => {
        setAuthor((prev) => prev.filter((items) => items.id !== item.id));
      });
  };

  const sendToAuthor = () => {
    axios
      .post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/authors`, newAuthor)
      .then((response) => {
        console.log("Veri başarıyla gönderildi:", response.data);
        setNewAuthor({
          name: "",
          birthDate: "",
          country: "",
        });
      })
      .catch((error) => {
        console.error("Bir hata oluştu:", error);
      });
  };

  return (
    <div className="yazar">
      <Accordion className="addİtem">
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>ADD NEW AUTHOR</Typography>
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
              label="Author Name"
              type="text"
              onChange={newAuthorİnp}
              value={newAuthor.name}
              name="name"
              size="small"
            />

            <TextField
              required
              id="outlined-required"
              label=""
              type="date"
              onChange={newAuthorİnp}
              value={newAuthor.birthDate}
              name="birthDate"
              size="small"
              helperText="Birthdate"
            />
            <TextField
              required
              id="outlined-required"
              label="Country"
              onChange={newAuthorİnp}
              value={newAuthor.country}
              name="country"
              size="small"
              type="text"
            />
          </Box>
          <div>
            <Button variant="contained" color="success" onClick={sendToAuthor}>
              ADD AUTHOR
            </Button>
          </div>
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
          {author.map((item, idx) => (
            <tr key={`${item}${idx}`}>
              <td>{item.name}</td>
              <td>{item.birthDate}</td>
              <td>{item.country}</td>
              <td>
                <DeleteIcon className="delete-icon"
                  onClick={() => {
                    removeAuthor(item);
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

export default Yazar;
