import { Button, Tag, Modal } from "antd";
import cn from "classnames";
import {
  ArrowLeftOutlined,
  DesktopOutlined,
  TabletOutlined,
  MobileOutlined,
  UndoOutlined,
  RedoOutlined,
  ArrowRightOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "./ContentEditor.scss";
import "./ContentEditor.scss";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../../axiosInterceptor";
import {
  setPages as setPagesRedux,
  addPage as addPageRedux,
} from "../../../redux/slices/StoreSlice";

// Remove initialPages, will fetch from API
const mockSections = [
  { id: 1, name: "Hero" },
  { id: 2, name: "Features" },
  { id: 3, name: "Footer" },
];

const ContentEditor = ({ onClose }) => {
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.store.pages || []);
  const store_id = useSelector((state) => state.store.id);
  const store_name = useSelector((state) => state.store.name);
  const store_logo = useSelector((state) => state.store.logo_desktop);

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

  const [selectedPage, setSelectedPage] = useState(null);
  const [addingPage, setAddingPage] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const [deletingPageId, setDeletingPageId] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [addSectionModalVisible, setAddSectionModalVisible] = useState(false);
  const availableSections = [
    { key: "hero", label: "Hero" },
    { key: "content-grid", label: "Content Grid" },
    { key: "product-list", label: "Product List" },
  ];

  const handleAddSection = (sectionKey) => {
    // TODO: Implement actual add section logic
    setAddSectionModalVisible(false);
  };

  const handleDeletePage = async (id) => {
    try {
      await axios.delete(`/content/page/${id}`, { withCredentials: true });
      dispatch(setPagesRedux(pages.filter((p) => p.id !== id)));
      if (selectedPage === id) setSelectedPage(null);
    } catch (err) {
      // Optionally show error
    }
    setDeleteModalVisible(false);
    setDeletingPageId(null);
  };

  const handleCreatePage = async () => {
    if (!newPageTitle.trim()) return;
    setCreating(true);
    try {
      const res = await axios.post(
        "/content/page",
        { title: newPageTitle, store_id },
        { withCredentials: true }
      );
      const newPage = res.data;
      dispatch(addPageRedux(newPage));
      setAddingPage(false);
      setNewPageTitle("");
    } catch (err) {
      // Optionally show error
    }
    setCreating(false);
  };

  return (
    <div className="content-editor-fullscreen">
      <div className="content-editor-topbar">
        <div className="topbar-left">
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={onClose} />
          <Tag color="green" className="live-tag">
            <span className="live-dot" /> Live
          </Tag>
        </div>
        <div className="topbar-center">
          <Button type="text" icon={<DesktopOutlined />} />
          <Button type="text" icon={<TabletOutlined />} />
          <Button type="text" icon={<MobileOutlined />} />
        </div>
        <div className="topbar-actions">
          <Button type="text" icon={<UndoOutlined />} />
          <Button type="text" icon={<RedoOutlined />} />
          <Button type="primary">Publish</Button>
        </div>
      </div>
      <div className="content-editor-main">
        <aside className="content-editor-sidemenu">
          <div className="sidemenu-section">
            <div className="sidemenu-header">
              <span>Pages</span>
              <Button
                type="link"
                size="small"
                style={{ visibility: addingPage ? "hidden" : "visible" }}
                onClick={() => setAddingPage(true)}
              >
                Add Page
              </Button>
            </div>
            <ul className="sidemenu-list">
              {pages.map((page) => (
                <li
                  key={page.id}
                  className={cn("page-item", {
                    selected: selectedPage === page.id,
                  })}
                >
                  <span
                    style={{ flex: 1, cursor: "pointer" }}
                    onClick={() => setSelectedPage(page.id)}
                  >
                    {page.title}
                  </span>
                  <Button
                    type="text"
                    size="small"
                    className="delete-page-button"
                    icon={<CloseOutlined />}
                    onClick={() => {
                      setDeletingPageId(page.id);
                      setDeleteModalVisible(true);
                    }}
                  />
                </li>
              ))}
              {addingPage && (
                <li className="page-item create-page-input">
                  <input
                    type="link"
                    value={newPageTitle}
                    autoFocus
                    placeholder="New Page"
                    className="create-page-input-field"
                    onChange={(e) => setNewPageTitle(e.target.value)}
                    onKeyDown={async (e) => {
                      if (e.key === "Enter") {
                        await handleCreatePage();
                      } else if (e.key === "Escape") {
                        setAddingPage(false);
                        setNewPageTitle("");
                      }
                    }}
                  />
                  <Button
                    type="text"
                    loading={creating}
                    className="create-page-button"
                    onClick={handleCreatePage}
                  >
                    <ArrowRightOutlined />
                  </Button>
                </li>
              )}
            </ul>
          </div>
          {selectedPage && (
            <div className="sidemenu-section">
              <div className="sidemenu-header">
                <span>Sections</span>
                <Button
                  type="link"
                  size="small"
                  onClick={() => setAddSectionModalVisible(true)}
                >
                  Add Section
                </Button>
              </div>
              <ul className="sidemenu-list">
                {mockSections.map((section) => (
                  <li key={section.id}>{section.name}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>
        <div className="content-editor-body">
          <div className="editor-document">
            <nav className="editor-navbar">
              {store_logo && (
                <img src={store_logo} alt={store_name} style={{ height: 32 }} />
              )}

              {!store_logo && (
                <span style={{ fontWeight: 600, fontSize: 18 }}>
                  {store_name}
                </span>
              )}
            </nav>
            <div className="editor-content">
              <div className="editor-empty">
                <Button
                  type="dashed"
                  size="large"
                  className="add-section-button"
                  icon={<span style={{ fontWeight: 600 }}>+</span>}
                  onClick={() => setAddSectionModalVisible(true)}
                >
                  Add Section
                </Button>
              </div>
            </div>
            <Modal
              title="Add Section"
              open={addSectionModalVisible}
              onCancel={() => setAddSectionModalVisible(false)}
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
          </div>
        </div>
        <aside className="content-editor-rightmenu">
          <div className="rightmenu-section">
            <span className="rightmenu-title">Section Properties</span>
            <div className="rightmenu-collapsible">
              <details>
                <summary>Section Style</summary>
                {/* Inputs for Section Style will go here */}
              </details>
              <details>
                <summary>Heading Text</summary>
                {/* Inputs for Heading Text will go here */}
              </details>
              <details>
                <summary>Body Text</summary>
                {/* Inputs for Body Text will go here */}
              </details>
              <details>
                <summary>Button</summary>
                {/* Inputs for Button will go here */}
              </details>
              <details>
                <summary>Image</summary>
                {/* Inputs for Image will go here */}
              </details>
              <details>
                <summary>Background Color</summary>
                {/* Inputs for Background Color will go here */}
              </details>
            </div>
          </div>
        </aside>
      </div>
      <Modal
        title="Delete Page"
        open={deleteModalVisible}
        onOk={() => handleDeletePage(deletingPageId)}
        onCancel={() => {
          setDeleteModalVisible(false);
          setDeletingPageId(null);
        }}
        okText="Delete Page"
        okButtonProps={{ danger: true }}
      >
        Are you sure you want to delete this page?
      </Modal>
    </div>
  );
};

export default ContentEditor;
