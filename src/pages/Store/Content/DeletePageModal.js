import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setPages as setPagesRedux,
  setSelectedPage as setSelectedPageRedux,
} from "../../../redux/slices/StoreSlice";
import React from "react";
import axios from "../../../axiosInterceptor";

const DeletePageModal = ({ open, deletingPageId, onClose }) => {
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.store.pages || []);
  const selectedPage = useSelector((state) => state.store.selectedPage || null);

  const handleDeletePage = async () => {
    try {
      await axios.delete(`/content/page/${deletingPageId}`, {
        withCredentials: true,
      });
      dispatch(setPagesRedux(pages.filter((p) => p.id !== deletingPageId)));
      if (selectedPage && selectedPage.id === deletingPageId) {
        dispatch(setSelectedPageRedux(null));
      }
    } catch (err) {
      // Optionally show error
    }
    onClose();
  };

  return (
    <Modal
      title="Delete Page"
      open={open}
      onOk={handleDeletePage}
      onCancel={onClose}
      okText="Delete Page"
      okButtonProps={{ danger: true }}
    >
      Are you sure you want to delete this page?
    </Modal>
  );
};

export default DeletePageModal;
