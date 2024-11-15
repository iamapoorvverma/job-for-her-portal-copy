import React, { Component } from "react";
import { getJobs } from "../../actions/getInfoActions";

class JobListing extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.getDataFromDb();
  }
  getDataFromDb = async () => {
    let result = await getJobs();
    this.setState({ ...this.state, data: result.data.data });
    console.log(this.state.data);
  };
  render() {
    const jobs = this.state.data;
    return (
      <div className="container">
        <h4 className="p-3 text-center">All Job Openings</h4>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Organization</th>
              <th>Job Role</th>
              <th>Stipend</th>
              <th>Type</th>
              <th>Mode</th>
              <th>Description</th>
              <th>Technology</th>
              <th>Application Link</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, key) => (
              <tr key={key}>
                <td>{job.organization}</td>
                <td>{job.role}</td>
                <td>{job.stipend}</td>
                <td>{job.type}</td>
                <td>{job.mode}</td>
                <td>{job.desc}</td>
                <td>{job.techStack}</td>
                <td>
                  <a href={`${job.applylink}`} target="_blank">
                    <div>Apply</div>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {jobs} */}
      </div>
    );
  }
}

export default JobListing;
