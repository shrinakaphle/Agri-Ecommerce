import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api, { getAllCategories } from "../../Service/Api";
import "../CSS/AddProduct.css";
import { toast } from "react-toastify";

const AddProduct = () => {

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

 

  const loadCategories = async () => {

    try {

      const res = await getAllCategories();

      setCategories(res.data);

    }

    catch(err){

      console.log(err);

    }

  };
 useEffect(() => {

    loadCategories();

  }, []);
  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };

  const handleImage = (e) => {

    const file = e.target.files[0];

    setImage(file);

    setPreview(URL.createObjectURL(file));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try{

      const data = new FormData();

      data.append("name",form.name);
      data.append("description",form.description);
      data.append("price",form.price);
      data.append("stock",form.stock);
      data.append("ingredients",form.ingredients);
      data.append("feeding_guide",form.feeding_guide);
      data.append("category_id",form.category_id);

      if(image){

        data.append("image",image);

      }
console.log(image);

for (let pair of data.entries()) {
  console.log(pair[0], pair[1]);
}
      await Api.post(
  "/api/products",
  data,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

      toast.success("Product Added Successfully!");

      navigate("/admin/products");

    }

    catch(err){

      console.log(err);

      toast.error(
  err.response?.data?.message ||
  "Failed to Add Product!"
);

    }

  };

  return(

    <div className="add-product-page">

      <div className="add-product-card">

        <h2>Add Product</h2>

        <form onSubmit={handleSubmit}>

          <div className="image-upload">

            {

              preview ?

              <img src={preview} alt="" />

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

            placeholder="Stock Quantity"

            value={form.stock}

            onChange={handleChange}

            required

          />

          <select

            name="category_id"

            value={form.category_id}

            onChange={handleChange}

            required

          >

            <option value="">Select Category</option>

            {

              categories.map(category=>(

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

              Add Product

            </button>

            <button

              type="button"

              className="cancel-btn"

              onClick={()=>navigate("/admin/products")}

            >

              Cancel

            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default AddProduct;