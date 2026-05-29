import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  const navButton = (path) => {
    return `
      px-4
      md:px-5
      py-2.5
      rounded-xl
      text-xs
      md:text-sm
      font-medium
      transition-all
      duration-300
      border
      whitespace-nowrap

      ${
        location.pathname === path
          ? `
            bg-violet-500/15
            border-violet-500/30
            text-white
            shadow-[0_0_25px_rgba(139,92,246,0.15)]
          `
          : `
            bg-[#111111]
            border-[#222222]
            text-zinc-400
            hover:text-white
            hover:border-violet-500/30
            hover:bg-[#161616]
          `
      }
    `;
  };

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-[#1f1f1f]
        bg-[#0a0a0a]/80
        backdrop-blur-xl
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          md:px-6
          py-4
        "
      >
        {/* MOBILE + DESKTOP RESPONSIVE */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            items-center
            justify-between
            gap-6
          "
        >
          {/* Logo + Branding */}

          <div
            className="
              flex
              items-center
              gap-4
              text-center
              lg:text-left
            "
          >
            {/* Logo */}

            <div
              className="
                w-11
                h-11
                rounded-2xl
                bg-violet-500/10
                border
                border-violet-500/20
                flex
                items-center
                justify-center
                text-violet-400
                text-xl
                shadow-[0_0_20px_rgba(139,92,246,0.15)]
                shrink-0
              "
            >
              ✦
            </div>

            {/* Branding */}

            <div>
              <h1
                className="
                  text-xl
                  sm:text-2xl
                  md:text-3xl
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-white
                  leading-none
                "
              >
                AI RESUME ANALYZER
              </h1>

              <p
                className="
                  text-[10px]
                  sm:text-xs
                  text-zinc-500
                  mt-2
                  tracking-[0.18em]
                  uppercase
                "
              >
                Semantic ATS Intelligence
              </p>
            </div>
          </div>

          {/* Navigation */}

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-3
            "
          >
            <Link
              to="/dashboard"
              className={navButton("/dashboard")}
            >
              Dashboard
            </Link>

            <Link
              to="/history"
              className={navButton("/history")}
            >
              History
            </Link>

            <button
              onClick={handleLogout}
              className="
                px-4
                md:px-5
                py-2.5
                rounded-xl
                text-xs
                md:text-sm
                font-medium
                transition-all
                duration-300
                border
                border-red-500/20
                bg-red-500/10
                text-red-400
                hover:bg-red-500
                hover:text-white
                hover:border-red-500
                shadow-[0_0_20px_rgba(239,68,68,0.10)]
                whitespace-nowrap
              "
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;