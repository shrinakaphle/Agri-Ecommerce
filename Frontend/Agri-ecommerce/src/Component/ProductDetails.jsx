import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import Api from "../Service/Api";

const ProductDetails = () => {

  const { id } =
    useParams();

  const [product,
    setProduct] =
      useState(null);

  useEffect(() => {

    Api.get(
      `/api/products/${id}`
    )
    .then((res) =>
      setProduct(
        res.data
      )
    );

  }, [id]);

  if (!product)
    return <h2>Loading...</h2>;

  return (

    <div>

      <img
        src={product.image}
        alt=""
        width="350"
      />

      <h1>
        {product.name}
      </h1>

      <h2>
        Rs. {product.price}
      </h2>

      <p>
        {product.description}
      </p>

    </div>

  );
};

export default ProductDetails;