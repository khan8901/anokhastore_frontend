import React from "react";
import styles from "./Cates.module.scss";

const cats = [
  "Electronics",
  "Cameras",
  "Laptops",
  "Accessories",
  "Headphones",
  "Food",
  "Books",
  "Clothes/Shoes",
  "Beauty/Health",
  "Sports",
  "Outdoor",
  "Home",
];

const Cates = () => {
  return (
    <>
      <div className={styles.container}>
        <ul className={styles.items}>
          {cats.map((cat, index) => (
            <li className={styles.item} key={index}>
              {cat}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Cates;
