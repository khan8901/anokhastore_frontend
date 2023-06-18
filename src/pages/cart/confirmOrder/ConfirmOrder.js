import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/header/Navbar";
import MetaData from "../../../components/MetaData";
import CheckoutSteps from "../checkoutSteps/CheckoutSteps";
import cartItems from "../../../db/cartDB";

import styles from "./ConfirmOrder.module.scss";

const ConfirmOrder = ({ history }) => {
  const shippingInfo = {
    address: "House No 1",
    city: "Lahore",
    postalCode: 123,
    phoneNo: 12344556,
    country: "Pakistan",
  };
  const user = {
    name: "Ahmad",
    email: "ahmad@gmail.com",
    phone: "03120073542",
    address: "house No 1",
    role: "admin",
  };

  // Calculate Order Prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const processToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/payment");
  };
  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />
      <Navbar />
      <div className={styles.confirm}>
        <div className={styles.container}>
          <CheckoutSteps shipping confirmOrder />

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-3 order-confirm">
              <h4 className="mb-3">Shipping Info</h4>
              <p>
                <b>Name:</b> {user && user.name}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address:</b>
                {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
              </p>

              <hr />
              <h4 className="mt-4">Your Cart Items:</h4>

              {cartItems.map((item) => (
                <Fragment>
                  <hr />
                  <div className="cart-item my-1" key={item._id}>
                    <div className="row">
                      <div className="col-4 col-lg-2">
                        <img
                          src={item.images[0].url}
                          alt="Laptop"
                          height="60"
                          width="auto"
                        />
                      </div>

                      <div className="col-5 col-lg-6">
                        <Link
                          style={{
                            textDecoration: "none",
                          }}
                          to={`/products/${item.product}`}
                        >
                          {item.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                        <p>
                          {item.quantity} x ${item.price} ={" "}
                          <b>${(item.quantity * item.price).toFixed(2)}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div className={styles.order_summary}>
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:
                  <span className="ms-3">${itemsPrice}</span>
                </p>
                <p>
                  Shipping:
                  <span className="ms-3">${shippingPrice}</span>
                </p>
                <p>
                  Tax:
                  <span className="ms-3">${taxPrice}</span>
                </p>

                <hr />

                <p>
                  Total:
                  <span className="ms-3">${totalPrice}</span>
                </p>

                <hr />
                <button id="checkout_btn" onClick={processToPayment}>
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default ConfirmOrder;
