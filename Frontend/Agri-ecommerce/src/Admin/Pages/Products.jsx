import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch
} from "react-icons/fa";

import { getAllProducts } from "../../Service/Api";
import Api from "../../Service/Api";

import "../CSS/Products.css";

const Products = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  
  const loadProducts = async () => {

    try {

      const res = await getAllProducts();
     
res.data.forEach((p) => {
  console.log(
    p.name,
    p.image
  );
});
      setProducts(res.data);

      setLoading(false);

    }

    catch (err) {

      console.log(err);

      setLoading(false);

    }

  };
  useEffect(() => {

    loadProducts();

  }, []);

  const deleteProduct = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await Api.delete(`/api/products/${id}`);

      loadProducts();

    }

    catch (err) {

      console.log(err);

    }

  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="admin-products">

      <div className="products-header">

        <h1>Products</h1>

        <button
          className="add-product-btn"
          onClick={() =>
            navigate("/admin/products/add")
          }
        >

          <FaPlus />

          Add Product

        </button>

      </div>

      <div className="search-bar">

        <FaSearch />

        <input

          type="text"

          placeholder="Search Products..."

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

        />

      </div>

      <div className="products-table">

        {

          loading ?

            <h2>Loading...</h2>

            :

            <table>

              <thead>

                <tr>

                  <th>Image</th>

                  <th>Name</th>

                  <th>Price</th>

                  <th>Stock</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {

                  filteredProducts.map((product) => (

                    <tr key={product.id}>

                      <td>

                    <img
  src={
    product.image?.startsWith("http")
      ? product.image
      : `http://localhost:5000/uploads/${product.image}`
  }
  alt={product.name}
  
  className="table-image"
  />
   
                      </td>

                      <td>{product.name}</td>

                      <td>

                        Rs. {product.price}

                      </td>

                      <td>

                        {

                          product.stock > 0 ?

                            <span className="stock in">

                              In Stock

                            </span>

                            :

                            <span className="stock out">

                              Out of Stock

                            </span>

                        }

                      </td>

                      <td>

                        <button

                          className="edit-btn"

                          onClick={() =>
                            navigate(`/admin/products/edit/${product.id}`)
                          }

                        >

                          <FaEdit />

                        </button>

                        <button

                          className="delete-btn"

                          onClick={() =>
                            deleteProduct(product.id)
                          }

                        >

                          <FaTrash />

                        </button>

                      </td>

                    </tr>

                  ))

                }

              </tbody>

            </table>

        }

      </div>

    </div>

  );

};

export default Products;