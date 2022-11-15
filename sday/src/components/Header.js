import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "./ContextApi/Context";

const Header = () => {
  const { users } = useContext(AppContext);
  const history = useLocation();
  console.log(history.pathname);
  let navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();

    navigate("/login");
  };
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div>
            <a className="navbar-brand">Employee Management App</a>
          </div>
          <div style={{ float: "right" }}>
            {localStorage.userID && (
              <button
                style={{
                  color: "#ffffff",
                  background: "#1877f2",
                  padding: "5px",
                  margin: "5px",
                }}
                onClick={() => handleLogOut()}
              >
                <span className="bt bt-danger">Log Out</span>
              </button>
            )}
            <Link to="signup">
              {history.pathname.includes("login") && (
                <button className="btn btn-danger">want to SIGN UP</button>
              )}
            </Link>
            <Link to="login">
              {history.pathname.includes("signup") && (
                <div className="btn btn-success"> want to login ?</div>
              )}
            </Link>
            {
              console.log("usersusers",users)
            }
            {localStorage.userID && <button className="btn btn-danger">{localStorage.userEmail}</button>}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
