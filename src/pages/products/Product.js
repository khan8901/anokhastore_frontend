import React from "react";
import { useAlert } from "react-alert";
import { AiFillStar, AiOutlineEye } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";

import styles from "./Products.module.scss";

const Product = ({ product }) => {
  const alert = useAlert();

  const addToCart = () => {
    alert.success("Item Added to Cart");
  };
  return (
    <div className="col-md-4">
      <div className={styles.product}>
        <div className={styles.product_image}>
         <img src={product?.images[0]} alt={product?.name} />
        </div>
        <Link to={{ pathname: `/product/${product?._id}`, state: { product } }}>

          <p className={styles.product_name}>{product?.name}</p>
        </Link>
        <div className="d-flex align-items-center justify-content-between mt-5">
          <div className={styles.button_add_to_Cart}>
            <button className={styles.button_add}>Add to Cart</button>
          </div>
          <div>
            <span className="fw-bold">$ {product?.price}</span>
          </div>
        </div>
        <div className={styles.link_container}>
          <button onClick={addToCart}>
            <MdOutlineFavoriteBorder className={styles.icon} size={25} />
          </button>
          <Link to={`/product/${product?._id}`}>
            <AiOutlineEye size={25} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
