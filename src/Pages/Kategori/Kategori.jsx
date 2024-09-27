import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useContext, useEffect } from "react";
import { BookContext } from "../../Context/BookContext";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Alerts from "../../Components/Alert";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import axios from "axios";

function Kategori() {
  const {
    setCategory,
    category,
    newCategory,
    setNewCategory,
    setUpdate,
    update,
    getCategory,
    editCategory,
    setEditCategory,
    alerts,
    setAlerts,
    setEditing,
    editing
  } = useContext(BookContext);
  const tr = ["Edit", "Name", "Description", "Delete"];

  //Fetches categores when the page loads or 'update' changes.
  useEffect(() => {
    getCategory();
    const timer = setTimeout(() => {
      setAlerts({
        type: "",
        message: "",
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [update]);

  //Captures input changes (gets the name and value).
  const newCategoryİnp = (e) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
    setUpdate(false);
  };

  // Sends the new category data via POST request to the API.
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
        setAlerts({
          type: "success",
          message: "Category Added Successfully",
        });
      })
      .catch(() => {
        setAlerts({
          type: "error",
          message: "Category not added",
        });
        setUpdate(false);
      });
  };
  

  // Deletes the specified category from the API.
  const removeCategory = (item) => {
    axios
      .delete(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories/${item.id}`
      )
      .then(() => {
        setCategory((prev) => prev.filter((items) => items.id !== item.id));
        setUpdate(false);
        setAlerts({
          type: "warning",
          message: "Category successfully deleted",
        });
      })
      .catch(() => {
        setAlerts({
          type: "error",
          message: "Category not deleted",
        });
        setUpdate(false);
      });
  };

  //Sends the updated category data via PUT request to the API.
  const sendEditCategoryİnp = () => {
    axios
      .put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories/${
          editCategory.id
        }`,
        editCategory
      )
      .then(() => {
        setEditCategory({
          id: "",
          name: "",
          description: "",
        });
        setUpdate(false);
        setAlerts({
          type: "info",
          message: "Category successfully change",
        });
        setEditing(false)
      })
      .catch(() => {
        setAlerts({
          type: "error",
          message: `Category information could not be edited`,
        });
        setUpdate(false);
      });
  };

  //Captures input changes (gets the name and value).
  const editCategoryİnp = (e) => {
    const { name, value } = e.target;
    setEditCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //Selects the category to edit and updates the state.
  const handleEditBtn = (item) => {
    setEditCategory(item);
    setEditing((prev) => !prev);
  };

  return (
    <div className="kategori">
      <Alerts type={alerts.type} message={alerts.message} />

      <Accordion className="addİtem">
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>
            {editing ? "EDIT CATEGORY" : "ADD NEW CATEGORY"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
            className="input-box"
          >
            <TextField
              required
              id="outlined-required"
              label="Category Name"
              className=""
              onChange={editing ? editCategoryİnp : newCategoryİnp}
              value={editing ? editCategory.name : newCategory.name}
              name="name"
              size="small"
            />
            <TextField
              required
              id="outlined-required"
              label="Description"
              className=""
              onChange={editing ? editCategoryİnp : newCategoryİnp}
              value={
                editing ? editCategory.description : newCategory.description
              }
              name="description"
              size="small"
            />
            <Button
              variant="contained"
              color="success"
              onClick={editing ? sendEditCategoryİnp : sendToCategory}
            >
              {editing ? "CHANGE CATEGORY" : "ADD TO CATEGORY"}
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
          {category.map((item, idx) => (
            <tr key={`${item}${idx}`}>
              <td className="cursor-icon">
                <ModeEditIcon
                  onClick={() => {
                    handleEditBtn(item);
                  }}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <DeleteIcon
                  className="cursor-icon"
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
