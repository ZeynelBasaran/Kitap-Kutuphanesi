import { Link } from "react-router-dom";
import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStoriesTwoTone";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <AutoStoriesTwoToneIcon fontSize="large" />
          </Link>
        </div>
        <ul className="menu1">
          <li>
            <Link to="/Yayımcı">Publisher</Link>
          </li>
          <li>
            <Link to="/Kategori">Category</Link>
          </li>
          <li>
            <Link to="/Kitap">Book</Link>
          </li>
          <li>
            <Link to="/Yazar">Author</Link>
          </li>
        </ul>
        <ul className="menu2">
          <li>
            <Link to="/KitapAlma">Borrowing Book</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
