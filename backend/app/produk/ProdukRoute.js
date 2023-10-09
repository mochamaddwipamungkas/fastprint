import express from "express";
import {
  getAllProduk,
  getProduk,
  getProdukById,
  createProduk,
  updateProduk,
  deleteProduk,
} from "./ProdukController.js";

const router = express.Router();

router.get("/allproduk", getAllProduk);
router.get("/produk", getProduk);
router.get("/produk/:id", getProdukById);
router.post("/produk", createProduk);
router.patch("/produk/:id", updateProduk);
router.delete("/produk/:id", deleteProduk);

export default router;
