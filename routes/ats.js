// //ats optimizer

// import express from "express";
// const router = express.Router();

// // router.post("/analyze", (req, res) => {
// //   const { resume, jobDescription } = req.body;
// //   res.json({
// //     atsScore: 80,
// //     matchPercentage: 70,
// //     missingSections: ["Education"],
// //     missingKeywords: ["React", "TypeScript"]
// //   });
// // });


// export default router;


import express from "express";
const router = express.Router();

router.post("/analyze", (req, res) => {
  const { resume, jobDescription } = req.body;

  if (!resume || !jobDescription) {
    return res.status(400).json({ message: "Resume and job description are required" });
  }

  // Extract keywords from job description (basic split)
  const jdKeywords = jobDescription.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];

  // Collect resume text from structured fields
  const resumeText = [
    resume.profileInfo?.fullName,
    resume.profileInfo?.designation,
    resume.profileInfo?.summary,
    resume.contactInfo?.email,
    resume.contactInfo?.phone,
    ...(resume.skills?.map(s => s.name) || []),
    ...(resume.workExperience?.map(w => w.role) || []),
    ...(resume.education?.map(e => e.degree) || []),
    ...(resume.projects?.map(p => p.title) || []),
    ...(resume.certifications?.map(c => c.title) || []),
    ...(resume.languages?.map(l => l.name) || []),
    ...(resume.interests || [])
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  // Find missing keywords
  const missingKeywords = jdKeywords.filter(
    (word) => !resumeText.includes(word)
  );

  // Calculate match percentage
  const matchPercentage =
    jdKeywords.length > 0
      ? Math.round(((jdKeywords.length - missingKeywords.length) / jdKeywords.length) * 100)
      : 0;

  // Simple ATS score formula
  const atsScore = Math.min(85, matchPercentage);

  // Section detection
  const requiredSections = ["Education", "Experience", "Skills", "Projects"];
  const missingSections = requiredSections.filter(
    (section) => !resumeText.includes(section.toLowerCase())
  );

  res.json({
    atsScore,
    matchPercentage,
    missingSections,
    missingKeywords,
  });
});

export default router;