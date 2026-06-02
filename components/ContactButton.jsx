export default function ContactButton({
  label = "Book a free consult",
  href = "#contact",
  className = "",
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white whitespace-nowrap transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] ${className}`}
      style={{
        background:
          "linear-gradient(123deg, #0b1220 7%, #2b5cff 40%, #5b8cff 72%, #9fb6d8 100%)",
        boxShadow:
          "0px 4px 4px rgba(43, 92, 255, 0.25), 4px 4px 12px #2b5cff inset",
        outline: "2px solid #FFFFFF",
        outlineOffset: "-3px",
      }}
    >
      {label}
    </a>
  );
}
