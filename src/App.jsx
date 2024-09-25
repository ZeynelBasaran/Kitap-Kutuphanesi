import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Hero />
      <Footer />
    </BrowserRouter>
   
  );
}

export default App;
