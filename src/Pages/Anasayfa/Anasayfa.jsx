import "../Anasayfa/Anasayfa.css";
import { Link } from "react-router-dom";

function Anasayfa() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Açık Kütüphaneye <br /> Hoşgeldiniz!
        </h1>
        <p>Web sitemize hoş geldiniz, burada sizin için harika şeyler var.</p>

        <div className="hero-buttons">
          <Link to="/Kitap" className="btn btn-secondary">
            Kitapları İncele
          </Link>

          <Link to="/KitapAlma" className="btn btn-secondary">
            Kitap Al
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Anasayfa;
