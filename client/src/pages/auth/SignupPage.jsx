import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import InputField from "../../components/forms/InputField";

import { signupUser } from "../../services/authService";

function SignupPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setErrorMessage("");

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await signupUser(formData);

      navigate("/login");

    } catch (error) {

      console.error(error);

      setErrorMessage(
        error.response?.data?.detail ||
        "Signup failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-6
        relative
        overflow-hidden
      "
    >
      {/* Glow Effects */}

      <div
        className="
          absolute
          -top-25
          -left-25
          w-75
          h-75
          bg-violet-500/10
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-25
          -right-25
          w-75
          h-75
          bg-cyan-500/10
          rounded-full
          blur-3xl
        "
      />

      {/* Signup Card */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-md
          bg-[#111111]/80
          backdrop-blur-2xl
          border
          border-[#222222]
          rounded-3xl
          shadow-[0_0_40px_rgba(0,0,0,0.45)]
          p-10
        "
      >
        {/* Branding */}

        <div className="text-center mb-10">

          <div
            className="
              w-16
              h-16
              mx-auto
              rounded-3xl
              bg-violet-500/10
              border
              border-violet-500/20
              flex
              items-center
              justify-center
              text-violet-400
              text-3xl
              mb-6
              shadow-[0_0_30px_rgba(139,92,246,0.15)]
            "
          >
            ✦
          </div>

          <h1
            className="
              text-4xl
              font-bold
              tracking-tight
              text-white
            "
          >
            Create Account
          </h1>

          <p
            className="
              text-zinc-500
              mt-3
              text-sm
              tracking-wide
            "
          >
            Start your AI-powered resume
            optimization journey
          </p>
        </div>

        {/* Form */}

        <form
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <InputField
            label="Name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            autocomplete="name"
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            autocomplete="email"
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            autocomplete="new-password"
          />

          {/* Error */}

          {errorMessage && (
            <div
              className="
                p-3
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                text-red-400
                text-sm
              "
            >
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-3.5
              rounded-2xl
              bg-violet-500
              hover:bg-violet-600
              text-white
              font-semibold
              tracking-wide
              transition-all
              duration-300
              shadow-[0_0_25px_rgba(139,92,246,0.25)]
              disabled:opacity-50
            "
          >
            {loading
              ? "CREATING ACCOUNT..."
              : "CREATE ACCOUNT"}
          </button>
        </form>

        {/* Bottom Text */}

        <div className="mt-8 text-center">
          <p
            className="
              text-zinc-500
              text-sm
            "
          >
            Already have an account?{" "}

            <Link
              to="/login"
              className="
                text-violet-400
                hover:text-violet-300
                transition
                font-medium
              "
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;