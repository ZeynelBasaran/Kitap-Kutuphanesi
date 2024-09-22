
import İmage1 from "/public/bg-book.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={İmage1} alt="" />
            
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
