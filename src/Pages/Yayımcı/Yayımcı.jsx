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
import DeleteIcon from '@mui/icons-material/Delete';
import Alerts from "../../Components/Alert";

function Yayımcı() {
  const {
    publisher,
    setPublisher,
    newPublisher,
    setNewPublisher,
  } = useContext(BookContext);
  const tr = ["Name", "EstablishmentYear", "Address", "Delete"];

  //Get to Publisher
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers`)
      .then((res) => setPublisher(res.data));
  }, [newPublisher]);


  //RemovePublisher
  const removePublisher = (item) => {
    axios
      .delete(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers/${item.id}`
      )
      .then(() => {
        setPublisher((prev) => prev.filter((items) => items.id !== item.id));
      });
  };

  //Add New Publisher İnput
  const newPublisherİnp = (e) => {
    const { name, value } = e.target;
    setNewPublisher({
      ...newPublisher,
      [name]: value,
    });
  };

  //Add New Publisher post
  const sendToPublisher = () => {
    axios
      .post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers`,
        newPublisher
      )
      .then((response) => {
        console.log("Veri başarıyla gönderildi:", response.data);
        setNewPublisher({
          name: "",
          establishmentYear: "",
          address: "",
        });
      })
      .catch((error) => {
        console.error("Bir hata oluştu:", error);
      });
  };

  /*
          **js
      ---Change işi kaldı öyle 
  const changePublisher = (item) => {
    axios
      .put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers/${item.id}`,
        {
          name: "",
          establishmentYear: "",
          address: "",
        }
      )
      .then((res) => {
        console.log(item);
        console.log(res);
        //setPublisher((prev) => prev.filter((items) => items.id !== item.id));
      });
  };


           **html
  <td
                onClick={() => {
                  changePublisher(item);
                }}
              >
                Change
              </td>



              **html
              <ul className="changeİTem">
        <h1>Change İtem</h1>
        <input type="text" name="name" />
        <input type="text" name="establishmentYear" />
        <input type="text" name="address" />
      </ul>
*/
  
  return (
    <div className="yayimci">
      <Alerts type={"info"} message={"deneme"} />


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
              className=""
              onChange={newPublisherİnp}
              value={newPublisher.name}
              name="name"
              size="small"
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
            />
          </Box>
          <div>
            <Button
              variant="contained"
              color="success"
              onClick={sendToPublisher}
            >
              ADD
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
          {publisher.map((item, idx) => (
            <tr key={`${item}${idx}`}>
              <td>{item.name}</td>
              <td>{item.establishmentYear}</td>
              <td>{item.address}</td>
              <td
                
              >
               <DeleteIcon className="delete-icon" onClick={() => {
                  removePublisher(item);
                }}/>
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
