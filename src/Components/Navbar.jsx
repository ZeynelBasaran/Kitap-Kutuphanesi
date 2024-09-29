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
            <Link to="/Yayımcı">PUBLISHER</Link>
          </li>
          <li>
            <Link to="/Kategori">CATEGORY</Link>
          </li>
          <li>
            <Link to="/Kitap">BOOK</Link>
          </li>
          <li>
            <Link to="/Yazar">AUTHOR</Link>
          </li>
        </ul>
        <ul className="menu2">
          <li>
            <Link to="/KitapAlma">BORROWING BOOK</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
