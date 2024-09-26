import { useContext, useEffect } from "react";
import { BookContext } from "../../Context/BookContext";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import "./yayimci.css";
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
  } = useContext(BookContext);
  const tr = ["Edit", "Name", "EstablishmentYear", "Address", "Delete"];

  //Get to Publishers
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

  //Add New Publisher İnput value
  const newPublisherİnp = (e) => {
    const { name, value } = e.target;
    setNewPublisher({
      ...newPublisher,
      [name]: value,
    });
    setUpdate(false);
  };
  //Add New Publisher post
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
      })
      .catch(() => {
        setAlerts({
          type: "error",
          message: "Publisher not added",
        });
        setUpdate(false);
      });
  };

  //Remove Publisher
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
      }).catch(()=>{
        setAlerts({
          type: "error",
          message: "Publisher not deleted",
        });
        setUpdate(false)
      });
  };

  //Edit Publisher
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
      }).catch(()=> {
        setAlerts({
          type: "error",
          message: `Book information could not be edited`,
        });
        setUpdate(false);
      });
  };

  //Edit Publisher İnp Value
  const editPublisherİnp = (e) => {
    const { name, value } = e.target;
    setEditPublisher((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(editPublisher);
  };
  //Edit Publisher Button
  const handleEditBtn = (item) => {
    setEditPublisher(item);
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
  );
}

export default Yayımcı;

/*



*/
