import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { DataContext } from "./DataProvider";

const ProductDetail = () => {
  const { addCart } = useContext(DataContext);

  const imgDiv = useRef();

  // dựa vào id req lên sever lấy về product tương ứng
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      const reponse = await fetch(`https://fakestoreapi.com/products/${id}`);
      setProduct(await reponse.json());
      setLoading(false);
    };
    getProduct();
  }, [id]);

  // hiệu ứng zoom
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    imgDiv.current.style.backgroundPosition = `${x}% ${y}%`;
  };

  const Loading = () => {
    return (
      <div className="details container">
        <div className="img-container">
          <Skeleton height={300} />
        </div>
        <div className="box-details">
          <h2>
            <Skeleton height={80} />
          </h2>
          <p>
            <Skeleton height={220} />
          </p>
        </div>
      </div>
    );
  };

  const ShowProduct = () => {
    return (
      <div className="details container">
        <div
          className="img-container"
          onMouseMove={handleMouseMove}
          style={{ backgroundImage: `url(${product.image})` }}
          ref={imgDiv}
          onMouseLeave={() =>
            (imgDiv.current.style.backgroundPosition = `center`)
          }
        ></div>

        <div className="box-details">
          <h4 style={{ textTransform: "uppercase" }}>{product.category}</h4>
          <h2 title={product.title}>{product.title}</h2>
          {product.rating && product.rating.rate && (
            <p>
              Rating: {product.rating.rate}{" "}
              <i className="fa fa-star" style={{ color: "darkorange" }}></i>
            </p>
          )}
          <h3>${product.price}</h3>
          <p>{product.description}</p>
          <div
            className="cart"
            onClick={() => {
              addCart(product.id);
            }}
          >
            Add to cart
          </div>
          <Link to="/cart" className="cart">
            Go to cart
          </Link>
        </div>
      </div>
    );
  };

  return <>{loading ? <Loading /> : <ShowProduct />}</>;
};

export default ProductDetail;
