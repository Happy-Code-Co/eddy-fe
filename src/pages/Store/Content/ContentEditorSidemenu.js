// Removed Ant Design and classnames imports, will use only Tailwind and SVGs
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedPage as setSelectedPageRedux,
  setPages as setPagesRedux,
  addPage as addPageRedux,
} from "../../../redux/slices/StoreSlice";
import { useState } from "react";
import axios from "../../../axiosInterceptor";

const ContentEditorSidemenu = () => {
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.store.pages || []);
  const selectedPage = useSelector((state) => state.store.selectedPage || null);
  const [addingPage, setAddingPage] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const [deletingPageId, setDeletingPageId] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const store_id = useSelector((state) => state.store.id);

  async function handleAddPage() {
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
  }
  // mockSections can be replaced with real data
  const mockSections = [
    { id: 1, name: "Promo Banner" },
    { id: 2, name: "Hero-Promo Sections", selected: true },
    { id: 3, name: "Trending Section" },
    { id: 4, name: "Collections Section" },
    { id: 5, name: "Promo Sections" },
    { id: 6, name: "Product List" },
    { id: 7, name: "CTA Banner" },
    { id: 8, name: "Footer" },
  ];

  // Handlers would be implemented here or imported from redux thunks

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
                    {/* Gear icon */}
                    <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
                      <circle
                        cx="10"
                        cy="10"
                        r="7"
                        stroke="#C6CB8D"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M10 7v3l2 1"
                        stroke="#C6CB8D"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
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
        <ul className="flex-1">
          {mockSections.map((section) => (
            <li
              key={section.id}
              className={
                (section.selected
                  ? "bg-[#232323] text-white"
                  : "hover:bg-[#232323] text-[#B5B5B5]") +
                " flex items-center rounded px-3 py-2 mb-1 cursor-pointer transition"
              }
            >
              <span className="flex-1 truncate">{section.name}</span>
              {section.selected && (
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 20 20"
                  className="ml-2"
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
            </li>
          ))}
        </ul>
        {/* Agregar Sección */}
        <button className="mt-2 flex items-center gap-2 text-[#C6CB8D] hover:text-[#D6E08D] text-sm font-medium px-3 py-2 rounded transition">
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
