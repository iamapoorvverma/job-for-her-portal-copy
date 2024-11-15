import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import { getOrg } from "../../actions/getInfoActions";
import { addOpening } from "../../actions/jobActions";

class DashboardOrg extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      role: "",
      typejob: "",
      mode: "",
      stipend: 0,
      techstack: "",
      desc: "",
      applylink: "",
    };
  }

  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = async () => {
    try {
      let result = await getOrg(this.props.auth.user.name);
      this.setState({ data: result.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  onProfileInfoClick = () => {
    this.getDataFromDb();
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newOpening = {
      organization: this.state.data.name,
      role: this.state.role,
      type: this.state.typejob,
      mode: this.state.mode,
      stipend: this.state.stipend,
      desc: this.state.desc,
      techstack: this.state.techstack,
      applylink: this.state.applylink,
    };

    addOpening(newOpening);
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ height: "200vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
            </h4>
            <p className="grey-text text-darken-1">
              View all created jobs{" "}
              <Link
                to={{
                  pathname: "/openings",
                  state: { org: this.state.data.name },
                }}
              >
                Job Openings
              </Link>
            </p>
            <div>
              <p className="flow-text grey-text text-darken-1">
                PROFILE INFORMATION
              </p>
              <p>Name={this.state.data.name}</p>
              <p>Industry={this.state.data.sector}</p>
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
            <div>
              <p className="flow-text grey-text text-darken-1">
                ADD A NEW JOB OPENING
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.role}
                    id="role"
                    type="text"
                  />
                  <label htmlFor="role">Job Role</label>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.typejob}
                    id="typejob"
                    type="text"
                  />
                  <label htmlFor="typejob">Type</label>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.mode}
                    id="mode"
                    type="text"
                  />
                  <label htmlFor="mode">Mode</label>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.stipend}
                    id="stipend"
                    type="number"
                  />
                  <label htmlFor="stipend">Stipend</label>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.desc}
                    id="desc"
                    type="text"
                  />
                  <label htmlFor="desc">Description</label>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.techstack}
                    id="techstack"
                    type="text"
                  />
                  <label htmlFor="techstack">Tech Stacks</label>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.applylink}
                    id="applylink"
                    type="text"
                  />
                  <label htmlFor="applylink">Application Link</label>
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
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardOrg.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(DashboardOrg);
