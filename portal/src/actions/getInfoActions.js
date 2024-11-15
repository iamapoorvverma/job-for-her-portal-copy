import axios from "axios";

// Login - get user token
export const getUser = (name) => {
  return axios.post("/api/users/", { body: { name: name } });
  // .then((data) => data.json())
  //   .then((res) => res.data)
};

export const getOrg = (name) => {
  return axios.post("/api/organizations/", { body: { name: name } });
};

export const getJobs = () => {
  return axios.get("/api/jobs/getAll");
};
export const getJobsByOrg = (organization) => {
  return axios.post("/api/jobs/getByOrg", {
    body: { organization: organization },
  });
};
