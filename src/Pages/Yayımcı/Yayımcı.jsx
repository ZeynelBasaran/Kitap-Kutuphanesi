import { useContext, useEffect } from "react";
import { BookContext } from "../../Context/BookContext";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@mui/icons-material/Delete";
import Alerts from "../../Components/Alert";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

function Yayımcı() {
  const {
    publisher,
    setPublisher,
    newPublisher,
    setNewPublisher,
    setAlerts,
    alerts,
    editPublisher,
    setEditPublisher,
    update,
    setUpdate,
    getPublisher,
    editing,
    setEditing,
  } = useContext(BookContext);
  const tr = ["Edit", "Name", "EstablishmentYear", "Address", "Delete"];

  //Fetches publishers when the page loads or 'update' changes.
  useEffect(() => {
    getPublisher();

    const timer = setTimeout(() => {
      setAlerts({
        type: "",
        message: "",
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [update]);

  //Captures input changes (gets the name and value).
  const newPublisherİnp = (e) => {
    const { name, value } = e.target;
    setNewPublisher({
      ...newPublisher,
      [name]: value,
    });
    setUpdate(false);
  };

  // Sends the new publisher data via POST request to the API.
  const sendToPublisher = () => {
    axios
      .post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers`,
        newPublisher
      )
      .then(() => {
        setNewPublisher({
          name: "",
          establishmentYear: "",
          address: "",
        });
        setAlerts({
          type: "success",
          message: "Publisher Added Successfully",
        });
        setUpdate(false);
        console.log(newPublisher)
      })
      .catch(() => {
        setAlerts({
          type: "error",
          message: "Publisher not added",
        });
        setUpdate(false);
      });
  };

  // Deletes the specified publisher from the API.
  const removePublisher = (item) => {
    axios
      .delete(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers/${item.id}`
      )
      .then(() => {
        setPublisher((prev) => prev.filter((items) => items.id !== item.id));
        setAlerts({
          type: "warning",
          message: "Publisher successfully deleted",
        });
        setUpdate(false);
      })
      .catch(() => {
        setAlerts({
          type: "error",
          message: "Publisher not deleted",
        });
        setUpdate(false);
      });
  };

  //Sends the updated publisher data via PUT request to the API.
  const sendEditPublisherİnp = () => {
    console.log(editPublisher);
    axios
      .put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers/${
          editPublisher.id
        }`,
        editPublisher
      )
      .then(() => {
        setEditPublisher({
          id: "",
          name: "",
          establishmentYear: "",
          address: "",
        });
        setUpdate(false);
        setAlerts({
          type: "info",
          message: "Publisher successfully change",
        });
        setEditing(false);
      })
      .catch(() => {
        setAlerts({
          type: "error",
          message: `Book information could not be edited`,
        });
        setUpdate(false);
      });
  };

  //Captures input changes (gets the name and value).
  const editPublisherİnp = (e) => {
    const { name, value } = e.target;
    setEditPublisher((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //Selects the publisher to edit and updates the state.
  const handleEditBtn = (item) => {
    setEditPublisher(item);
    setEditing((prev) => !prev);
  };

  

  return (
    <div className="yayimci">
      <Alerts type={alerts.type} message={alerts.message} />

      <Accordion className="addİtem">
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>
            {editing ? "EDIT PUBLISHER" : "ADD NEW PUBLISHER"}
          </Typography>
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
              label="Publisher Name"
              onChange={editing ? editPublisherİnp : newPublisherİnp}
              value={editing ? editPublisher.name : newPublisher.name}
              name="name"
              size="small"
              type="text"
            />
            <TextField
              required
              id="outlined-required"
              label="Establishment Year"
              type="number"
              onChange={editing ? editPublisherİnp : newPublisherİnp}
              value={
                editing
                  ? editPublisher.establishmentYear
                  : newPublisher.establishmentYear
              }
              name="establishmentYear"
              size="small"
            />
            <TextField
              required
              id="outlined-required"
              label="Address"
              onChange={editing ? editPublisherİnp : newPublisherİnp}
              value={editing ? editPublisher.address : newPublisher.address}
              name="address"
              size="small"
              type="text"
            />
            <Button
              variant="contained"
              color="success"
              onClick={editing ? sendEditPublisherİnp : sendToPublisher}
            >
              {editing ? "CHANGE PUBLISHER" : "ADD"}
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
          {publisher.map((item, idx) => (
            <tr key={`${item}${idx}`}>
              <td className="cursor-icon">
                <ModeEditIcon onClick={() => handleEditBtn(item)} />
              </td>
              <td>{item.name}</td>
              <td>{item.establishmentYear}</td>
              <td>{item.address}</td>
              <td>
                <DeleteIcon
                  className="cursor-icon"
                  onClick={() => removePublisher(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Yayımcı;

/*

 

*/

/*
 <div className="yayimci">
    <Alerts type={alerts.type} message={alerts.message} />

    <Accordion className="addİtem">
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <Typography>ADD NEW PUBLİSHER</Typography>
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
            label="Publisher Name"
            onChange={newPublisherİnp}
            value={newPublisher.name}
            name="name"
            size="small"
            type="text"
          />
          <TextField
            required
            id="outlined-required"
            label="Establishment Year"
            type="number"
            onChange={newPublisherİnp}
            value={newPublisher.establishmentYear}
            name="establishmentYear"
            size="small"
          />
          <TextField
            required
            id="outlined-required"
            label="Address"
            onChange={newPublisherİnp}
            value={newPublisher.address}
            name="address"
            size="small"
            type="text"
          />
          <Button
            variant="contained"
            color="success"
            onClick={sendToPublisher}
          >
            ADD
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
    {editing && (
      <Accordion className="addİtem">
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>EDİT PUBLİSHER</Typography>
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
              label="Publisher Name"
              className=""
              onChange={editPublisherİnp}
              value={editPublisher.name}
              name="name"
              size="small"
            />
            <TextField
              required
              id="outlined-required"
              label="Establishment Year"
              type="number"
              onChange={editPublisherİnp}
              value={editPublisher.establishmentYear}
              name="establishmentYear"
              size="small"
            />
            <TextField
              required
              id="outlined-required"
              label="Address"
              onChange={editPublisherİnp}
              value={editPublisher.address}
              name="address"
              size="small"
            />
            <Button
              variant="contained"
              color="success"
              onClick={(e) => {
                sendEditPublisherİnp(e);
              }}
            >
              CHANGE PUBLİSHER
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    )}

    <table>
      <thead>
        <tr>
          {tr.map((item, idx) => (
            <th key={`${item}${idx} `}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {publisher.map((item, idx) => (
          <tr key={`${item}${idx}`}>
            <td className="cursor-icon">
              <ModeEditIcon
                onClick={() => {
                  handleEditBtn(item);
                }}
              />
            </td>
            <td>{item.name}</td>
            <td>{item.establishmentYear}</td>
            <td>{item.address}</td>
            <td>
              <DeleteIcon
                className="cursor-icon"
                onClick={() => {
                  removePublisher(item);
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
*/
