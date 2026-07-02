import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllCategories,
  getProductById,
  updateProduct,
} from "../../Service/Api";
import { toast } from "react-toastify";
import "../CSS/AddProduct.css";

const EditProduct = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({

    name: "",

    description: "",

    price: "",

    stock: "",

    ingredients: "",

    feeding_guide: "",

    category_id: ""

  });

  // =============================
  // Load Categories
  // =============================

  const loadCategories = async () => {

    try {

      const res = await getAllCategories();

      setCategories(res.data);

    }

    catch (err) {

      console.log(err);

    }

  };

  // =============================
  // Load Product
  // =============================

  const loadProduct = async () => {

    try {

      const res = await getProductById(id);

      const product = res.data;

      setForm({

        name: product.name,

        description: product.description,

        price: product.price,

        stock: product.stock,

        ingredients: product.ingredients,

        feeding_guide: product.feeding_guide,

        category_id: product.category_id

      });

setPreview(
  product.image?.startsWith("http")
    ? product.image
    : `http://localhost:5000/uploads/${product.image}`
);

    }

    catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    loadCategories();

    loadProduct();

  }, []);

  // =============================
  // Handle Input
  // =============================

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };

  // =============================
  // Handle Image
  // =============================

  const handleImage = (e) => {

    const file = e.target.files[0];

    setImage(file);

    setPreview(URL.createObjectURL(file));

  };

  // =============================
  // Update Product
  // =============================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = new FormData();

      data.append("name", form.name);

      data.append("description", form.description);

      data.append("price", form.price);

      data.append("stock", form.stock);

      data.append("ingredients", form.ingredients);

      data.append("feeding_guide", form.feeding_guide);

      data.append("category_id", form.category_id);

      if (image) {

        data.append("image", image);

      }

      await updateProduct(id, data);

      toast.success("Product Updated Successfully");

      navigate("/admin/products");

    }

    catch (err) {

      console.log(err);

      toast.error("Update Failed");

    }

  };

  return (

    <div className="add-product-page">

      <div className="add-product-card">

        <h2>Edit Product</h2>

        <form onSubmit={handleSubmit}>

          <div className="image-upload">

            {

              preview ?

                <img
  src={preview}
  alt="Preview"
  className="preview-image"
/>

                :

                <div className="image-placeholder">

                  Upload Image

                </div>

            }

            <input

              type="file"

              onChange={handleImage}

            />

          </div>

          <input

            type="text"

            name="name"

            placeholder="Product Name"

            value={form.name}

            onChange={handleChange}

            required

          />

          <textarea

            name="description"

            placeholder="Description"

            value={form.description}

            onChange={handleChange}

          />

          <input

            type="number"

            name="price"

            placeholder="Price"

            value={form.price}

            onChange={handleChange}

            required

          />

          <input

            type="number"

            name="stock"

            placeholder="Stock"

            value={form.stock}

            onChange={handleChange}

            required

          />

          <select

            name="category_id"

            value={form.category_id}

            onChange={handleChange}

          >

            {

              categories.map(category => (

                <option

                  key={category.id}

                  value={category.id}

                >

                  {category.name}

                </option>

              ))

            }

          </select>

          <textarea

            name="ingredients"

            placeholder="Ingredients"

            value={form.ingredients}

            onChange={handleChange}

          />

          <textarea

            name="feeding_guide"

            placeholder="Feeding Guide"

            value={form.feeding_guide}

            onChange={handleChange}

          />

          <div className="button-group">

            <button type="submit">

              Update Product

            </button>

            <button

              type="button"

              className="cancel-btn"

              onClick={() => navigate("/admin/products")}

            >

              Cancel

            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default EditProduct;