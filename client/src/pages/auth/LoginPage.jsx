import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import InputField from "../../components/forms/InputField";

import { loginUser } from "../../services/authService";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] =
  useState("");

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
      const data = await loginUser(formData);

      localStorage.setItem(
        "token",
        data.access_token
      );

      navigate("/dashboard");
    } catch (error) {

  console.error(error);

  if (error.response?.status === 401) {

    setErrorMessage(
      "Invalid email or password"
    );

  } else {

    setErrorMessage(
      "Something went wrong. Please try again."
    );
  }
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

      {/* Login Card */}

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
            Welcome Back
          </h1>

          <p
            className="
              text-zinc-500
              mt-3
              text-sm
              tracking-wide
            "
          >
            Login to continue your AI-powered
            resume analysis journey
          </p>
        </div>

        {/* Form */}

        <form
          className="space-y-6"
          onSubmit={handleSubmit}
        >
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
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            autocomplete="current-password"
          />

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
            "
          >
            LOGIN
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
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="
                text-violet-400
                hover:text-violet-300
                transition
                font-medium
              "
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;