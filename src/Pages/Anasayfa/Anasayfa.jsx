
import { Link } from "react-router-dom";

function Anasayfa() {
  return (
    <section className="anasayfa">
      <div className="hero-content">
        <h1>
        Welcome  <br />to Open  Library!
        </h1>
        <p style={{margin:"20px"}}>Welcome to our website, we have some great stuff for you here.</p>

        <div className="hero-buttons">
          <Link to="/Kitap" className="btn btn-secondary">
            Books
          </Link>

          <Link to="/KitapAlma" className="btn btn-secondary">
            Borrowing Book
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Anasayfa;
