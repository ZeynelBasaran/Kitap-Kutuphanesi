import { useEffect, useContext } from "react";
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
import "./kitapalma.css";

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
    setBooks,
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

  //Get Database Author,Publisher,Category,Books,Borrow
  useEffect(() => {
    getAuthor();
    getPublisher();
    getCategory();
    getBooks();
    getBorrow();
  }, [update]);

  //Send to new Borrow Database
  const sendToBorrow = () => {
    console.log("bitti", newBorrow);
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
      })
      .catch((error) => {
        console.error("Bir hata oluştu:", error);
      });
  };

  //Add New Borrow İnput and select value
  const newBorrowİnp = (e) => {
    const { name, value } = e.target;
    setNewBorrow({
      ...newBorrow,
      [name]: value,
    });
  };

  const booksSelect = (e) => {
    const { value } = e.target;
    const selectAuthor = books.find((item) => item.id === value);
    setNewBorrow((prev) => ({
      ...prev,
      bookForBorrowingRequest: selectAuthor,
    }));
  };

  //Remove Borrow
  const removeBorrow = (item) => {
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/borrows/${item.id}`)
      .then(() => {
        setBorrow((prev) => prev.filter((items) => items.id !== item.id));
        setAlerts({
          type: "error",
          message: "Publisher successfully deleted",
        });
        setUpdate(false);
      });
  };

  //Edit Publisher
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
      });
  };

  //Edit Publisher İnput ve select value
  const editBorrowİnp = (e) => {
    const { name, value } = e.target;
    setEditBorrow((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log();
  };

  const bookSelect = (e) => {
    const { value } = e.target;
    const selectBooks = books.find((item) => item.id === value);
    setBooks((prev) => ({
      ...prev,
      books: selectBooks,
    }));
  };

  console.log(borrow);

  //Edit Publisher Button
  const handleEditBtn = (item) => {
    setEditBorrow(item);
  };

  return (
    <>
      <div className="kitapalma">
        <Alerts type={alerts.type} message={alerts.message} />

        <Accordion className="addİtem">
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>ADD NEW BORROW</Typography>
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
                onChange={newBorrowİnp}
                value={newBorrow.borrowerName}
                name="borrowerName"
                size="small"
              />

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
              <TextField
                required
                id="outlined-required"
                label="Borrowing Date"
                onChange={newBorrowİnp}
                value={newBorrow.borrowingDate}
                name="borrowingDate"
                size="small"
                type="date"
              />
              <TextField
                required
                id="outlined-required"
                label="Return Date"
                onChange={newBorrowİnp}
                value={newBorrow.returnDate}
                name="returnDate"
                size="small"
                type="date"
              />
            </Box>

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

            <Box className="addBox">
              <Button
                variant="contained"
                color="success"
                onClick={sendToBorrow}
              >
                ADD BORROW
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
            <Typography>EDİT BORROW</Typography>
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
                label="Publication Name"
                type="text"
                onChange={editBorrowİnp}
                value={editBorrow.borrowerName}
                name="borrowerName"
                size="small"
              />

              <TextField
                required
                id="outlined-required"
                label="Publication Year"
                type="number"
                onChange={editBorrowİnp}
                value={editBorrow.publicationYear}
                name="publicationYear"
                size="small"
              />
              <TextField
                required
                id="outlined-required"
                label="Stock"
                onChange={editBorrowİnp}
                value={editBorrow.stock}
                name="stock"
                size="small"
                type="number"
              />
            </Box>

            <Box className="addBox">
              <Button
                variant="contained"
                color="success"
                onClick={sendEditBorrowİnp}
              >
                CHANGE
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
            {borrow.map((item, idx) => (
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
    </>
  );
}

export default KitapAlma;

/*




              */