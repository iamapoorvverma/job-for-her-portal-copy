import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import { getUser } from "../../actions/getInfoActions";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      name: "",
      email: "",
      password: "",
      contact: 0,
      education: "",
      experience: "",
      breaktime: 0,
      domain: "",
      hours: "",
      techstack: "",
      resume: "",
      errors: {},
    };
  }
  componentDidMount() {
    this.getDataFromDb();
  }
  getDataFromDb = async () => {
    let result = await getUser(this.props.auth.user.name);
    // console.log(result);
    this.setState({ ...this.state, data: result.data });
  };
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  onProfileInfoClick = () => {
    this.getDataFromDb();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              {/* <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p> */}
            </h4>
            <p className="grey-text text-darken-1">
              View all job openings <Link to="/listings">Job Openings</Link>
            </p>
            <div>
              <p className="flow-text grey-text text-darken-1">
                PROFILE INFORMATION
              </p>
              <p>Name={this.state.data.name}</p>
              <p>Email={this.state.data.email}</p>
              {/* <p>Password={this.state.data.password}</p> */}
              {/* <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                onClick={this.onProfileInfoClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Get Profile Information
              </button> */}
            </div>

            <br />
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
