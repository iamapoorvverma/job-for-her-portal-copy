import axios from "axios";

export const addOpening = (jobData) => {
  axios.post("/api/jobs/add", jobData);
};
