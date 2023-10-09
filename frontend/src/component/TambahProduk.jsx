import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TambahProduk = () => {
  const [id_produk, setIdProduk] = useState("");
  const [nama_produk, setNamaProduk] = useState("");
  const [harga, setHarga] = useState("");
  const [id_kategori, setKategori] = useState(1);
  const [id_status, setStatus] = useState(1);
  const [listKategori, setListKategori] = useState([]);
  const [listStatus, setListStatus] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getKategori();
    getStatus();
  }, []);

  const getKategori = async () => {
    const response = await axios.get("http://localhost:5001/kategori");
    setListKategori(response.data);
  };
  const getStatus = async () => {
    const response = await axios.get("http://localhost:5001/status");
    setListStatus(response.data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let message = {};
    if (id_produk.length === 0) {
      message = { ...message, idproduk: "*ID Produk tidak boleh kosong" };
    }
    if (nama_produk.length === 0) {
      message = { ...message, nmproduk: "*Nama Produk tidak boleh kosong" };
    }
    if (harga.length === 0) {
      message = {
        ...message,
        hargaproduk: "*Harga Produk tidak boleh kosong",
      };
    }
    setErrors(message);
    if (message.idproduk || message.nmproduk || message.hargaproduk) {
      navigate("/tambahproduk");
    } else {
      await axios
        .post("http://localhost:5001/produk", {
          id_produk,
          nama_produk,
          harga,
          id_kategori,
          id_status,
        })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            navigate("/tambahproduk");
            message = {
              ...message,
              duplicate: "*ID yang anda masukkan sudah ada",
            };
            setErrors(message);
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="border border-1 mt-5 p-5 " style={{ width: "600px" }}>
        <h3>Tambahkan Produk</h3>
        <form onSubmit={handleSubmit} className="px-5 mt-5 ">
          <label className="form-label">ID Produk</label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setIdProduk(e.target.value)}
            minLength={"1"}
            maxLength={"5"}
          />
          {errors.idproduk && <p className="text-danger">{errors.idproduk}</p>}
          {errors.duplicate && (
            <p className="text-danger">{errors.duplicate}</p>
          )}
          <label className="form-label mt-3">Nama Produk</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setNamaProduk(e.target.value)}
          />
          {errors.nmproduk && <p className="text-danger">{errors.nmproduk}</p>}
          <label className="form-label mt-3">Harga Produk</label>
          <input
            type="number"
            className="form-control"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            min={"0"}
          />
          {errors.hargaproduk && (
            <p className="text-danger">{errors.hargaproduk}</p>
          )}
          <div>
            <label className="form-label mt-3">Kategori</label>

            <select
              className="form-select"
              value={id_kategori}
              onChange={(e) => setKategori(e.target.value)}
            >
              {listKategori.map((listkategoris, index) => (
                <option key={index} value={listkategoris.id_kategori}>
                  {listkategoris.nama_kategori}
                </option>
              ))}
            </select>
          </div>

          <label className="form-label mt-3">Status</label>
          <select
            className="form-select"
            value={id_status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {listStatus.map((liststatuses, index) => (
              <option key={index} value={liststatuses.id_status}>
                {liststatuses.nama_status}
              </option>
            ))}
          </select>
          <div className="mt-5">
            <button type="submit" className="btn btn-primary ">
              Simpan
            </button>
            <Link to={"/"} className="btn btn-danger ms-3">
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahProduk;
