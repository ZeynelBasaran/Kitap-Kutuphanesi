import { useEffect, useContext, useState } from "react";
import { BookContext } from "../../Context/BookContext";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Alerts from "../../Components/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function KitapAlma() {
  const {
    borrow,
    newBorrow,
    setEditBorrow,
    editBorrow,
    setNewBorrow,
    setBorrow,
    getAuthor,
    getBooks,
    getCategory,
    getPublisher,
    update,
    getBorrow,
    alerts,
    setUpdate,
    setAlerts,
    books,
    editing,
    setEditing,
  } = useContext(BookContext);
  const tr = [
    "Edit",
    "Borrower Name",
    "Borrower Mail",
    "Borrowing Date",
    "Return Date",
    "Book İnfo",
    "Delete",
  ];

  //Fetches authors, publishers, categories, books, and borrow records when the page loads or 'update' changes.
  useEffect(() => {
    getAuthor();
    getPublisher();
    getCategory();
    getBooks();
    getBorrow();

    const timer = setTimeout(() => {
      setAlerts({
        type: "",
        message: "",
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [update]);

  //Sends new borrow record data to the API with a POST request.
  const sendToBorrow = () => {
    axios
      .post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/borrows`, newBorrow)
      .then((response) => {
        console.log("Veri başarıyla gönderildi:", response.data);
        setNewBorrow({
          id: "0",
          borrowerName: "",
          borrowerMail: "",
          borrowingDate: "",
          returnDate: "",
          book: {
            id: 0,
            name: "",
            publicationYear: 0,
            stock: 0,
            author: {
              id: 0,
              name: "",
              birthDate: "",
              country: "",
            },
            publisher: {
              id: 0,
              name: "",
              establishmentYear: 0,
              address: "",
            },
            categories: [
              {
                id: 0,
                name: "",
                description: "",
              },
            ],
          },
        });
        setUpdate(false);
        setAlerts({
          type: "success",
          message: "Borrow Added Successfully",
        });
        
      })
      .catch(() => {
        setAlerts({
          type: "error",
          message: "Borrow not added",
        });
        setUpdate(false);
      });
  };

  //Captures input field changes (name and value).
  const newBorrowİnp = (e) => {
    const { name, value } = e.target;
    setNewBorrow({
      ...newBorrow,
      [name]: value,
    });
  };

  //Captures the selected book from the dropdown.
  const booksSelect = (e) => {
    const { value } = e.target;
    console.log(value)
    const selectBooks = books.find((item) => item.id === value);
    setNewBorrow((prev) => ({
      ...prev,
      bookForBorrowingRequest: selectBooks,
    }));
    
  };

  // Sends a DELETE request to remove the selected borrow record from the API.

  const removeBorrow = (item) => {
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/borrows/${item.id}`)
      .then(() => {
        setBorrow((prev) => prev.filter((items) => items.id !== item.id));
        setAlerts({
          type: "warning",
          message: "Borrow successfully deleted",
        });
        setUpdate(false);
      })
      .catch(() => {
        setAlerts({
          type: "error",
          message: "Borrow not deleted",
        });
        setUpdate(false);
      });
  };

  //Sends updated borrow record data to the API via PUT request.
  const sendEditBorrowİnp = () => {
    axios
      .put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/borrows/${editBorrow.id}`,
        editBorrow
      )
      .then(() => {
        setEditBorrow({
          id: "0",
          borrowerName: "",
          borrowerMail: "",
          borrowingDate: "",
          returnDate: "",
          book: {
            id: 0,
            name: "",
            publicationYear: 0,
            stock: 0,
            author: {
              id: 0,
              name: "",
              birthDate: "",
              country: "",
            },
            publisher: {
              id: 0,
              name: "",
              establishmentYear: 0,
              address: "",
            },
            categories: [
              {
                id: 0,
                name: "",
                description: "",
              },
            ],
          },
        });
        setUpdate(false);
        setAlerts({
          type: "info",
          message: "Borrow successfully change",
        });
        setEditing(false);
      })
      .catch(() => {
        setAlerts({
          type: "error",
          message: "Borrow not added",
        });
        setUpdate(false);
      });
  };

  //Captures input field changes (name and value).
  const editBorrowİnp = (e) => {
    const { name, value } = e.target;
    setEditBorrow((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Sets the selected borrow record's data in the form fields for editing.
  const handleEditBtn = (item) => {
    setEditBorrow(item);
    setEditing((prev) => !prev);
  };

  return (
    <div className="kitapal">
      <Alerts type={alerts.type} message={alerts.message} />

      <Accordion className="addİtem">
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>{editing ? "EDIT BORROW" : "ADD NEW BORROW"}</Typography>
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
              label="Borrower Name"
              type="text"
              onChange={editing ? editBorrowİnp : newBorrowİnp}
              value={editing ? editBorrow.borrowerName : newBorrow.borrowerName}
              name="borrowerName"
              size="small"
            />

            {!editing && (
              <TextField
                required
                id="outlined-required"
                label="Borrower Mail"
                type="mail"
                onChange={newBorrowİnp}
                value={newBorrow.borrowerMail}
                name="borrowerMail"
                size="small"
              />
            )}

            <TextField
              style={{ marginTop: "32px" }}
              required
              id="outlined-required"
              helperText="Borrowing Date"
              onChange={editing ? editBorrowİnp : newBorrowİnp}
              value={
                editing ? editBorrow.borrowingDate : newBorrow.borrowingDate
              }
              name="borrowingDate"
              size="small"
              type="date"
            />

            {editing && (
              <TextField
                style={{ marginTop: "30px" }}
                required
                id="outlined-required"
                onChange={editBorrowİnp}
                name="returnDate"
                size="small"
                type="date"
                helperText="Return Date"
              />
            )}
          </Box>

          {!editing && (
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
              noValidate
              autoComplete="on"
              className="input-box selectBox"
            >
              <Select
                name="author"
                defaultValue={0}
                onChange={booksSelect}
                size="small"
              >
                <MenuItem value={0} disabled>
                  Select Book
                </MenuItem>

                {books?.map((item, idx) => (
                  <MenuItem value={item.id} key={`${item.name}${idx}`}>
                    {item.name}
                    {` (${item.publicationYear})`}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          )}

          <Box className="addBox">
            <Button
              variant="contained"
              color="success"
              onClick={editing ? sendEditBorrowİnp : sendToBorrow}
            >
              {editing ? "CHANGE BORROW" : "ADD BORROW"}
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
          {borrow?.map((item, idx) => (
            <tr key={`${item}${idx}`}>
              <td className="cursor-icon">
                <ModeEditIcon
                  onClick={() => {
                    handleEditBtn(item);
                  }}
                />
              </td>
              <td>{item.borrowerName}</td>
              <td>{item.borrowerMail}</td>
              <td>{item.borrowingDate}</td>
              <td>{item.returnDate}</td>
              <td>{`${item.book.name} (${item.book.publicationYear})`}</td>
              <td>
                <DeleteIcon
                  className="cursor-icon"
                  onClick={() => {
                    removeBorrow(item);
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

export default KitapAlma;

