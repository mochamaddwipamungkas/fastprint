import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditProduk = () => {
  const [id_produk, setIdProduk] = useState("");
  const [nama_produk, setNamaProduk] = useState("");
  const [harga, setHarga] = useState("");
  const [id_kategori, setKategori] = useState(1);
  const [id_status, setStatus] = useState(1);
  const [listKategori, setListKategori] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getProdukById();
    getKategori();
  }, []);

  const getKategori = async () => {
    const response = await axios.get("http://localhost:5001/kategori");
    setListKategori(response.data);
  };

  const getProdukById = async () => {
    await axios
      .get(`http://localhost:5001/produk/${id}`)
      .then((res) => {
        setIdProduk(res.data.id_produk);
        setNamaProduk(res.data.nama_produk);
        setHarga(res.data.harga);
        setKategori(res.data.id_kategori);
        setStatus(res.data.id_status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = async (e) => {
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
      navigate(`/editproduk/${id}`);
    } else {
      await axios
        .patch(`http://localhost:5001/produk/${id}`, {
          id_produk,
          nama_produk,
          harga,
          id_kategori,
          id_status,
        })
        .then((res) => {
          console.log(res);

          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="border border-1 mt-5 p-5 " style={{ width: "600px" }}>
        <h3>Edit Produk</h3>
        <form onSubmit={handleUpdate} className="px-5 mt-5 ">
          <label className="form-label">ID Produk</label>
          <input
            type="number"
            className="form-control"
            value={id_produk}
            disabled
          />

          <label className="form-label mt-3">Nama Produk</label>
          <input
            type="text"
            className="form-control"
            value={nama_produk}
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

          <label className="form-label mt-3">Status</label>
          <select
            className="form-select"
            value={id_status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="1">Bisa Dijual</option>
            <option value="2">Tidak Bisa Dijual</option>
          </select>
          <div className="mt-5">
            <button type="submit" className="btn btn-primary ">
              Update
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

export default EditProduk;
