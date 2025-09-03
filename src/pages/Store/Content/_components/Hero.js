const Hero = ({ component }) => {
  // Find the first image for background
  const bgImg = Array.isArray(component.content)
    ? component.content.find((el) => el.tag === "img")
    : null;

  return (
    <div
      className="relative flex items-center min-h-[340px] overflow-hidden"
      style={{
        ...(bgImg && {
          backgroundImage: `url(${bgImg.content})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }),
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 w-full max-w-2xl px-10 py-16 flex flex-col gap-4 text-white">
        {Array.isArray(component.content) &&
          component.content.map((el, i) => {
            if (el.tag === "img") return null; // skip, used as bg
            if (el.tag === "button") {
              return (
                <button
                  key={i}
                  className="inline-block px-8 py-3 rounded border border-white bg-white/10 text-white font-semibold hover:bg-white/20 transition shadow"
                >
                  {el.content}
                </button>
              );
            }
            const Tag = el.tag;
            // Style h1, h2, p, etc. for hero
            let extra = "";
            if (Tag === "h1") extra = "text-4xl md:text-5xl font-bold mb-2";
            if (Tag === "h2") extra = "text-2xl md:text-3xl font-semibold mb-2";
            if (Tag === "p") extra = "text-lg md:text-xl mb-4";
            return (
              <Tag key={i} className={extra + " block"}>
                {el.content}
              </Tag>
            );
          })}
      </div>
    </div>
  );
};

export default Hero;
