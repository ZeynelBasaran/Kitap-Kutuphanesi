import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useContext, useEffect } from "react";
import { BookContext } from "../../Context/BookContext";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import "./kategori.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Alerts from "../../Components/Alert";


import axios from "axios";

function Kategori() {
  const {
    setCategory,
    category,
    newCategory,
    setNewCategory,
    setUpdate,
    update,
    getCategory
  } = useContext(BookContext);
  const tr = ["Name", "Desription", "Delete"];
  useEffect(() => {
    

    getCategory();
  }, [update]);

  const newCategoryİnp = (e) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
    setUpdate(false);
  };

  const sendToCategory = () => {
    axios
      .post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories`,
        newCategory
      )
      .then((response) => {
        console.log("Veri başarıyla gönderildi:", response.data);
        setNewCategory({
          name: "",
          description: "",
        });
        setUpdate(false);
      })
      .catch((error) => {
        console.error("Bir hata oluştu:", error);
      });
  };

  //Remove Category
  const removeCategory = (item) => {
    axios
      .delete(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories/${item.id}`
      )
      .then(() => {
        setCategory((prev) => prev.filter((items) => items.id !== item.id));
        setUpdate(false);
      });
  };

  return (
    <div className="kategori">
      <Alerts severity={"info"} />

      <Accordion className="addİtem">
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>ADD NEW CATEGORY</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
            className="input-box"
          >
            <div>
              <TextField
                required
                id="outlined-required"
                label="Category Name"
                className=""
                onChange={newCategoryİnp}
                value={newCategory.name}
                name="name"
                size="small"
              />
              <TextField
                required
                id="outlined-required"
                label="Description"
                className=""
                onChange={newCategoryİnp}
                value={newCategory.description}
                name="description"
                size="small"
              />
            </div>
          </Box>

          <div>
            <Button
              variant="contained"
              color="success"
              onClick={sendToCategory}
            >
              ADD TO CATEGORY
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
          {category.map((item, idx) => (
            <tr key={`${item}${idx}`}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <DeleteIcon
                  className="delete-icon"
                  onClick={() => {
                    removeCategory(item);
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

export default Kategori;
