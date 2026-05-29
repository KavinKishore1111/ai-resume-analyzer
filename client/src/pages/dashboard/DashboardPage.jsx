import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { getCurrentUser } from "../../services/userService";

import { analyzeResume } from "../../services/analysisService";

function DashboardPage() {
  const [user, setUser] = useState(null);

  const [file, setFile] = useState(null);

  const [jobDescription, setJobDescription] =
    useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const data = await getCurrentUser();

      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a resume PDF");

      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter job description");

      return;
    }

    try {
      setLoading(true);

      const data = await analyzeResume(
        file,
        jobDescription
      );

      setResult(data);
    } catch (error) {
    console.error(error);

    if (error.response?.status !== 401) {
      alert("Analysis failed");
    }
  }finally {
      setLoading(false);
    }
  };

  const score =
    result?.analysis?.match_score || 0;

  const getScoreLabel = () => {
    if (score >= 80)
      return "Excellent Match";

    if (score >= 60)
      return "Good Match";

    if (score >= 40)
      return "Moderate Match";

    return "Low Match";
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Hero Section */}

        <div
          className="
            bg-[#111111]
            border
            border-[#222222]
            rounded-3xl
            p-10
            shadow-[0_0_40px_rgba(0,0,0,0.35)]
            relative
            overflow-hidden
          "
        >
          {/* Glow */}

          <div
            className="
              absolute
              -top-30
              -right-30
              w-65
              h-65
              bg-violet-500/10
              rounded-full
              blur-3xl
            "
          />

          <div className="relative z-10">
            <h1
              className="
                text-5xl
                font-bold
                tracking-tight
                text-white
                mb-4
              "
            >
              AI Resume Analyzer
            </h1>

            <p
              className="
                text-zinc-400
                text-lg
                max-w-2xl
                leading-relaxed
              "
            >
              Upload your resume and compare it
              against a job description using
              semantic AI analysis and ATS-style
              scoring intelligence.
            </p>

            {user && (
              <div
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-3
                  bg-violet-500/10
                  border
                  border-violet-500/20
                  px-5
                  py-3
                  rounded-2xl
                "
              >
                <div
                  className="
                    w-3
                    h-3
                    rounded-full
                    bg-green-400
                  "
                />

                <span className="text-zinc-300">
                  Logged in as{" "}
                  <span className="text-violet-400 font-medium">
                    {user.email}
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Upload + JD Section */}

        <div
          className="
            bg-[#111111]
            border
            border-[#222222]
            rounded-3xl
            p-8
            shadow-[0_0_30px_rgba(0,0,0,0.30)]
          "
        >
          <form
            onSubmit={handleAnalyze}
            className="space-y-8"
          >
            {/* Upload */}

            <div>
              <label
                className="
                  block
                  text-zinc-300
                  font-medium
                  mb-4
                  tracking-wide
                "
              >
                Upload Resume (PDF)
              </label>

              <div
                className="
                  border-2
                  border-dashed
                  border-[#2a2a2a]
                  hover:border-violet-500/40
                  transition-all
                  duration-300
                  rounded-3xl
                  bg-[#0f0f0f]
                  p-10
                  text-center
                  relative
                  overflow-hidden
                "
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const selectedFile =
                      e.target.files[0];

                    if (!selectedFile) return;

                    if (
                      selectedFile.type !==
                      "application/pdf"
                    ) {
                      alert(
                        "Only PDF files are allowed"
                      );

                      return;
                    }

                    if (
                      selectedFile.size >
                      5 * 1024 * 1024
                    ) {
                      alert(
                        "File size must be under 5MB"
                      );

                      return;
                    }

                    setFile(selectedFile);
                  }}
                  className="
                    absolute
                    inset-0
                    opacity-0
                    cursor-pointer
                  "
                />

                <div className="space-y-4">
                  <div
                    className="
                      text-5xl
                    "
                  >
                    📄
                  </div>

                  <h3
                    className="
                      text-2xl
                      font-semibold
                      text-white
                    "
                  >
                    Upload Your Resume
                  </h3>

                  <p className="text-zinc-500">
                    Drag & drop or click to upload
                    your PDF resume
                  </p>

                  {file && (
                    <div
                      className="
                        mt-5
                        inline-flex
                        items-center
                        gap-3
                        px-5
                        py-3
                        rounded-2xl
                        bg-violet-500/10
                        border
                        border-violet-500/20
                        text-violet-300
                      "
                    >
                      ✓ {file.name}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Job Description */}

            <div>
              <label
                className="
                  block
                  text-zinc-300
                  font-medium
                  mb-4
                  tracking-wide
                "
              >
                Job Description
              </label>

              <textarea
                rows="10"
                placeholder="Paste job description here..."
                value={jobDescription}
                onChange={(e) =>
                  setJobDescription(
                    e.target.value
                  )
                }
                className="
                  w-full
                  rounded-3xl
                  border
                  border-[#222222]
                  bg-[#0f0f0f]
                  p-6
                  text-white
                  placeholder:text-zinc-600
                  outline-none
                  resize-none
                  transition-all
                  duration-300

                  focus:border-violet-500/40
                  focus:bg-[#141414]
                  focus:shadow-[0_0_25px_rgba(139,92,246,0.10)]
                "
              />
            </div>

            {/* Analyze Button */}

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full
                py-4
                rounded-2xl
                font-semibold
                tracking-wide
                transition-all
                duration-300
                text-white
                text-lg

                ${
                  loading
                    ? `
                      bg-zinc-700
                      cursor-not-allowed
                    `
                    : `
                      bg-violet-500
                      hover:bg-violet-600
                      shadow-[0_0_30px_rgba(139,92,246,0.25)]
                    `
                }
              `}
            >
              {loading
                ? "Analyzing Resume..."
                : "Analyze Resume"}
            </button>
          </form>
        </div>

        {/* Empty State */}

        {!result && (
          <div
            className="
              bg-[#111111]
              border
              border-[#222222]
              rounded-3xl
              p-14
              text-center
            "
          >
            <div className="text-6xl mb-5">
              ✨
            </div>

            <h2
              className="
                text-3xl
                font-bold
                text-white
                mb-4
              "
            >
              No Analysis Yet
            </h2>

            <p
              className="
                text-zinc-500
                max-w-xl
                mx-auto
              "
            >
              Upload your resume and compare it
              against a job description to
              generate AI-powered ATS analysis.
            </p>
          </div>
        )}

        {/* Results */}

{result && (
  <div className="space-y-8">
    {/* Main Score Card */}

    <div
      className="
        bg-[#111111]
        border
        border-[#222222]
        rounded-3xl
        p-10
        shadow-[0_0_30px_rgba(0,0,0,0.30)]
      "
    >
      <div
        className="
          flex
          flex-col
          lg:flex-row
          items-center
          gap-12
        "
      >
        {/* Score Circle */}

        <div
          className="
            w-52
            h-52
            rounded-full
            bg-violet-500/10
            border
            border-violet-500/20
            flex
            flex-col
            items-center
            justify-center
            shadow-[0_0_50px_rgba(139,92,246,0.15)]
          "
        >
          <span
            className="
              text-5xl
              font-bold
              text-white
            "
          >
            {score.toFixed(2)}%
          </span>

          <span
            className="
              text-sm
              text-violet-400
              mt-3
              uppercase
              tracking-[0.3em]
            "
          >
            ATS SCORE
          </span>
        </div>

        {/* Right Side */}

        <div className="flex-1 w-full">
          <h2
            className="
              text-4xl
              font-bold
              text-white
              mb-4
            "
          >
            {getScoreLabel()}
          </h2>

          <p
            className="
              text-zinc-400
              text-lg
              leading-relaxed
              mb-8
            "
          >
            AI-powered semantic analysis
            comparing your resume against
            the provided job description.
          </p>

          {/* AI Match Metrics */}

          <div className="space-y-6">
            {/* Technical Alignment */}

            <div>
              <div
                className="
                  flex
                  justify-between
                  mb-2
                "
              >
                <span className="text-zinc-300">
                  Technical Alignment
                </span>

                <span className="text-cyan-400 font-medium">
                  {Math.min(
                    score + 8,
                    100
                  ).toFixed(0)}
                  %
                </span>
              </div>

              <div
                className="
                  w-full
                  h-3
                  rounded-full
                  bg-[#1a1a1a]
                  overflow-hidden
                "
              >
                <div
                  className="
                    h-full
                    rounded-full
                    bg-cyan-400
                    transition-all
                    duration-700
                  "
                  style={{
                    width: `${Math.min(
                      score + 8,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Role Compatibility */}

            <div>
              <div
                className="
                  flex
                  justify-between
                  mb-2
                "
              >
                <span className="text-zinc-300">
                  Role Compatibility
                </span>

                <span className="text-green-400 font-medium">
                  {Math.max(
                    score - 5,
                    0
                  ).toFixed(0)}
                  %
                </span>
              </div>

              <div
                className="
                  w-full
                  h-3
                  rounded-full
                  bg-[#1a1a1a]
                  overflow-hidden
                "
              >
                <div
                  className="
                    h-full
                    rounded-full
                    bg-green-400
                    transition-all
                    duration-700
                  "
                  style={{
                    width: `${Math.max(
                      score - 5,
                      0
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* ATS Readiness */}

            <div>
              <div
                className="
                  flex
                  justify-between
                  mb-2
                "
              >
                <span className="text-zinc-300">
                  ATS Readiness
                </span>

                <span className="text-violet-400 font-medium">
                  {score.toFixed(0)}%
                </span>
              </div>

              <div
                className="
                  w-full
                  h-3
                  rounded-full
                  bg-[#1a1a1a]
                  overflow-hidden
                "
              >
                <div
                  className="
                    h-full
                    rounded-full
                    bg-violet-400
                    transition-all
                    duration-700
                  "
                  style={{
                    width: `${score}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* AI Recommendations */}

          <div
            className="
              mt-10
              p-6
              rounded-3xl
              bg-violet-500/10
              border
              border-violet-500/20
            "
          >
            <h3
              className="
                text-violet-400
                font-semibold
                mb-5
                text-xl
              "
            >
              AI Recommendations
            </h3>

            <div className="space-y-4">
              {result.analysis.recommendations.map(
                (recommendation, index) => (
                  <div
                    key={index}
                    className="
                      flex
                      items-start
                      gap-3
                      text-zinc-300
                      leading-relaxed
                    "
                  >
                    <span
                      className="
                        text-violet-400
                        mt-1
                      "
                    >
                      ✦
                    </span>

                    <p>{recommendation}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* AI Insights */}

    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
      "
    >
      {/* Insight 1 */}

      <div
        className="
          bg-[#111111]
          border
          border-[#222222]
          rounded-3xl
          p-6
        "
      >
        <p className="text-zinc-500 mb-3">
          Resume Strength
        </p>

        <h3
          className="
            text-2xl
            font-bold
            text-white
          "
        >
          {score >= 70
            ? "Strong"
            : score >= 50
            ? "Moderate"
            : "Needs Improvement"}
        </h3>
      </div>

      {/* Insight 2 */}

      <div
        className="
          bg-[#111111]
          border
          border-[#222222]
          rounded-3xl
          p-6
        "
      >
        <p className="text-zinc-500 mb-3">
          Matched Skills
        </p>

        <h3
          className="
            text-2xl
            font-bold
            text-green-400
          "
        >
          {
            result.analysis.matched_keywords
              .length
          }
        </h3>
      </div>

      {/* Insight 3 */}

      <div
        className="
          bg-[#111111]
          border
          border-[#222222]
          rounded-3xl
          p-6
        "
      >
        <p className="text-zinc-500 mb-3">
          Missing Skills
        </p>

        <h3
          className="
            text-2xl
            font-bold
            text-red-400
          "
        >
          {
            result.analysis.missing_keywords
              .length
          }
        </h3>
      </div>
    </div>

    {/* Skills Grid */}

    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-8
      "
    >
      {/* Matched Skills */}

      <div
        className="
          bg-[#111111]
          border
          border-[#222222]
          rounded-3xl
          p-8
        "
      >
        <h2
          className="
            text-2xl
            font-bold
            text-green-400
            mb-6
          "
        >
          Matched Skills
        </h2>

        <div className="flex flex-wrap gap-3">
          {result.analysis.matched_keywords.map(
            (skill, index) => (
              <span
                key={index}
                className="
                  px-4
                  py-2
                  rounded-2xl
                  bg-green-500/10
                  border
                  border-green-500/20
                  text-green-300
                  text-sm
                  font-medium
                "
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>

      {/* Missing Skills */}

      <div
        className="
          bg-[#111111]
          border
          border-[#222222]
          rounded-3xl
          p-8
        "
      >
        <h2
          className="
            text-2xl
            font-bold
            text-red-400
            mb-6
          "
        >
          Missing Skills
        </h2>

        <div className="flex flex-wrap gap-3">
          {result.analysis.missing_keywords.map(
            (skill, index) => (
              <span
                key={index}
                className="
                  px-4
                  py-2
                  rounded-2xl
                  bg-red-500/10
                  border
                  border-red-500/20
                  text-red-300
                  text-sm
                  font-medium
                "
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  </div>
)}
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;