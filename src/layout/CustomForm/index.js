import { Form } from "antd";

const CustomForm = (props) => {
  const { children } = props;
  return (
    <Form {...props} requiredMark="optional">
      {children}
    </Form>
  );
};

export default CustomForm;
