import { Button, Tag } from "antd";
import {
  ArrowLeftOutlined,
  DesktopOutlined,
  TabletOutlined,
  MobileOutlined,
  UndoOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import React from "react";

const ContentEditorTopbar = ({ onClose }) => {
  const dispatch = useDispatch();
  // You can use Redux state here if needed
  return (
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
  );
};

export default ContentEditorTopbar;
