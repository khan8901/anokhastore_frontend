import React, { useEffect } from "react";
import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import Widget from "../../../components/widget/Widget";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.scss";
import Loader from "../../../components/loader/Loader";
import MetaData from "../../../components/MetaData";

const Dashboard = () => {
  const loading = false;

  const user = {
    title: "USERS",
    link: (
      <Link style={{ textDecoration: "none" }} to={"/users"}>
        See all user
      </Link>
    ),
    icon: <AiOutlineUser />,
  };
  const order = {
    title: "ORDERS",
    link: (
      <Link style={{ textDecoration: "none" }} to={"/admin-orders"}>
        See all orders
      </Link>
    ),
    icon: <AiOutlineShoppingCart />,
  };
  const product = {
    title: "PRODUCTS",
    link: (
      <Link style={{ textDecoration: "none" }} to={"/admin-products"}>
        See all products
      </Link>
    ),
    icon: <AiOutlineUser />,
  };
  const stock = {
    title: "STOCK OUT",
    link: (
      <Link style={{ textDecoration: "none" }} to={"/users"}>
        See all user
      </Link>
    ),
    icon: <AiOutlineUser />,
  };

  return (
    <div className={styles.dashboard}>
      <MetaData title={"Dashboard"} />
      <div className="row g-0">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <Navbar />
          {loading ? (
            <>
              <Loader />
            </>
          ) : (
            <>
              <div className={styles.widgets}>
                <Widget title={user.title} icon={user.icon} link={user.link} />
                <Widget
                  title={order.title}
                  icon={order.icon}
                  link={order.link}
                />
                <Widget
                  title={product.title}
                  icon={product.icon}
                  link={product.link}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
