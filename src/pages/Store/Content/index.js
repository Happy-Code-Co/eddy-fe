import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../../axiosInterceptor";
import {
  setPages as setPagesRedux,
  setSelectedPage as setSelectedPageRedux,
  setDeleteModalVisible,
  setDeletingPageId,
} from "../../../redux/slices/StoreSlice";

import ContentEditorTopbar from "./layout/ContentEditorTopbar";
import ContentEditorSidemenu from "./layout/ContentEditorSidemenu";
import ContentEditorBody from "./layout/ContentEditorBody";
import ContentEditorRightmenu from "./layout/ContentEditorRightmenu";
import DeletePageModal from "./layout/modals/DeletePageModal";
import AddSectionModal from "./layout/modals/AddSectionModal";

const ContentEditor = ({ onClose }) => {
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.store.pages || []);
  const store_id = useSelector((state) => state.store.id);
  const selectedPage = useSelector((state) => state.store.selectedPage || null);
  const deleteModalVisible = useSelector(
    (state) => state.store.deleteModalVisible
  );
  const deletingPageId = useSelector((state) => state.store.deletingPageId);

  useEffect(() => {
    async function fetchPages() {
      if (!store_id) return;
      try {
        const res = await axios.get(`/content/pages/${store_id}`, {
          withCredentials: true,
        });
        dispatch(setPagesRedux(res.data));
      } catch (err) {
        // Optionally handle error
      }
    }
    fetchPages();
  }, [store_id, dispatch]);

  // Select Home page by default when pages are loaded
  useEffect(() => {
    if (pages.length > 0 && !selectedPage) {
      const homePage = pages.find((p) => p.is_homepage) || pages[0];
      if (homePage) {
        dispatch(setSelectedPageRedux(homePage));
      }
    }
  }, [pages, selectedPage, dispatch]);

  // All modal and section logic should be handled in Redux or in the respective components for full compliance.

  return (
    <div className="w-full h-screen flex flex-col bg-[#181A1B]">
      <ContentEditorTopbar onClose={onClose} />
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-[260px] bg-[#20211F] border-r border-[#232323] flex flex-col">
          <ContentEditorSidemenu />
        </div>
        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0 h-full bg-[#1A1A1A] p-8 overflow-auto">
          <ContentEditorBody />
        </div>
        {/* Right menu */}
        <div className="w-[320px] bg-[#20211F] border-l border-[#232323] flex flex-col">
          <ContentEditorRightmenu />
        </div>
      </div>
      <DeletePageModal
        open={deleteModalVisible}
        deletingPageId={deletingPageId}
        onClose={() => {
          dispatch(setDeleteModalVisible(false));
          dispatch(setDeletingPageId(null));
        }}
      />
      <AddSectionModal />
    </div>
  );
};

export default ContentEditor;
