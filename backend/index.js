import express from "express";
import cors from "cors";
import ProdukRoute from "./app/produk/ProdukRoute.js";
import KategoriRoute from "./app/kategori/KategoriRoute.js";
import StatusRoute from "./app/status/StatusRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(ProdukRoute);
app.use(KategoriRoute);
app.use(StatusRoute);

app.listen(5001, () => console.log("Server up and running..."));
