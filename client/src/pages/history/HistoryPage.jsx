import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { getAnalysisHistory } from "../../services/historyService";

function HistoryPage() {
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data =
        await getAnalysisHistory();

      setHistory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) {
      return `
        bg-green-500/10
        border-green-500/20
        text-green-400
      `;
    }

    if (score >= 60) {
      return `
        bg-yellow-500/10
        border-yellow-500/20
        text-yellow-400
      `;
    }

    if (score >= 40) {
      return `
        bg-orange-500/10
        border-orange-500/20
        text-orange-400
      `;
    }

    return `
      bg-red-500/10
      border-red-500/20
      text-red-400
    `;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}

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
              -top-25
              -right-25
              w-62.5
              h-62.5
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
              Analysis History
            </h1>

            <p
              className="
                text-zinc-400
                text-lg
                max-w-2xl
                leading-relaxed
              "
            >
              View all your previous AI-powered
              ATS resume analyses and scoring
              history.
            </p>
          </div>
        </div>

        {/* Loading */}

        {loading ? (
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
            <div
              className="
                w-14
                h-14
                mx-auto
                rounded-full
                border-4
                border-violet-500/20
                border-t-violet-500
                animate-spin
                mb-6
              "
            />

            <h2
              className="
                text-2xl
                font-bold
                text-white
                mb-3
              "
            >
              Loading History
            </h2>

            <p className="text-zinc-500">
              Fetching your previous ATS
              analyses...
            </p>
          </div>
        ) : history.length === 0 ? (
          /* Empty State */
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
              📂
            </div>

            <h2
              className="
                text-3xl
                font-bold
                text-white
                mb-4
              "
            >
              No Analysis History
            </h2>

            <p
              className="
                text-zinc-500
                max-w-xl
                mx-auto
              "
            >
              Your completed ATS analyses will
              appear here once you analyze your
              first resume.
            </p>
          </div>
        ) : (
          /* History Cards */

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-6
            "
          >
            {history.map((item, index) => {
              const score =
                item.match_score ||
                item.analysis?.match_score ||
                0;

              return (
                <div
                  key={index}
                  className="
                    group
                    bg-[#111111]
                    border
                    border-[#222222]
                    rounded-3xl
                    p-8
                    transition-all
                    duration-300

                    hover:border-violet-500/20
                    hover:bg-[#141414]
                    hover:shadow-[0_0_35px_rgba(139,92,246,0.08)]
                  "
                >
                  {/* Top */}

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                      mb-6
                    "
                  >
                    <div>
                      <h2
                        className="
                          text-2xl
                          font-bold
                          text-white
                          mb-2
                        "
                      >
                        Analysis #{index + 1}
                      </h2>

                      <p
                        className="
                          text-zinc-500
                          text-sm
                        "
                      >
                        Resume ATS Analysis
                      </p>
                    </div>

                    {/* Score Badge */}

                    <div
                      className={`
                        px-5
                        py-3
                        rounded-2xl
                        border
                        text-lg
                        font-bold
                        ${getScoreColor(score)}
                      `}
                    >
                      {score.toFixed(0)}%
                    </div>
                  </div>

                  {/* Details */}

                  <div className="space-y-4">
                    {/* Resume */}

                    <div
                      className="
                        bg-[#0f0f0f]
                        border
                        border-[#1f1f1f]
                        rounded-2xl
                        p-4
                      "
                    >
                      <p
                        className="
                          text-zinc-500
                          text-sm
                          mb-1
                        "
                      >
                        Resume
                      </p>

                      <p
                        className="
                          text-zinc-200
                          font-medium
                        "
                      >
                        {item.resume_name ||
                          "Uploaded Resume"}
                      </p>
                    </div>

                    {/* Date */}

                    <div
                      className="
                        bg-[#0f0f0f]
                        border
                        border-[#1f1f1f]
                        rounded-2xl
                        p-4
                      "
                    >
                      <p
                        className="
                          text-zinc-500
                          text-sm
                          mb-1
                        "
                      >
                        Created At
                      </p>

                      <p
                        className="
                          text-zinc-200
                          font-medium
                        "
                      >
                        {item.created_at
                          ? new Date(
                              item.created_at
                            ).toLocaleString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Glow */}

                  <div
                    className="
                      mt-6
                      h-px
                      bg-linear-to-r
                      from-transparent
                      via-violet-500/30
                      to-transparent
                    "
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default HistoryPage;