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
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import "./kategori.css";

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
    setAlerts
  } = useContext(BookContext);
  const tr = ["Edit","Name", "Description", "Delete"];
  
  //Get to Category
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

  //Add New Publisher post
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
      }).catch(() => {
        setAlerts({
          type: "error",
          message: "Category not added",
        });
        setUpdate(false);
      });
     
  };
  //Add New Publisher İnput value
  const newCategoryİnp = (e) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
    setUpdate(false);
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
        setAlerts({
          type: "warning",
          message: "Category successfully deleted",
        });
      }).catch(()=>{
        setAlerts({
          type: "error",
          message: "Category not deleted",
        });
        setUpdate(false);
      });
  };

  //Edit Category
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
          id:"",
          name: "",
          description: "",
        });
        setUpdate(false);
        setAlerts({
          type: "info",
          message: "Category successfully change",
        });
      }).catch(()=> {
        setAlerts({
          type: "error",
          message: `Category information could not be edited`,
        });
        setUpdate(false);
      });
  };

  //Edit Category İnp Value
  const editCategoryİnp = (e) => {
    const { name, value } = e.target;
    setEditCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(editCategory,"input")
    
  };
  //Edit Publisher Button event
  const handleEditBtn = (item) => {
    setEditCategory(item);
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
            <Button
              variant="contained"
              color="success"
              onClick={sendToCategory}
            >
              ADD TO CATEGORY
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
          <Typography>EDİT CATEGORY</Typography>
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
              type="text"
              onChange={editCategoryİnp}
              value={editCategory.name}
              name="name"
              size="small"
            />
            <TextField
              required
              id="outlined-required"
              label="Description"
              type="text"
              onChange={editCategoryİnp}
              value={editCategory.description}
              name="description"
              size="small"
            />
            <Button
              variant="contained"
              color="success"
              onClick={sendEditCategoryİnp}
            >
              CHANGE CATEGORY
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
