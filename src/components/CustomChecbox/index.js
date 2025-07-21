import "./CustomCheckbox.scss";
import { Checkbox } from "antd";

const CustomCheckbox = ({ options, onchange, value }) => {
  return (
    <Checkbox.Group
      options={options}
      className="custom-checkbox"
      onChange={onchange}
      value={value}
    />
  );
};

export default CustomCheckbox;
