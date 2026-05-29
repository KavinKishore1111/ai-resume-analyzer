function SessionExpiredModal({
  isOpen,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-999
        flex
        items-center
        justify-center
        bg-black/70
        backdrop-blur-sm
        px-6
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-[#111111]
          border
          border-[#222222]
          rounded-3xl
          p-8
          shadow-[0_0_50px_rgba(0,0,0,0.45)]
          text-center
        "
      >
        {/* Icon */}

        <div
          className="
            w-20
            h-20
            mx-auto
            rounded-full
            bg-red-500/10
            border
            border-red-500/20
            flex
            items-center
            justify-center
            text-4xl
            text-red-400
            mb-6
          "
        >
          ⚠
        </div>

        {/* Title */}

        <h2
          className="
            text-3xl
            font-bold
            text-white
            mb-4
          "
        >
          Session Expired
        </h2>

        {/* Description */}

        <p
          className="
            text-zinc-400
            leading-relaxed
            mb-8
          "
        >
          Your login session has expired.
          Please login again to continue
          using AI Resume Analyzer.
        </p>

        {/* Button */}

        <button
          onClick={onClose}
          className="
            w-full
            py-3.5
            rounded-2xl
            bg-violet-500
            hover:bg-violet-600
            transition-all
            duration-300
            text-white
            font-semibold
            shadow-[0_0_25px_rgba(139,92,246,0.25)]
          "
        >
          Go To Login
        </button>
      </div>
    </div>
  );
}

export default SessionExpiredModal;