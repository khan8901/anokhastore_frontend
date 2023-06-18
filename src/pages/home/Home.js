import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./home.css";
// import { getAdminProducts } from "../../actions/productAction";
import Product from "../../components/product/Product";
import { Row, Col } from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/header/Navbar";
import Loader from "../../components/loader/Loader";
import MetaData from "../../components/MetaData";
import Banner from "./banner/Banner";
import Category from "./category/Category";
import Carousel from "../../components/car/Carousel";
import products from "../../db/productsDB";

const Home = () => {
  const alert = useAlert();
  // const { loading, error, products } = useSelector((state) => state.products);
  let loading = false;
  let error = false;

  // filter products by types

  useEffect(() => {
    // dispatch(getAdminProducts());

    if (error) {
      return alert.error(error);
    }
  }, [alert, error]);
  return (
    <Fragment>
      <MetaData title={"Home"} />
      <Navbar />
      <Carousel />
      {/* <Banner /> */}
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <Row className="row">
          {products.length ? (
            products.map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              );
            })
          ) : (
            //   show this only if user has searched for some item and it is not available
            <Col className="text-center">
              <div>
                <i className="far fa-frown" /> No items found for this search
                query
              </div>
              Go Back to the <Link to="/">Home Page</Link>
            </Col>
          )}
        </Row>
      )}
      <Footer />
    </Fragment>
  );
};

export default Home;
