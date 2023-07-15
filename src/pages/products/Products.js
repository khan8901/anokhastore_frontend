import React, { Fragment, useState, useEffect, useRef } from "react";
import { useAlert } from "react-alert";
import Product from "./Product";
import { Spinner } from "react-bootstrap";
import { BsFilter } from "react-icons/bs";

import styles from "./Products.module.scss";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import MetaData from "../../components/MetaData";
//import products from "../../db/productsDB";
import axios from "axios";
import { baseUrl } from "../../config";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Products = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [rating, setRating] = useState(0);
  const [products, SetProducts] = useState(null);
  const [category, setCategory] = useState("");
  const [isBottom, setIsBottom] = useState(false);

  const [page, setPage] = useState(1);
  const [minPrice, setminPrice] = useState("");
  const [maxPrice, setmaxPrice] = useState("");
  const [name, setName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchProducts, setSearchProducts] = useState("");

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchProducts(searchQuery);
  };

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

  // const {
  //   loading,
  //   products,
  //   error,
  //   productsCount,
  //   resPerPage,
  //   filteredProductsCount,
  // } = useSelector((state) => state.products);
  const loading = false;

  // const keyword = match.params.keyword;

  const getProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/products`);
      SetProducts(response.data.products);

      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight;
      if (isBottom) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    getProducts();

    console.log(searchProducts);
  }, [category, page, price, searchProducts]);

  return (
    <Fragment>
      <MetaData title={"All Products"} />
      {/* <Navbar /> */}
      {loading ? (
        <>
          <div className={styles.spinner}>
            <Spinner animation="border" />
          </div>
        </>
      ) : (
        <>
          <div className={styles.products}>
            <div className="container mb-5" style={{ marginTop: "30px" }}>
              <div className="row g-3">
                {/* <div className="col-md-3 pe-5">
                  <div className={styles.filter}>
                    <p>
                      <BsFilter size={30} className="me-3" />
                      Filter
                    </p>

                    <div
                      style={{
                        marginTop: "70px",
                        paddingRight: "15px",
                        paddingLeft: "15px",
                      }}
                    >
                      <Range
                        marks={{
                          1: `$1`,
                          1000: `$1000`,
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />

                      <hr className="mt-5 text-primary" />

                      <div className="mt-3">
                        <h4 className="mb-3">Categories</h4>

                        <div className={styles.categories}>
                          {cats.map((category) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={category}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </div>
                      </div>

                      <hr className="my-3" />
                    </div>
                  </div>
                </div> */}

                <div className="col-md-12">
                  <div className={styles.searchContainer}>
                    <input
                      type="text"
                      placeholder="Search by name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={styles.searchInput}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        className={styles.clearSearchBtn}
                        onClick={() => {
                          setSearchQuery("");
                        }}
                      >
                        <span>&times;</span>
                      </button>
                    )}
                    <button
                      type="submit"
                      className={styles.searchBtn}
                      onClick={handleSearchSubmit}
                    >
                      Search
                    </button>
                  </div>
                  <div className="row g-3 mx-auto">
                    {products &&
                      products.map((product) => (
                        <Product key={product._id} product={product} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </Fragment>
  );
};

export default Products;
