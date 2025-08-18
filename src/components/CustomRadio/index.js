import "./CustomRadio.scss";
import { Radio } from "antd";

const CustomRadio = ({ options, onchange, value }) => {
  return (
    <Radio.Group
      className="flex flex-row gap-4"
      onChange={onchange}
      value={value}
      options={options}
    />
  );
};

export default CustomRadio;
