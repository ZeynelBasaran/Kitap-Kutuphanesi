
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import { BrowserRouter } from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Hero />
    </BrowserRouter>
  );
}

export default App;
