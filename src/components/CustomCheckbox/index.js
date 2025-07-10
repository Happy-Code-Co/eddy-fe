import "./CustomCheckbox.scss";
import { Checkbox } from "antd";

const CustomCheckbox = ({ onchange, children }) => {
  return <Checkbox onChange={onchange}>{children}</Checkbox>;
};

export default CustomCheckbox;
