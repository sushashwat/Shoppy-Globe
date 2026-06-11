import React from "react";
import Header from "./components/Header";
import Layout from "./components/Layout";
import ProductItem from "./components/ProductItem";
import CartItem from "./components/CartItem";
function App(){
  return(
    <>
    <Header/>
    <Layout/>
    <ProductItem/>
    <CartItem/>
    </>
    
  );
}

export default App;
