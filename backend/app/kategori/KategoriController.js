import Kategori from "./KategoriModel.js";

export const getKategori = async (req, res) => {
  try {
    const response = await Kategori.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getKategoriById = async (req, res) => {
  try {
    const response = await Kategori.findOne({
      where: {
        id_kategori: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createKategori = async (req, res) => {
  try {
    await Kategori.create(req.body);
    res.status(201).json({ msg: "Kategori Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateKategori = async (req, res) => {
  try {
    await Kategori.update(req.body, {
      where: {
        id_kategori: req.params.id,
      },
    });
    res.status(200).json({ msg: "Kategori Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteKategori = async (req, res) => {
  try {
    await Kategori.destroy({
      where: {
        id_kategori: req.params.id,
      },
    });
    res.status(200).json({ msg: "Kategori Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
