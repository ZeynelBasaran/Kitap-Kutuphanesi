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
            <Link to="/Yayımcı">Yayımcı</Link>
          </li>
          <li>
            <Link to="/Kategori">Kategori</Link>
          </li>
          <li>
            <Link to="/Kitap">Kitap</Link>
          </li>
          <li>
            <Link to="/Yazar">Yazar</Link>
          </li>
        </ul>
        <ul className="menu2">
          <li>
            <Link to="/KitapAlma">Kitap Al</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
