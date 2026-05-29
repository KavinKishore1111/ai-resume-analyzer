import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import HistoryPage from "./pages/history/HistoryPage";

import ProtectedRoute from "./routes/ProtectedRoute";

import SessionExpiredModal from "./components/ui/SessionExpiredModal";

function App() {
  const [sessionExpired, setSessionExpired] =
    useState(false);

  useEffect(() => {
    const handleSessionExpired = () => {
      setSessionExpired(true);
    };

    window.addEventListener(
      "session-expired",
      handleSessionExpired
    );

    return () => {
      window.removeEventListener(
        "session-expired",
        handleSessionExpired
      );
    };
  }, []);

  const handleCloseModal = () => {
    setSessionExpired(false);

    window.location.href = "/login";
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#0a0a0a]
        text-zinc-100
        relative
        overflow-hidden
      "
    >
      {/* Background Glow Effects */}

      <div
        className="
          absolute
          -top-30
          -left-30
          w-87.5
          h-87.5
          bg-violet-500/10
          rounded-full
          blur-3xl
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -bottom-37.5
          -right-25
          w-87.5
          h-87.5
          bg-cyan-500/10
          rounded-full
          blur-3xl
          pointer-events-none
        "
      />

      {/* Routes */}

      <div className="relative z-10">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/login" />}
          />

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/signup"
            element={<SignupPage />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {/* Session Expired Modal */}

      <SessionExpiredModal
        isOpen={sessionExpired}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;