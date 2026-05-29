import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function DashboardLayout({ children }) {
  return (
    <div
      className="
        min-h-screen
        flex
        flex-col
      "
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main
        className="
          flex-1
          w-full
          max-w-7xl
          mx-auto
          px-6
          py-10
        "
      >
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default DashboardLayout;