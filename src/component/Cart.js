import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "./DataProvider";

const Cart = () => {
  const { cart, setCart } = useContext(DataContext);
  const [total, setTotal] = useState(0);

  // tính tổng đơn hàng
  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.count;
      }, 0);
      setTotal(res);
    };
    getTotal();
  }, [cart]);

  // (-)
  const reduction = (id1) => {
    cart.forEach((item) => {
      if (item.id === id1) {
        item.count === 1 ? (item.count = 1) : (item.count -= 1);
      }
    });
    setCart([...cart]);
  };

  // (+)
  const increase = (id1) => {
    cart.forEach((item) => {
      if (item.id === id1) {
        item.count += 1;
      }
    });
    setCart([...cart]);
  };

  // delete cart
  const removeProduct = (id1) => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item.id === id1) {
          cart.splice(index, 1);
        }
      });
      setCart([...cart]);
    }
  };

  // giỏ hàng trống
  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "3rem" }}>Cart Empty</h2>
    );

  return (
    <>
      {cart.map((product) => (
        <div className="details cart container" key={product.id}>
          <Link to={`/products/${product.id.toFixed()}`}>
            <img src={product.image} alt={product.title} width="150" />
          </Link>
          <div className="box-details">
            <h2 title={product.title}>{product.title}</h2>
            <h3>${product.price * product.count}</h3>
            <div className="amount">
              <button className="count" onClick={() => reduction(product.id)}>
                {" "}
                -{" "}
              </button>
              <span>{product.count}</span>
              <button className="count" onClick={() => increase(product.id)}>
                {" "}
                +{" "}
              </button>
            </div>

            <div className="delete" onClick={() => removeProduct(product.id)}>
              <i className="fas fa-times"></i>
            </div>
          </div>
        </div>
      ))}

      <div className="total container">
        {/* <Link to="/payment">Payment</Link> */}
        <h3>Total: $ {total.toFixed()}</h3>
      </div>
    </>
  );
};

export default Cart;
