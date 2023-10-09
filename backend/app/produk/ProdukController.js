import Kategori from "../kategori/KategoriModel.js";
import Produk from "./ProdukModel.js";
import Status from "../status/StatusModel.js";

export const getAllProduk = async (req, res) => {
  try {
    const response = await Produk.findAll({
      include: [
        {
          model: Kategori,
        },
        {
          model: Status,
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const getProduk = async (req, res) => {
  try {
    const response = await Produk.findAll({
      where: {
        id_status: 1,
      },
      include: [
        {
          model: Kategori,
        },
        {
          model: Status,
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getProdukById = async (req, res) => {
  try {
    const response = await Produk.findOne({
      where: {
        id_produk: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createProduk = async (req, res) => {
  try {
    await Produk.create(req.body);
    res.status(201).json({ msg: "Produk Created" });
  } catch (error) {
    res.send(error);
  }
};

export const updateProduk = async (req, res) => {
  try {
    await Produk.update(req.body, {
      where: {
        id_produk: req.params.id,
      },
    });
    res.status(200).json({ msg: "Produk Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduk = async (req, res) => {
  try {
    await Produk.destroy({
      where: {
        id_produk: req.params.id,
      },
    });
    res.status(200).json({ msg: "Produk Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
