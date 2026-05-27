const Products = () => {
  const products = [
    {
      name: "Premium Cow Feed",
      price: 1200,
    },
    {
      name: "Fish Nutrition Feed",
      price: 900,
    },
    {
      name: "Pig Growth Feed",
      price: 1400,
    },
  ];

  return (
    <section className="products">
      <h2>Featured Products</h2>

      <div className="product-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <img
              src="https://images.unsplash.com/photo-1606787366850-de6330128bfc"
              alt="product"
            />

            <h3>{product.name}</h3>

            <p>Rs. {product.price}</p>

            <button>View Details</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;