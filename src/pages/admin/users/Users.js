import React, { useEffect, useContext, useState } from "react";
import { useAlert } from "react-alert";
import { Table } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import styles from "./Users.module.scss";
import Navbar from "../../../components/admin/navbar/Navbar";
import MetaData from "../../../components/MetaData";
import axios from "axios";
import { baseUrl } from "../../../config";
import { UserContext } from "../../../context/UserContext";

const Users = ({ history }) => {
  const { user, token } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  console.log("These are the users: ", users);
  const alert = useAlert();

  const loading = false;
  const error = false;

  const getUsers = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(`${baseUrl}/admin/users`, {
        headers: headers,
        user: user,
      });
      console.log(response, "This is response");
      const data = response.data.users;
      console.log(data, "This is the response.data.users");
      setUsers(data);
    } catch (error) {
      // Handle the error
      console.log(error);
    }
  };

  const deleteUserHandler = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete(`${baseUrl}/admin/user/${id}`, {
        headers: headers,
        user: user,
      });
      console.log(response, "This is response");
      // const data = response.data.user;
      // console.log(data, "This is the response.data.users");
      // setUserDetails(data);
      getUsers();
    } catch (error) {
      // Handle the error
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
    if (error) {
      alert.error(error);
    }
  }, []);

  return (
    <div className={styles.users}>
      <MetaData title={"All Users"} />
      <div className="row g-0">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          {/* <Navbar /> */}
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
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users?.map((user) => (
                      <tr key={user?._id}>
                        <td>{user?._id}</td>
                        <td>{user?.name}</td>
                        <td>{user?.email}</td>
                        <td>{user?.isAdmin ? "Admin" : "User"}</td>
                        <td className={styles.actions}>
                          <Link to={`/adm/user/details/${user._id}`}>
                            <AiOutlineEye size={20} />
                          </Link>
                          <button onClick={() => deleteUserHandler(user._id)}>
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

export default Users;
