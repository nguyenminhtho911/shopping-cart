import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // json clone
  const [filter, setFilter] = useState(products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const reponse = await fetch("https://fakestoreapi.com/products");
      setProducts(await reponse.clone().json());
      setFilter(await reponse.json());
      setLoading(false);
    };
    getProducts();
  }, []);

  // fetch("https://fakestoreapi.com/products")
  //   .then((res) => res.json())
  //   .then((json) => console.log(json));

  // * Bộ lọc: lọc products clone() ra -> set vào filter -> map ra
  const filterProduct = (filCate) => {
    const updateProducts = products.filter((x) => x.category === filCate);
    setFilter(updateProducts);
  };

  //add to cart
  const [cart, setCart] = useState([]);

  const addCart = (id1) => {
    // check có sp trong giỏ hàng ko. false > add, true > thông báo đã có
    const check = cart.every((item) => {
      return item.id !== id1;
    });
    if (check) {
      const dataAdd = products.filter((product) => {
        return product.id === id1;
      });

      //add count vào product được thêm vào cart
      dataAdd.forEach((x) => {
        x["count"] = 1;
      });

      setCart([...cart, ...dataAdd]);
    } else {
      alert("The product has been added to cart.");
    }
  };

  //save localStorage
  useEffect(() => {
    const dataCart = JSON.parse(localStorage.getItem("dataCart"));
    if (dataCart) setCart(dataCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("dataCart", JSON.stringify(cart));
  }, [cart]);

  const value = {
    products,
    setProducts,
    filter,
    setFilter,
    filterProduct,
    loading,
    setLoading,
    cart,
    addCart,
    setCart,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
