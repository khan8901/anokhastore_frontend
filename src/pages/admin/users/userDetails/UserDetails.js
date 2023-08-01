import React, { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import axios from "axios";
import { baseUrl } from "../../../../config";
import Navbar from "../../../../components/admin/navbar/Navbar";
import Sidebar from "../../../../components/admin/sidebar/Sidebar";
import MetaData from "../../../../components/MetaData";

import styles from "./UserDetails.module.scss";
import { UserContext } from "../../../../context/UserContext";

const UserDetails = ({ history, match }) => {
  const { user, token } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState({});
  const [show, setShow] = useState(false);

  const [name, setName] = useState(userDetails.name);
  const [email, setEmail] = useState(userDetails?.email);
  const [role, setRole] = useState(userDetails?.isAdmin ? "Admin" : "User");

  const alert = useAlert();
  const error = false;
  const userId = match.params.id;
  const getUserDetail = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(`${baseUrl}/admin/user/${userId}`, {
        headers: headers,
        user: user,
      });
      console.log(response, "This is response");
      const data = response.data.user;
      console.log(data, "This is the response.data.users");
      setUserDetails(data);
    } catch (error) {
      // Handle the error
      console.log(error);
    }
  };

  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.set("name", name);
  //   formData.set("email", email);
  //   formData.set("role", role);
  // };
  const updateHandler = async (e, id) => {
    e.preventDefault();
    const data = { userId: id, role: role };
    console.log(data, "This is the data.");
    try {
      console.log(token, "This is the token");
      const response = await axios.put(`${baseUrl}/admin/user/${id}`, {
        body: {
          name: name,
          email: email,
          role: role,
        },
      });
      console.log(response, "This is response");
      // const data = response.data.user;
      // console.log(data, "This is the response.data.users");
      // setUserDetails(data);
      getUserDetail();
    } catch (error) {
      // Handle the error
      console.log(error);
    }
  };
  useEffect(() => {
    getUserDetail();
    if (error) {
      alert.error(error);
    }
  }, []);
  useEffect(() => {
    setName(userDetails.name);
    setEmail(userDetails.email);
    setRole(userDetails.role ? "Admin" : "User");
  }, [userDetails]);
  return (
    <div className={styles.user_details}>
      <MetaData title={"User Details"} />
      <div className="row g-0">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          {/* <Navbar /> */}
          <div className="container mt-3 p-3">
            <div className="row g-3">
              <div className="col-md-10">
                <div className={styles.user_information}>
                  <div className="d-flex align-items-center justify-content-between ps-3 pt-3 pe-3">
                    <h4>User Informations</h4>

                    {/* User update modal button  */}
                    <button onClick={() => setShow(show ? false : true)}>
                      Edit
                    </button>
                  </div>
                  <hr />
                  <div className="row g-3">
                    {/* <div className="col-md-6 p-3">
                      <div className="text-center">
                        {user && (
                          <img
                            style={{
                              height: "150px",
                              width: "150px",
                              borderRadius: "50%",
                            }}
                            src={user?.avatar?.url}
                            alt=""
                          />
                        )}
                      </div>
                    </div> */}

                    <div className="col-md-12 m-4">
                      <p>
                        <strong>Name :</strong>
                        <span className="ms-3">{userDetails?.name}</span>
                      </p>
                      <p>
                        <strong>Email :</strong>
                        <span className="ms-3">{userDetails?.email}</span>
                      </p>
                      <p>
                        <strong>Role :</strong>
                        <span className="ms-3">
                          {userDetails?.isAdmin ? "Admin" : "User"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User update modal  */}
      {show && (
        <>
          <div className={styles.modal}>
            <h4 className="text-center">Update User Information</h4>

            <form
            //  onSubmit={submitHandler}
            >
              <div className={styles.from_group}>
                <label htmlFor="name_field">Name</label>
                <input
                  type="name"
                  id="name_field"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className={styles.from_group}>
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className={styles.from_group}>
                <label htmlFor="role_field">Role</label>

                <select
                  id="role_field"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </div>

              <div className={styles.from_group}>
                <button
                  type="submit"
                  onClick={() => updateHandler(userDetails._id)}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetails;
