import "./CustomCheckbox.scss";
import { Checkbox } from "antd";

const CustomCheckbox = ({ options, onchange, value }) => {
  return (
    <Checkbox.Group
      options={options}
      className="flex flex-col gap-2"
      onChange={onchange}
      value={value}
    />
  );
};

export default CustomCheckbox;
