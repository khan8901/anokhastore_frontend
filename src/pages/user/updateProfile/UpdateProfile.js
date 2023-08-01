import React, { Fragment, useContext, useState } from "react";
import styles from "./UpdateProfile.module.scss";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/header/Navbar";
import ButtonLoader from "../../../components/loader/ButtonLoader";
import MetaData from "../../../components/MetaData";
import ProfileLink from "../../../components/profileLinks/ProfileLink";
import axios from "axios";
import { baseUrl } from "../../../config";
import { UserContext } from "../../../context/UserContext";

const UpdateProfile = ({ history }) => {
  const { user, token } = useContext(UserContext);
  console.log(user, "This is the user");
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  const loading = false;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const data = { name: name, email: email };
      const response = await axios.put(`${baseUrl}/me/update`, {
        headers: headers,
        data,
      });
      console.log(response, "This is response");
    } catch (error) {
      // Handle the error
      console.log(error);
    }
  };

  return (
    <Fragment>
      <MetaData title={"Update Profile"} />
      <Navbar />
      <div className={styles.update_profile}>
        <div className="container m-5 row">
          <div className="col-md-3">
            <ProfileLink />
          </div>
          <div className="col-md-9">
            <div className={styles.form_container}>
              <h4 className="text-center mt-3">
                Update Profile
                <form className={styles.form} encType="multipart/form-data">
                  <div className={styles.from_group}>
                    <label htmlFor="email_field">Name</label>
                    <input
                      className="from_input"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                    />
                  </div>
                  <div className={styles.from_group}>
                    <label htmlFor="email_field">Email: </label>
                    <input
                      className="from_input"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                    />
                  </div>

                  <div className={styles.from_group}>
                    <button type="submit" onClick={submitHandler}>
                      {loading ? <ButtonLoader /> : "Update"}
                    </button>
                  </div>
                </form>
              </h4>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default UpdateProfile;
