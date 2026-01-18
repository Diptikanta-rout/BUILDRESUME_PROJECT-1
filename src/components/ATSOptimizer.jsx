import { useState } from "react";
import { analyzeATS } from "../services/atsService";
import { buttonStyles } from '../assets/dummystyle';

const ATSOptimizer = ({ resume }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const data = await analyzeATS(resume, jobDescription);
      setResult(data);
    } catch (err) {
      console.error("ATS analysis failed:", err.response?.data || err.message);
      alert("ATS analysis failed");
    }
    setLoading(false);
  };

  return (
    <div style={{ marginTop: "2px" }}>
      <h5>ATS Optimizer</h5>

      <textarea
        rows="3"
        placeholder="Paste Job Description here"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        style={{ width: "100%" }}
      />

      <button onClick={handleAnalyze} disabled={loading} className={buttonStyles.download} >
        {loading ? "Analyzing..." : "Optimize for ATS"}
      </button>

      {result && (
        <div style={{ marginTop: "15px" }}>
          <p><b>ATS Score:</b> {result.atsScore}%</p>
          <p><b>Keyword Match:</b> {result.matchPercentage}%</p>

          {result.missingSections.length > 0 && (
            <>
              <p><b>Missing Sections:</b></p>
              <ul>
                {result.missingSections.map(sec => <li key={sec}>{sec}</li>)}
              </ul>
            </>
          )}

          <p><b>Missing Keywords:</b></p>
          <ul>
            {result.missingKeywords.slice(0, 10).map(k => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ATSOptimizer;
