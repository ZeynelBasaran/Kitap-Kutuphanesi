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
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Alerts from "../../Components/Alert";

function Yazar() {
  const {
    author,
    setAuthor,
    newAuthor,
    setNewAuthor,
    update,
    getAuthor,
    setUpdate,
    editAuthor,
    setEditAuthor,
    alerts,
    setAlerts,
    editing,
    setEditing,
  } = useContext(BookContext);
  const tr = ["Edit", "Name", "BirthDate", "Country", "Delete"];

  //Fetches authors when the page loads or 'update' changes.
  useEffect(() => {
    getAuthor();
    const timer = setTimeout(() => {
      setAlerts({
        type: "",
        message: "",
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [update]);

  //Captures input changes (gets the name and value).
  const newAuthorİnp = (e) => {
    const { name, value } = e.target;
    setNewAuthor({
      ...newAuthor,
      [name]: value,
    });
    setUpdate(false);
  };

  // Sends the new category data via POST request to the API.
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
        setUpdate(false);
        setAlerts({
          type: "success",
          message: "Author Added Successfully",
        });
      })
      .catch(() => {
        setAlerts({
          type: "error",
          message: "Author not added",
        });
        setUpdate(false);
      });
  };

  // Deletes the specified author from the API.
  const removeAuthor = (item) => {
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/authors/${item.id}`)
      .then(() => {
        setAuthor((prev) => prev.filter((items) => items.id !== item.id));
        setUpdate(false);
        setAlerts({
          type: "warning",
          message: "Author successfully deleted",
        });
      })
      .catch(() => {
        setAlerts({
          type: "error",
          message: "Author not deleted",
        });
        setUpdate(false);
      });
  };

  //Sends the updated author data via PUT request to the API.
  const sendEditAuthorİnp = () => {
    axios
      .put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/authors/${editAuthor.id}`,
        editAuthor
      )
      .then(() => {
        setEditAuthor({
          id: "",
          name: "",
          birthDate: "",
          country: "",
        });
        setUpdate(false);
        setAlerts({
          type: "info",
          message: "Author successfully change",
        });
        setEditing(false);
      })
      .catch(() => {
        setAlerts({
          type: "error",
          message: "Author not deleted",
        });
        setUpdate(false);
      });
  };

   //Captures input changes (gets the name and value).
  const editAuthorİnp = (e) => {
    const { name, value } = e.target;
    setEditAuthor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Selects the author to edit and updates the state.
  const handleEditBtn = (item) => {
    setEditAuthor(item);
    setEditing((prev) => !prev);
  };

  return (
    <div className="yazar">
      <Alerts type={alerts.type} message={alerts.message} />
      <Accordion className="addİtem">
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>{editing ? "EDIT AUTHOR" : "ADD NEW AUTHOR"}</Typography>
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
              onChange={editing ? editAuthorİnp : newAuthorİnp}
              value={editing ? editAuthor.name : newAuthor.name}
              name="name"
              size="small"
            />

            <TextField
              style={{ marginTop: "32px" }}
              required
              id="outlined-required"
              helperText="Birth Date"
              type="date"
              onChange={editing ? editAuthorİnp : newAuthorİnp}
              value={editing ? editAuthor.birthDate : newAuthor.birthDate}
              name="birthDate"
              size="small"
            />

            <TextField
              required
              id="outlined-required"
              label="Country"
              onChange={editing ? editAuthorİnp : newAuthorİnp}
              value={editing ? editAuthor.country : newAuthor.country}
              name="country"
              size="small"
              type="text"
            />
            <Button
              variant="contained"
              color="success"
              onClick={editing ? sendEditAuthorİnp : sendToAuthor}
            >
              {editing ? "CHANGE AUTHOR" : "ADD AUTHOR"}
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
          {author?.map((item, idx) => (
            <tr key={`${item}${idx}`}>
              <td className="cursor-icon">
                <ModeEditIcon
                  onClick={() => {
                    handleEditBtn(item);
                  }}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.birthDate}</td>
              <td>{item.country}</td>
              <td>
                <DeleteIcon
                  className="cursor-icon"
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
