import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Kategori from "../kategori/KategoriModel.js";
import Status from "../status/StatusModel.js";

const { DataTypes } = Sequelize;

const Produk = db.define(
  "produk",
  {
    id_produk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nama_produk: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    harga: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    id_kategori: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Produk.belongsTo(Kategori, { foreignKey: "id_kategori" });
Produk.belongsTo(Status, { foreignKey: "id_status" });

export default Produk;

(async () => {
  await db.sync();
})();
