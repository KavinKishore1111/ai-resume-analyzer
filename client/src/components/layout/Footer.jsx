function Footer() {
  return (
    <footer
      className="
        border-t
        border-[#1f1f1f]
        bg-[#0a0a0a]/80
        backdrop-blur-xl
        mt-10
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-6
          text-center
        "
      >
        <p
          className="
            text-zinc-500
            text-sm
            tracking-wide
          "
        >
          Powered by AI • Built by{" "}
          <span
            className="
              text-violet-400
              font-medium
            "
          >
            Kavin Kishore
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;