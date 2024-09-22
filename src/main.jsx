import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import BookContextComp from "./Context/BookContext.jsx";

createRoot(document.getElementById("root")).render(
  <BookContextComp>
    <App />
  </BookContextComp>
);
