
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

              <li>
                <Link to="/KitapAlma">Borrowing Book</Link>
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
