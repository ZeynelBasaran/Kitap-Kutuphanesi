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
    alerts
  } = useContext(BookContext);
  const tr = ["Edit", "Name", "BirthDate", "Country", "Delete"];

  useEffect(() => {
    getAuthor();
  }, [update]);

  const newAuthorİnp = (e) => {
    const { name, value } = e.target;
    setNewAuthor({
      ...newAuthor,
      [name]: value,
    });
    setUpdate(false);
  };

  //Remove Author
  const removeAuthor = (item) => {
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/authors/${item.id}`)
      .then(() => {
        setAuthor((prev) => prev.filter((items) => items.id !== item.id));
        setUpdate(false);
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
        setUpdate(false);
      })
      .catch((error) => {
        console.error("Bir hata oluştu:", error);
      });
  };

  //Edit Author
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
      });
  };

  //Edit Author İnp Value
  const editAuthorİnp = (e) => {
    const { name, value } = e.target;
    setEditAuthor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //Edit Author Button
  const handleEditBtn = (item) => {
    setEditAuthor(item);
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
            <Button variant="contained" color="success" onClick={sendToAuthor}>
              ADD AUTHOR
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
          <Typography>EDİT TO AUTHOR</Typography>
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
              onChange={editAuthorİnp}
              value={editAuthor.name}
              name="name"
              size="small"
            />

            <TextField
              required
              id="outlined-required"
              label=""
              type="date"
              onChange={editAuthorİnp}
              value={editAuthor.birthDate}
              name="birthDate"
              size="small"
            />
            <TextField
              required
              id="outlined-required"
              label="Country"
              onChange={editAuthorİnp}
              value={editAuthor.country}
              name="country"
              size="small"
              type="text"
            />
            <Button
              variant="contained"
              color="success"
              onClick={sendEditAuthorİnp}
            >
              CHANGE AUTHOR
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
