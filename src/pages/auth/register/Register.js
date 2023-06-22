import React, { Fragment, useEffect, useState, useContext } from "react";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/header/Navbar";
import ButtonLoader from "../../../components/loader/ButtonLoader";
import MetaData from "../../../components/MetaData";
import styles from "./Register.module.scss";
import axios from "axios";
import { baseUrl } from "../../../config";
import { UserContext } from "../../../context/UserContext";

const Login = ({ history, location }) => {
  const { setUser, setToken, setAuthenticated } = useContext(UserContext);
  const { token, user, isAuthenticated } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();

  const error = false;
  const loading = false;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }

    if (error) {
      console.log(error);
    }
  }, []);

  const register = async () => {
    try {
      const data = {
        name,
        email,
        password,
      };

      // const token = 'your-bearer-token';
      const response = await axios.post(`${baseUrl}/register`, data);
      // Handle the response
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);

      // Handle the error
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <Fragment>
      <MetaData title={"Login"} />
      <Navbar />
      <div className={styles.login}>
        <div className={styles.login_container}>
          <h3 className="text-center text-white mb-3">Register</h3>
          <form onSubmit={submitHandler}>
            <div className={styles.from_group}>
              <label htmlFor="name_field">Name</label>
              <input
                type="name"
                placeholder="Enter your name ..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.from_group}>
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                placeholder="Enter your email ..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.from_group}>
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                placeholder="Enter your password ..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.from_group}>
              <button
                type="submit"
                onClick={() => {
                  register();
                }}
              >
                {loading ? <ButtonLoader /> : "Register"}
              </button>
            </div>
          </form>
          <div className={styles.from_group}>
            <p className="text-center text-white">
              Already Have Account ? <Link to="/login">Signin</Link>
            </p>
            <p className="text-center text-white">
              <Link to="/password/forgot">Forgot Password?</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Login;

// import React, { Fragment, useEffect, useState , useContext} from "react";
// import { useAlert } from "react-alert";
// import { Link } from "react-router-dom";
// import Footer from "../../../components/footer/Footer";
// import Navbar from "../../../components/header/Navbar";
// import ButtonLoader from "../../../components/loader/ButtonLoader";
// import MetaData from "../../../components/MetaData";
// import styles from "./Register.module.scss";
// import { baseUrl } from "../../../config";
// import { UserContext } from "../../../context/UserContext";
// import  axios  from "axios";

// const Register = ({ history,location }) => {

//   const { setUser, setToken, setAuthenticated } = useContext(UserContext);

//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");

//   const error = false;
//   const loading = false;
//   const alert = useAlert();
// /*
//   useEffect(() => {
//     if (isAuthenticated) {
//       history.push(redirect);
//     }

//     if (error) {
//       alert.error(error);
//     }
//   }, []);

//  */

// const register = async () => {
//   try {
//     const data = {
//       name,
//       email,
//       password,
//     };

//     // const token = 'your-bearer-token';
//     const response = await axios.post(`${baseUrl}/register`, { data });
//     // Handle the response
//     console.log(response.data);
//   } catch (error) {
//     console.log(error);

//     // Handle the error
//   }
// };

//   return (
//     <Fragment>
//       <MetaData title={"Register"} />
//       <Navbar />
//       <div className={styles.login}>
//         <div className={styles.login_container}>
//           <h3 className="text-center text-white mb-3">Register</h3>
//             <div className={styles.from_group}>
//               <label htmlFor="anme_field">Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter your name ..."
//                 name="name"
//                 value={name}
//                 onChange={setName(name)}
//               />
//             </div>
//             <div className={styles.from_group}>
//               <label htmlFor="email_field">Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter your email ..."
//                 name="email"
//                 value={email}
//                 onChange={setEmail(email)}
//               />
//             </div>
//             <div className={styles.from_group}>
//               <label htmlFor="password_field">Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter your password ..."
//                 name="password"
//                 value={password}
//                 onChange={setPassword(password)}
//               />
//             </div>
//             <div className="form-group mt-3"></div>
//             <div className={styles.from_group}>
//               <button  onClick={()=> {register()}}>{"Register"}</button>
//             </div>
//           <div className={styles.from_group}>
//             <p className="text-center text-white">
//               Already Have Account ? <Link to="/login">Login</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </Fragment>
//   );
// };

// export default Register;
