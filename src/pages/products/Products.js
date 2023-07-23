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
import Banner from "../../components/banner/Banner";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Products = ({ match }) => {
  const [products, SetProducts] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [categories, setCategories] = useState("Laptops");
  const [price, setPrice] = useState([1, 1000]);
  const [minPrice, setminPrice] = useState(0);
  const [maxPrice, setmaxPrice] = useState(1000);
  const [page, setPage] = useState("");
  const [limit, setLimit] = useState(10);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setName(searchQuery);
  };

  const cats = [
    "All",
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Sports",
    "Outdoor",
  ];

  // const keyword = match.params.keyword;

  const getProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/products`, {
        params: {
          name,
          categories,
          minPrice,
          maxPrice,
          page,
          limit,
        },
      });
      SetProducts(response.data.products);
      setLoading(false);
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
        // setPage((page) => page + 1);
        setLimit((limit) => limit + 10);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    getProducts();
  }, [name, categories, minPrice, maxPrice, page, limit]);

  useEffect(() => {
    setminPrice(price[0]);
    setmaxPrice(price[1]);
  }, [price]);
  return (
    <Fragment>
      <div className={styles.catContainer}>
        <ul className={styles.catItems}>
          {cats.map((cat, index) => (
            <li
              onClick={() => {
                cat === "All" ? setCategories("") : setCategories(cat);
              }}
              className={styles.catItem}
              key={index}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>
      <Banner />
      <MetaData title={"All Products"} />
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
              <div className="row">
                <div
                  className={`${styles.searchContainer} col-6 col-sm-12 col-md-6 col-lg-6 mx-4`}
                >
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
                <div className="col-6 col-sm-6 col-md-3 col-lg-3 pe-5">
                  <div className={styles.filter}>
                    {/* <p>
                      <BsFilter size={30} className="me-3" />
                      Filter
                    </p> */}

                    <div
                      style={{
                        marginTop: "70px",
                        paddingRight: "15px",
                        paddingLeft: "15px",
                        minWidth: "200px",
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
                        onChange={(price) => setPrice(price)}
                        value={price}
                      />

                      {/* <hr className="mt-5 text-primary" />

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

                      <hr className="my-3" /> */}
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="row gy-3 mx-auto my-3">
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
