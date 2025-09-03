import { Modal, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  setAddSectionModalVisible,
  setSelectedPage,
} from "../../../../../redux/slices/StoreSlice";

const availableSections = [
  { key: "hero", label: "Hero" },
  { key: "content-grid", label: "Content Grid" },
  { key: "product-list", label: "Product List" },
];

const AddSectionModal = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.store.addSectionModalVisible);
  const selectedPage = useSelector((state) => state.store.selectedPage);

  const handleAddSection = (sectionKey) => {
    if (!selectedPage) return;
    let updatedPage = { ...selectedPage };
    if (!updatedPage.components) updatedPage.components = [];
    // Count how many sections of this type already exist
    const sameSectionCounter =
      updatedPage.components.filter((c) => c.type === sectionKey).length + 1;
    if (sectionKey === "hero") {
      updatedPage.components = [
        ...updatedPage.components,
        {
          id: `${sectionKey}-${sameSectionCounter}-${selectedPage.id}`,
          type: "hero",
          content: [
            {
              tag: "img",
              content: "https://placehold.co/600x200",
            },
            { tag: "h1", content: "Hero Title", style: "color:#222;" },
            { tag: "h2", content: "Hero Subtitle", style: "" },
            { tag: "p", content: "Hero description...", style: "" },
            { tag: "button", content: "Click Me", style: "" },
          ],
          component_order: updatedPage.components.length,
          activation_start_time: null,
          activation_end_time: null,
        },
      ];
    } else if (sectionKey === "content-grid") {
      updatedPage.components = [
        ...updatedPage.components,
        {
          id: `${sectionKey}-${sameSectionCounter}-${selectedPage.id}`,
          type: "content-grid",
          content: [
            {
              img: "https://placehold.co/300x200",
              title: "Grid Item 1",
              subtitle: "Subtitle 1",
              description: "Description for item 1.",
              cta: { text: "Learn More", url: "#" },
            },
            {
              img: "https://placehold.co/300x200",
              title: "Grid Item 2",
              subtitle: "Subtitle 2",
              description: "Description for item 2.",
              cta: { text: "Learn More", url: "#" },
            },
            {
              img: "https://placehold.co/300x200",
              title: "Grid Item 3",
              subtitle: "Subtitle 3",
              description: "Description for item 3.",
              cta: { text: "Learn More", url: "#" },
            },
          ],
          settings: {
            grid: {
              columns: 3,
              rows: 1,
            },
          },
          component_order: updatedPage.components.length,
          activation_start_time: null,
          activation_end_time: null,
        },
      ];
    }

    //dispatch(setPages(updatedPages));
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
