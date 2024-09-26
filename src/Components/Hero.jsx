
import { Route, Routes } from "react-router-dom";
import Yayımcı from "../Pages/Yayımcı/Yayımcı.jsx";
import Kategori from "../Pages/Kategori/Kategori.jsx";
import Kitap from "../Pages/Kitap/Kitap.jsx";
import Yazar from "../Pages/Yazar/Yazar.jsx";
import KitapAlma from "../Pages/KitapAl/KitapAl.jsx";
import Anasayfa from "../Pages/Anasayfa/Anasayfa.jsx";

function Hero() {
  return (
    <Routes>
      <Route path="/" element={<Anasayfa />}></Route>
      <Route path="/Yayımcı" element={<Yayımcı />}></Route>
      <Route path="/Kategori" element={<Kategori />}></Route>
      <Route path="/Kitap" element={<Kitap />}></Route>
      <Route path="/Yazar" element={<Yazar />}></Route>
      <Route path="/KitapAlma" element={<KitapAlma />}></Route>
    </Routes>
  );
}

export default Hero;
