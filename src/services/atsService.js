// import axios from "axios";

// export const analyzeATS = async (resume, jobDescription) => {
//   const { data } = await axios.post(
//     "http://localhost:4000/api/ats/analyze", 
//     { resume, jobDescription }
//   );
//   return data;
// };


import axios from "axios";
import { BASE_URL, API_PATHS } from "../utils/apiPaths";

export const analyzeATS = async (resume, jobDescription) => {
  const { data } = await axios.post(
    `${BASE_URL}${API_PATHS.ATS.ANALYZE}`,
    { resume, jobDescription }
  );
  return data;
};