import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const { DataTypes } = Sequelize;

const Status = db.define(
  "status",
  {
    id_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nama_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Status;

(async () => {
  await db.sync();
})();
