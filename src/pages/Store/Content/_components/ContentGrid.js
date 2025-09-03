import cn from "classnames";

const ContentGrid = ({ component }) => {
  // Use settings.grid if available, else fallback
  const gridConfig =
    component.settings && component.settings.grid
      ? component.settings.grid
      : component.gridConfig || { columns: 3, rows: 1 };
  const columns = gridConfig.columns || 3;
  const rows = gridConfig.rows || 1;
  const items = Array.isArray(component.content) ? component.content : [];

  return (
    <div className="w-full mb-8 last:mb-0">
      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          ...(rows > 1
            ? { gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }
            : {}),
        }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center border border-gray-200 hover:shadow-lg transition"
          >
            {item.img && (
              <img
                src={item.img}
                alt={item.title || ""}
                className="w-full h-32 object-cover rounded mb-3"
              />
            )}
            {item.title && (
              <h3 className="text-lg font-bold mb-1 text-gray-900">
                {item.title}
              </h3>
            )}
            {item.subtitle && (
              <h4 className="text-md font-semibold mb-1 text-gray-700">
                {item.subtitle}
              </h4>
            )}
            {item.description && (
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            )}
            {item.cta?.text && (
              <a
                href={item.cta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 rounded bg-[#C6CB8D] text-[#232323] font-semibold hover:bg-[#D6E08D] transition border border-[#C6CB8D]"
              >
                {item.cta.text}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentGrid;
