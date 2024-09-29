
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>We are a team that aims for excellence..</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: zeynelbasaran@hotmail.com</p>
            <p>Telefon: (534) 847 74 71</p>
          </div>
          <div className="footer-section">
            <h4>Links</h4>
            <ul>
              <li>
                <Link to="/Yayımcı">PUBLİSHER</Link>
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

              <li>
                <Link to="/KitapAlma">BORROWİNG BOOK</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Tüm Hakları Saklıdır.</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
