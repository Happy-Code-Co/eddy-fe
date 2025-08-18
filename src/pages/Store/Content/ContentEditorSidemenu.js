import { Button } from "antd";
import cn from "classnames";
import { CloseOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedPage as setSelectedPageRedux,
  setPages as setPagesRedux,
  addPage as addPageRedux,
} from "../../../redux/slices/StoreSlice";
import React, { useState } from "react";

const ContentEditorSidemenu = () => {
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.store.pages || []);
  const selectedPage = useSelector((state) => state.store.selectedPage || null);
  const [addingPage, setAddingPage] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const [deletingPageId, setDeletingPageId] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  // mockSections can be replaced with real data
  const mockSections = [
    { id: 1, name: "Hero" },
    { id: 2, name: "Features" },
    { id: 3, name: "Footer" },
  ];

  // Handlers would be implemented here or imported from redux thunks

  return (
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
                selected: selectedPage && selectedPage.id === page.id,
              })}
            >
              <span
                style={{ flex: 1, cursor: "pointer" }}
                onClick={() => dispatch(setSelectedPageRedux(page))}
              >
                {page.title}
              </span>
              {!page.is_homepage && (
                <Button
                  type="text"
                  size="small"
                  className="delete-page-button"
                  icon={<CloseOutlined />}
                  // onClick logic for delete
                />
              )}
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
                // onKeyDown logic for create/cancel
              />
              <Button
                type="text"
                loading={creating}
                className="create-page-button"
                // onClick logic for create
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
              // onClick logic for add section
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
  );
};

export default ContentEditorSidemenu;
