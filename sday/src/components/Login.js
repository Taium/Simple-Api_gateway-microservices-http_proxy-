import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AppContext } from "./ContextApi/Context";

const Login = () => {
  const { setUsers } = useContext(AppContext);
  let navigate = useNavigate();

  const [data, setData] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(data);

  const login = async (e) => {
    e.preventDefault();
    let resValue;
    await axios
      .post(`http://localhost:5000/login`, { email: email, password: password })
      .then((response) => {

        // setUsers(response.data.data.email);
        // console.log(response.data.data.email);
        setData(response.data);

        resValue = response.data;
      });

    console.log(resValue.status);
    if (resValue.status === 200) {
      localStorage.setItem("userID", resValue.data.id);
      localStorage.setItem("userEmail", resValue.data.email);
      console.log(resValue.data.id);

      localStorage.setItem("userInfo", JSON.stringify(resValue.data));
      var json=JSON.parse(localStorage.userInfo);
      console.log(json.email)
      navigate("/");
    } else {
      // Failed Message
      swal({
        text: "Email Or Password Is Incorrect",
        title: "Login Failed",
        icon: "error",
      });
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <p> </p>
            <br />

            {data.message}

            <div className="card-body">
              <form>
                <div className="form-group">
                  <label> Email: </label>
                  <input
                    value={email}
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label> Password: </label>
                  <input
                    type="password"
                    value={password}
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button className="btn btn-success" onClick={(e) => login(e)}>
                  {" "}
                  login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
