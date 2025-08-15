import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../../axiosInterceptor";
import {
  setPages as setPagesRedux,
  setSelectedPage as setSelectedPageRedux,
  setDeleteModalVisible,
  setDeletingPageId,
} from "../../../redux/slices/StoreSlice";
import ContentEditorTopbar from "./ContentEditorTopbar";
import ContentEditorSidemenu from "./ContentEditorSidemenu";
import ContentEditorBody from "./ContentEditorBody";
import ContentEditorRightmenu from "./ContentEditorRightmenu";
import DeletePageModal from "./DeletePageModal";
import AddSectionModal from "./AddSectionModal";
import "./ContentEditor.scss";

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
    <div className="content-editor-fullscreen">
      <ContentEditorTopbar onClose={onClose} />
      <div className="content-editor-main">
        <ContentEditorSidemenu />
        <ContentEditorBody />
        <ContentEditorRightmenu />
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
