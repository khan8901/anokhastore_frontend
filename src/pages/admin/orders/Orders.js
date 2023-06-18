import React, { useEffect } from "react";
// import {
//     allOrders,
//     clearErrors,
//     deleteOrder,
// } from "../../../actions/orderActions";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { useAlert } from "react-alert";
import styles from "./Orders.module.scss";
import Loader from "../../../components/loader/Loader";
import { Table } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { DELETE_ORDER_RESET } from "../../../constants/orderConstants";
import Navbar from "../../../components/admin/navbar/Navbar";
import MetaData from "../../../components/MetaData";
import orders from "../../../db/ordersDB";

const Orders = ({ history }) => {
  const alert = useAlert();
  console.log("Orders is called.");

  const isDeleted = false;
  const loading = false;
  const error = false;

  useEffect(() => {
    // dispatch(allOrders());

    if (error) {
      alert.error(error);
      // dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order deleted successfully");
      history.push("/admin/orders");
    }
  }, []);

  const deleteOrderHandler = (id) => {
    // dispatch(deleteOrder(id));
  };

  return (
    <div className={styles.orders}>
      <MetaData title={"Order"} />
      <div className="row g-0">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <Navbar />
          <div className={`${styles.table} container mt-3`}>
            {loading ? (
              <>
                <Loader />
              </>
            ) : (
              <>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>No of Items</th>
                      <th>Amount</th>
                      <th>Address</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders?.map((order) => (
                      <tr key={order?._id}>
                        <td>{order?._id}</td>
                        <td>{order.orderItems.length}</td>
                        <td>{order?.totalPrice}</td>
                        <td>{order?.shippingInfo.city}</td>
                        <td>{order?.orderStatus}</td>
                        <td className={styles.actions}>
                          <Link to={`/admin/order/${order._id}`}>
                            <AiOutlineEye size={20} />
                          </Link>
                          <button onClick={() => deleteOrderHandler(order._id)}>
                            <AiOutlineDelete size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
