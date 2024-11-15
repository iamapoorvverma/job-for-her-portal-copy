import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginOrg } from "../../actions/authActions";
import classnames from "classnames";

const LoginOrg = ({ auth, errors: propErrors, loginOrg, history }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // If logged in and user navigates to Login page, redirect to dashboard
    if (auth.isAuthenticated) {
      history.push("/dashboardorg");
    }
  }, [auth, history]);

  useEffect(() => {
    // Update errors when receiving new ones
    if (propErrors) {
      setErrors(propErrors);
    }
  }, [propErrors]);

  const onChangeName = (e) => setName(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { name, password };
    loginOrg(userData);
  };

  return (
    <div className="container">
      <div style={{ marginTop: "4rem" }} className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to home
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Login</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Don't have an account? <Link to="/registerorg">Register</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={onChangeName}
                value={name}
                error={errors.name}
                id="name"
                type="text"
                className={classnames("", {
                  invalid: errors.name || errors.namenotfound,
                })}
              />
              <label htmlFor="name">Name</label>
              <span className="red-text">
                {errors.name}
                {errors.namenotfound}
              </span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChangePassword}
                value={password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password || errors.passwordincorrect,
                })}
              />
              <label htmlFor="password">Password</label>
              <span className="red-text">
                {errors.password}
                {errors.passwordincorrect}
              </span>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

LoginOrg.propTypes = {
  loginOrg: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginOrg })(withRouter(LoginOrg));
