import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Hakkımızda</h4>
            <p>Biz, mükemmeliyeti hedefleyen bir ekibiz.</p>
          </div>
          <div className="footer-section">
            <h4>İletişim</h4>
            <p>Email: zeynelbasaran@hotmail.com</p>
            <p>Telefon: (534) 847 74 71</p>
          </div>
          <div className="footer-section">
            <h4>Bağlantılar</h4>
            <ul>
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

              <li>
                <Link to="/KitapAlma">Kitap Al</Link>
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
