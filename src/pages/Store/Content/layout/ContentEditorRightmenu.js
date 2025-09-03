import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedComponent,
  setSelectedPage,
} from "../../../../redux/slices/StoreSlice";
import { DownOutlined, RightOutlined } from "@ant-design/icons";

// Map tag to label
const tagLabelMap = {
  img: "Background Image",
  h1: "Title",
  h2: "Subtitle",
  p: "Description",
  button: "Button",
};

const ContentEditorRightmenu = () => {
  const dispatch = useDispatch();
  const selectedComponent = useSelector(
    (state) => state.store.selectedComponent
  );
  const selectedGridItem = useSelector((state) => state.store.selectedGridItem);
  const selectedPage = useSelector((state) => state.store.selectedPage);
  const [openPanels, setOpenPanels] = useState([]);

  if (!selectedComponent) {
    return (
      <aside className="h-full w-full bg-[#20211F] text-white flex flex-col p-4 border-l border-[#232323] overflow-y-auto min-w-[260px]">
        <span className="text-xs text-[#B5B5B5] italic">
          Selecciona una sección para editar sus propiedades.
        </span>
      </aside>
    );
  }

  // Helper to update a tag's content in selectedComponent and selectedPage
  const handleContentChange = (idx, newContent, newStyle) => {
    if (!Array.isArray(selectedComponent.content)) return;
    const updatedComponent = {
      ...selectedComponent,
      content: selectedComponent.content.map((el, i) =>
        i === idx
          ? {
              ...el,
              content: newContent,
              style: newStyle !== undefined ? newStyle : el.style,
            }
          : el
      ),
    };
    dispatch(setSelectedComponent(updatedComponent));
    // Also update in selectedPage
    if (selectedPage && Array.isArray(selectedPage.components)) {
      const updatedPage = {
        ...selectedPage,
        components: selectedPage.components.map((comp) =>
          comp.id === updatedComponent.id ? updatedComponent : comp
        ),
      };
      dispatch(setSelectedPage(updatedPage));
    }
  };

  // Helper to update settings.grid (for grid config)
  const handleGridSettingsChange = (key, value) => {
    const updatedComponent = {
      ...selectedComponent,
      settings: {
        ...selectedComponent.settings,
        grid: {
          ...selectedComponent.settings?.grid,
          [key]: value,
        },
      },
    };
    dispatch(setSelectedComponent(updatedComponent));
    // Also update in selectedPage
    if (selectedPage && Array.isArray(selectedPage.components)) {
      const updatedPage = {
        ...selectedPage,
        components: selectedPage.components.map((comp) =>
          comp.id === updatedComponent.id ? updatedComponent : comp
        ),
      };
      dispatch(setSelectedPage(updatedPage));
    }
  };

  // Grid item handlers for content-grid
  const handleGridItemChange = (idx, newItem) => {
    if (!Array.isArray(selectedComponent.content)) return;
    const updatedContent = selectedComponent.content.map((item, i) =>
      i === idx ? newItem : item
    );
    const updatedComponent = { ...selectedComponent, content: updatedContent };
    dispatch(setSelectedComponent(updatedComponent));
    if (selectedPage && Array.isArray(selectedPage.components)) {
      const updatedPage = {
        ...selectedPage,
        components: selectedPage.components.map((comp) =>
          comp.id === updatedComponent.id ? updatedComponent : comp
        ),
      };
      dispatch(setSelectedPage(updatedPage));
    }
  };

  const handleAddGridItem = () => {
    const updatedContent = [
      ...(Array.isArray(selectedComponent.content)
        ? selectedComponent.content
        : []),
      {
        img: "",
        title: "",
        subtitle: "",
        description: "",
        cta: { text: "", url: "" },
      },
    ];
    const updatedComponent = { ...selectedComponent, content: updatedContent };
    dispatch(setSelectedComponent(updatedComponent));
    if (selectedPage && Array.isArray(selectedPage.components)) {
      const updatedPage = {
        ...selectedPage,
        components: selectedPage.components.map((comp) =>
          comp.id === updatedComponent.id ? updatedComponent : comp
        ),
      };
      dispatch(setSelectedPage(updatedPage));
    }
  };

  const handleRemoveGridItem = (idx) => {
    if (!Array.isArray(selectedComponent.content)) return;
    const updatedContent = selectedComponent.content.filter(
      (_, i) => i !== idx
    );
    const updatedComponent = { ...selectedComponent, content: updatedContent };
    dispatch(setSelectedComponent(updatedComponent));
    if (selectedPage && Array.isArray(selectedPage.components)) {
      const updatedPage = {
        ...selectedPage,
        components: selectedPage.components.map((comp) =>
          comp.id === updatedComponent.id ? updatedComponent : comp
        ),
      };
      dispatch(setSelectedPage(updatedPage));
    }
  };

  return (
    <aside className="h-full w-full bg-[#20211F] text-white flex flex-col p-4 border-l border-[#232323] overflow-y-auto min-w-[260px]">
      {/* General Settings for grid config */}
      {selectedComponent.type === "content-grid" && (
        <>
          <div className="mb-4 border-b border-[#232323] pb-2">
            <h3 className="text-sm font-bold mb-2">General Settings</h3>
            <div className="flex flex-col gap-2">
              <label className="text-white text-xs">Columns</label>
              <input
                type="number"
                min={1}
                max={6}
                className="bg-[#232323] text-white rounded px-2 py-1 text-xs border border-[#444] w-20"
                value={
                  selectedComponent.settings?.grid?.columns === undefined
                    ? ""
                    : selectedComponent.settings.grid.columns
                }
                onChange={(e) => {
                  const val = e.target.value;
                  handleGridSettingsChange(
                    "columns",
                    val === "" ? undefined : Number(val)
                  );
                }}
              />
              <label className="text-white text-xs mt-2">Rows</label>
              <input
                type="number"
                min={1}
                max={6}
                className="bg-[#232323] text-white rounded px-2 py-1 text-xs border border-[#444] w-20"
                value={
                  selectedComponent.settings?.grid?.rows === undefined
                    ? ""
                    : selectedComponent.settings.grid.rows
                }
                onChange={(e) => {
                  const val = e.target.value;
                  handleGridSettingsChange(
                    "rows",
                    val === "" ? undefined : Number(val)
                  );
                }}
              />
            </div>
          </div>
          {/* Grid Item Editor: only show for selectedGridItem */}
          <div className="mb-4">
            <h3 className="text-sm font-bold mb-2">Grid Item Editor</h3>
            {Array.isArray(selectedComponent.content) &&
              selectedGridItem &&
              selectedGridItem.itemIndex >= 0 &&
              selectedGridItem.itemIndex < selectedComponent.content.length &&
              (() => {
                const idx = selectedGridItem.itemIndex;
                const item = selectedComponent.content[idx];
                return (
                  <div className="mb-3 p-2 rounded bg-[#232323]">
                    <div className="flex flex-col gap-2">
                      <label className="text-white text-xs">Image URL</label>
                      <input
                        type="text"
                        className="bg-[#20211F] text-white rounded px-2 py-1 text-xs border border-[#444]"
                        value={item.img || ""}
                        onChange={(e) =>
                          handleGridItemChange(idx, {
                            ...item,
                            img: e.target.value,
                          })
                        }
                      />
                      <label className="text-white text-xs">Title</label>
                      <input
                        type="text"
                        className="bg-[#20211F] text-white rounded px-2 py-1 text-xs border border-[#444]"
                        value={item.title || ""}
                        onChange={(e) =>
                          handleGridItemChange(idx, {
                            ...item,
                            title: e.target.value,
                          })
                        }
                      />
                      <label className="text-white text-xs">Subtitle</label>
                      <input
                        type="text"
                        className="bg-[#20211F] text-white rounded px-2 py-1 text-xs border border-[#444]"
                        value={item.subtitle || ""}
                        onChange={(e) =>
                          handleGridItemChange(idx, {
                            ...item,
                            subtitle: e.target.value,
                          })
                        }
                      />
                      <label className="text-white text-xs">Description</label>
                      <textarea
                        className="bg-[#20211F] text-white rounded px-2 py-1 text-xs border border-[#444]"
                        value={item.description || ""}
                        onChange={(e) =>
                          handleGridItemChange(idx, {
                            ...item,
                            description: e.target.value,
                          })
                        }
                      />
                      <label className="text-white text-xs">CTA Text</label>
                      <input
                        type="text"
                        className="bg-[#20211F] text-white rounded px-2 py-1 text-xs border border-[#444]"
                        value={item.cta?.text || ""}
                        onChange={(e) =>
                          handleGridItemChange(idx, {
                            ...item,
                            cta: { ...item.cta, text: e.target.value },
                          })
                        }
                      />
                      <label className="text-white text-xs">CTA URL</label>
                      <input
                        type="text"
                        className="bg-[#20211F] text-white rounded px-2 py-1 text-xs border border-[#444]"
                        value={item.cta?.url || ""}
                        onChange={(e) =>
                          handleGridItemChange(idx, {
                            ...item,
                            cta: { ...item.cta, url: e.target.value },
                          })
                        }
                      />
                      {/* Remove item button */}
                      <button
                        className="mt-2 px-2 py-1 rounded bg-[#C94B4B] text-white text-xs hover:bg-[#A83232] transition self-end"
                        onClick={() => handleRemoveGridItem(idx)}
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                );
              })()}
            {/* Add new item button */}
            <button
              className="mt-2 px-3 py-2 rounded bg-[#C6CB8D] text-[#232323] text-xs font-semibold hover:bg-[#D6E08D] transition w-full"
              onClick={handleAddGridItem}
            >
              Add New Item
            </button>
          </div>
        </>
      )}
      {/* Content controls for tags */}
      {selectedComponent.type !== "content-grid" &&
        Array.isArray(selectedComponent.content) &&
        selectedComponent.content.map((el, idx) => {
          const label = tagLabelMap[el.tag] || el.tag;
          const panelKey = `${el.tag}-${idx}`;
          return (
            <div
              key={panelKey}
              className="mb-2 border-b border-[#232323] last:border-b-0"
            >
              <button
                className="w-full flex items-center justify-between py-3 px-2 text-left font-semibold text-sm hover:bg-[#232323] rounded transition"
                onClick={() =>
                  setOpenPanels((prev) =>
                    prev.includes(panelKey)
                      ? prev.filter((k) => k !== panelKey)
                      : [...prev, panelKey]
                  )
                }
              >
                <span>{label}</span>
                {openPanels.includes(panelKey) ? (
                  <DownOutlined className="text-xs" />
                ) : (
                  <RightOutlined className="text-xs" />
                )}
              </button>
              {openPanels.includes(panelKey) && (
                <div className="pl-2 pb-3 text-xs text-[#B5B5B5]">
                  {/* Controls for each tag */}
                  {el.tag === "img" && (
                    <div className="flex flex-col gap-2">
                      <label className="text-white text-xs">
                        URL de la imagen de fondo
                      </label>
                      <input
                        type="text"
                        className="bg-[#232323] text-white rounded px-2 py-1 text-xs border border-[#444]"
                        value={el.content}
                        onChange={(e) =>
                          handleContentChange(idx, e.target.value)
                        }
                      />
                    </div>
                  )}
                  {(el.tag === "h1" || el.tag === "h2" || el.tag === "p") && (
                    <div className="flex flex-col gap-2">
                      <label className="text-white text-xs">Texto</label>
                      <input
                        type="text"
                        className="bg-[#232323] text-white rounded px-2 py-1 text-xs border border-[#444]"
                        value={el.content}
                        onChange={(e) =>
                          handleContentChange(idx, e.target.value)
                        }
                      />
                    </div>
                  )}
                  {el.tag === "button" && (
                    <div className="flex flex-col gap-2">
                      <label className="text-white text-xs">
                        Texto y URL (ej: "Comprar ahora|https://url.com")
                      </label>
                      <input
                        type="text"
                        className="bg-[#232323] text-white rounded px-2 py-1 text-xs border border-[#444]"
                        value={el.content}
                        onChange={(e) =>
                          handleContentChange(idx, e.target.value)
                        }
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
    </aside>
  );
};

export default ContentEditorRightmenu;
