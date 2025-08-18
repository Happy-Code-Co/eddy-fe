import { Modal, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  setAddSectionModalVisible,
  setSelectedPage,
  setPages,
} from "../../../redux/slices/StoreSlice";
import React from "react";

const availableSections = [
  { key: "hero", label: "Hero" },
  { key: "content-grid", label: "Content Grid" },
  { key: "product-list", label: "Product List" },
];

const AddSectionModal = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.store.addSectionModalVisible);
  const selectedPage = useSelector((state) => state.store.selectedPage);
  const pages = useSelector((state) => state.store.pages);

  const handleAddSection = (sectionKey) => {
    if (!selectedPage) return;
    let updatedPage = { ...selectedPage };
    if (!updatedPage.page_component) updatedPage.page_component = [];
    if (sectionKey === "hero") {
      updatedPage.page_component = [
        ...updatedPage.page_component,
        {
          type: "hero",
          content: [
            {
              tag: "img",
              content: "https://placehold.co/600x200",
              style: "width:100%;max-width:400px;",
            },
            { tag: "h1", content: "Hero Title", style: "color:#222;" },
            { tag: "h2", content: "Hero Subtitle", style: "" },
            { tag: "p", content: "Hero description...", style: "" },
            { tag: "button", content: "Click Me", style: "" },
          ],
          component_order: updatedPage.page_component.length,
          activation_start_time: null,
          activation_end_time: null,
        },
      ];
    }
    // Update the selected page in the pages array
    const updatedPages = pages.map((p) =>
      p.id === updatedPage.id ? updatedPage : p
    );
    dispatch(setPages(updatedPages));
    dispatch(setSelectedPage(updatedPage));
    dispatch(setAddSectionModalVisible(false));
  };

  return (
    <Modal
      title="Add Section"
      open={open}
      onCancel={() => dispatch(setAddSectionModalVisible(false))}
      footer={null}
    >
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {availableSections.map((section) => (
          <li key={section.key} style={{ marginBottom: 12 }}>
            <Button
              block
              onClick={() => handleAddSection(section.key)}
              style={{ textAlign: "left" }}
            >
              {section.label}
            </Button>
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default AddSectionModal;
