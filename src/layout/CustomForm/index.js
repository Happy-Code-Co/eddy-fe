import { Form } from "antd";

const CustomForm = (props) => {
  const { children, ...restProps } = props;
  return (
    <Form
      {...restProps}
      requiredMark="optional"
      validateTrigger={["onChange", "onBlur"]}
    >
      {children}
    </Form>
  );
};

export default CustomForm;
