import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import TambahProduk from "./component/TambahProduk";
import "./index.css";
import Navbar from "./component/Navbar";
import EditProduk from "./component/EditProduk";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tambahproduk" element={<TambahProduk />} />
        <Route path="/editproduk/:id" element={<EditProduk />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
