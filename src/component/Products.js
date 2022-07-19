import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { DataContext } from "./DataProvider";

const Products = () => {
  //nhận context
  const { products, filter, setFilter, filterProduct, loading, addCart } =
    useContext(DataContext);

  const Loading = () => {
    return (
      <>
        <div className="products">
          <div className="card">
            <Skeleton height={350} />
          </div>
          <div className="card">
            <Skeleton height={350} />
          </div>
          <div className="card">
            <Skeleton height={350} />
          </div>
        </div>
      </>
    );
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="flex-box buttons">
          <button onClick={() => setFilter(products)}>All</button>
          <button onClick={() => filterProduct("men's clothing")}>Men</button>
          <button onClick={() => filterProduct("women's clothing")}>
            Women
          </button>
          <button onClick={() => filterProduct("jewelery")}>Jewenery</button>
          <button onClick={() => filterProduct("electronics")}>
            Electronics
          </button>
        </div>

        <div className="products">
          {filter.map((product) => (
            <div className="card" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img src={product.image} alt={product.title} />
              </Link>
              <div className="box">
                <h3 title={product.title}>
                  <Link to={`/products/${product.id}`}>{product.title}</Link>
                </h3>
                <h4>${product.price}</h4>
                <button
                  onClick={() => {
                    addCart(product.id);
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="container">
      <h1 className="tac">Latest Products</h1>
      {loading ? <Loading /> : <ShowProducts />}
    </div>
  );
};

export default Products;
