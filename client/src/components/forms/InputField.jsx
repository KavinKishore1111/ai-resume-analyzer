function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  autocomplete,
}) {
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={name}
        className="
          text-sm
          font-medium
          tracking-wide
          text-zinc-300
        "
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autocomplete}
        className="
          w-full
          rounded-2xl
          border
          border-[#222222]
          bg-[#0f0f0f]
          px-5
          py-3.5
          text-white
          placeholder:text-zinc-600
          outline-none
          transition-all
          duration-300

          focus:border-violet-500/40
          focus:bg-[#141414]
          focus:shadow-[0_0_25px_rgba(139,92,246,0.10)]

          hover:border-[#333333]
        "
      />
    </div>
  );
}

export default InputField;