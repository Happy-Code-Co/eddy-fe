import "./CustomRadio.scss";
import { Radio } from "antd";

const CustomRadio = ({ options, onchange, value }) => {
  return (
    <Radio.Group
      className="custom-radio"
      onChange={onchange}
      value={value}
      options={options}
    />
  );
};

export default CustomRadio;
