import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Home = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    await axios
      .get(`http://localhost:5001/produk`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduk = (idproduk, nmproduk) => {
    swal({
      title: "Apkah anda yakin?",
      text: `menghapus data ID Produk: ${idproduk} dengan Nama Produk: ${nmproduk}?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`http://localhost:5001/produk/${idproduk}`);
          getProduct();
        } catch (error) {
          console.log(error);
        }
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Anda batal menghapus data");
      }
    });
  };
  return (
    <div className="d-flex justify-content-center">
      <section className="container p-5">
        <Link className="btn btn-success" to={"tambahproduk"}>
          Tambah Produk
        </Link>
        <table className="table table-bordered mt-5">
          <thead className="text-center">
            <tr>
              <th>#</th>
              <th>IDProduk</th>
              <th>Nama Produk</th>
              <th style={{ width: "100px" }}>Harga</th>
              <th style={{ width: "200px" }}>Kategori</th>
              <th style={{ width: "100px" }}>Status</th>
              <th style={{ width: "100px" }}>Aksi</th>
            </tr>
          </thead>
          <tbody className="fs-6">
            {product.map((products, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="text-center">{products.id_produk}</td>
                <td>{products.nama_produk}</td>
                <td>Rp. {products.harga.toLocaleString()}</td>
                <td>{products.kategori.nama_kategori}</td>
                <td>{products.status.nama_status}</td>
                <td>
                  <Link
                    to={`editproduk/${products.id_produk}`}
                    className="btn btn-info"
                    style={{ fontSize: "12px", padding: "2px 5px" }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() =>
                      deleteProduk(products.id_produk, products.nama_produk)
                    }
                    className="btn btn-danger ms-1 mt-1"
                    style={{ fontSize: "12px", padding: "2px 5px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Home;
