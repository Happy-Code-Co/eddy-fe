// Removed Ant Design and classnames imports, will use only Tailwind and SVGs
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedPage as setSelectedPageRedux,
  setPages as setPagesRedux,
  setAddSectionModalVisible,
  setSelectedComponent,
  setSelectedGridItem,
} from "../../../../redux/slices/StoreSlice";
import { useState } from "react";
import axios from "../../../../axiosInterceptor";
import { HomeFilled } from "@ant-design/icons";

const ContentEditorSidemenu = () => {
  const dispatch = useDispatch();
  const [addingPage, setAddingPage] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const selectedGridItem = useSelector((state) => state.store.selectedGridItem);

  const store_id = useSelector((state) => state.store.id);
  const pages = useSelector((state) => state.store.pages || []);
  const selectedPage = useSelector((state) => state.store.selectedPage || null);

  const handleAddPage = async () => {
    if (!newPageTitle.trim() || !store_id) return;
    setCreating(true);
    try {
      const res = await axios.post(
        "/content/page",
        {
          title: newPageTitle.trim(),
          store_id,
        },
        { withCredentials: true }
      );
      if (res.data) {
        setAddingPage(false);
        setNewPageTitle("");
        // Update Redux state with new page
        dispatch(setPagesRedux([...pages, res.data]));
        dispatch(setSelectedPageRedux(res.data));
      }
    } catch (err) {
      // Optionally handle error
    } finally {
      setCreating(false);
    }
  };
  // Use actual components from selectedPage
  const components =
    selectedPage && Array.isArray(selectedPage.components)
      ? selectedPage.components
      : [];
  const selectedComponent = useSelector(
    (state) => state.store.selectedComponent
  );

  // Delete section/component handler
  const handleDeleteSection = (sectionId) => {
    if (!selectedPage || !Array.isArray(selectedPage.components)) return;
    const updatedComponents = selectedPage.components.filter(
      (comp) => comp.id !== sectionId
    );
    const updatedPage = { ...selectedPage, components: updatedComponents };
    dispatch(setSelectedPageRedux(updatedPage));
    // If the deleted component was selected, clear selection
    if (selectedComponent && selectedComponent.id === sectionId) {
      dispatch(setSelectedComponent(null));
    }
  };

  // Collapsible state: only one expanded at a time
  const [expandedSectionId, setExpandedSectionId] = useState(null);

  return (
    <aside className="h-full w-full flex flex-col px-4 py-6 bg-[#20211F] text-white text-sm select-none">
      {/* Pagina Web Section */}
      <div>
        <div className="mb-2 text-xs font-bold uppercase text-[#B5B5B5] tracking-wide">
          Pagina Web
        </div>
        <ul className="mb-6">
          {pages.length === 0 ? (
            <li className="rounded px-3 py-2 text-[#B5B5B5]">Inicio</li>
          ) : (
            pages.map((page) => (
              <li
                key={page.id}
                className={
                  (selectedPage && selectedPage.id === page.id
                    ? "bg-[#232323] text-white"
                    : "hover:bg-[#232323] text-[#B5B5B5]") +
                  " flex items-center rounded px-3 py-2 mb-1 cursor-pointer transition"
                }
              >
                <span
                  className="flex-1 truncate"
                  onClick={() => dispatch(setSelectedPageRedux(page))}
                >
                  {page.title || "Inicio"}
                </span>
                {page.is_homepage && (
                  <span className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded bg-[#232323]">
                    <HomeFilled />
                  </span>
                )}
              </li>
            ))
          )}
          {addingPage && (
            <li className="flex items-center rounded px-3 py-2 mb-1 bg-[#232323]">
              <input
                autoFocus
                type="text"
                value={newPageTitle}
                placeholder="New Page"
                className="flex-1 bg-transparent outline-none text-white placeholder-[#B5B5B5] px-2 py-1"
                onChange={(e) => setNewPageTitle(e.target.value)}
                onKeyDown={async (e) => {
                  if (e.key === "Enter" && newPageTitle.trim()) {
                    await handleAddPage();
                  } else if (e.key === "Escape") {
                    setAddingPage(false);
                    setNewPageTitle("");
                  }
                }}
              />
              <button
                className="ml-2 p-1 rounded bg-[#C6CB8D] text-[#232323] hover:bg-[#D6E08D] transition"
                disabled={creating || !newPageTitle.trim()}
                onClick={handleAddPage}
              >
                {/* Arrow right icon */}
                <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
                  <path
                    d="M7 5l5 5-5 5"
                    stroke="#232323"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </li>
          )}
        </ul>
        {/* Add Page Button */}
        <button
          className="w-full flex items-center gap-2 text-[#C6CB8D] hover:text-[#D6E08D] text-xs font-medium px-2 py-1 rounded transition mb-4"
          style={{ visibility: addingPage ? "hidden" : "visible" }}
          onClick={() => setAddingPage(true)}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
            <circle
              cx="10"
              cy="10"
              r="8.5"
              stroke="#C6CB8D"
              strokeWidth="1.5"
            />
            <path
              d="M10 7v6M7 10h6"
              stroke="#C6CB8D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Agregar página
        </button>
      </div>
      <div className="h-px w-full bg-[#232323] mb-4" />
      {/* Sections Section */}
      <div className="flex-1 flex flex-col">
        <div className="mb-2 text-xs font-bold uppercase text-[#B5B5B5] tracking-wide">
          Sections
        </div>
        <ul>
          {components.map((section, idx) => {
            const hasSubmenu =
              section.type === "content-grid" &&
              Array.isArray(section.content) &&
              section.content.length > 0;
            const isExpanded = expandedSectionId === section.id;
            return (
              <li key={section.id || idx} className="mb-1">
                <div
                  className={
                    (selectedComponent === section
                      ? "bg-[#232323] text-white"
                      : "hover:bg-[#232323] text-[#B5B5B5]") +
                    " flex items-center rounded px-3 py-2 cursor-pointer transition group"
                  }
                  onClick={() => {
                    if (hasSubmenu) {
                      setExpandedSectionId(isExpanded ? null : section.id);
                    }
                    dispatch(setSelectedComponent(section));
                    dispatch(setSelectedGridItem(null));
                  }}
                >
                  <span className="flex-1 truncate">
                    {section.type
                      ? section.type.charAt(0).toUpperCase() +
                        section.type.slice(1) +
                        " Section"
                      : `Section ${idx + 1}`}
                  </span>
                  {/* Expand/collapse arrow only for sections with submenu */}
                  {hasSubmenu && (
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 20 20"
                      className={
                        "ml-2 transition-transform duration-200" +
                        (isExpanded ? " rotate-90" : "")
                      }
                    >
                      <path
                        d="M8 6l4 4-4 4"
                        stroke="#C6CB8D"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {/* Delete button (visible on hover) */}
                  <button
                    className="ml-2 p-1 rounded hover:bg-[#C94B4B] hover:text-white text-[#C94B4B] transition opacity-0 group-hover:opacity-100"
                    title="Eliminar sección"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSection(section.id);
                    }}
                  >
                    {/* Trash icon SVG */}
                    <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
                      <path
                        d="M6 8v5a2 2 0 002 2h4a2 2 0 002-2V8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M8 8v5M12 8v5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M4 6h12M9 3h2a1 1 0 011 1v1H8V4a1 1 0 011-1z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                {/* If content-grid, show grid items as submenus only if expanded */}
                {hasSubmenu && isExpanded && (
                  <ul className="ml-6 mt-1">
                    {section.content.map((item, itemIdx) => {
                      const isSelectedGridItem =
                        selectedComponent === section &&
                        selectedGridItem?.sectionId === section.id &&
                        selectedGridItem?.itemIndex === itemIdx;
                      return (
                        <li
                          key={itemIdx}
                          className={
                            (isSelectedGridItem
                              ? "bg-[#232323] text-white"
                              : "hover:bg-[#232323] text-[#B5B5B5]") +
                            " flex items-center rounded px-3 py-1 cursor-pointer transition"
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(setSelectedComponent(section));
                            dispatch(
                              setSelectedGridItem({
                                sectionId: section.id,
                                itemIndex: itemIdx,
                              })
                            );
                          }}
                        >
                          <span className="flex-1 truncate">
                            {item.title || `Item ${itemIdx + 1}`}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
        {/* Agregar Sección */}
        <button
          className="flex items-center gap-2 text-[#C6CB8D] hover:text-[#D6E08D] text-sm font-medium px-3 py-2 rounded transition"
          onClick={() => dispatch(setAddSectionModalVisible(true))}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
            <circle
              cx="10"
              cy="10"
              r="8.5"
              stroke="#C6CB8D"
              strokeWidth="1.5"
            />
            <path
              d="M10 7v6M7 10h6"
              stroke="#C6CB8D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Agregar Sección
        </button>
      </div>
    </aside>
  );
};

export default ContentEditorSidemenu;
