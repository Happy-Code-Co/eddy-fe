import { Button, Form, Input } from "antd";
import axiosRequest, { ENDPOINTS } from "../../axiosInterceptor";
import { LOCAL_STORAGE } from "../../consts";

import AuthPages from "../../layout/AuthPages/AuthPages";

const SignUpPage = () => {
  const createAccount = async (values) => {
    try {
      const response = await axiosRequest.post(ENDPOINTS.SIGNUP, {
        ...values,
      });

      if (response.status === 201) {
        const { data, token } = response.data;
        localStorage.setItem(
          LOCAL_STORAGE.TOKEN,
          JSON.stringify({
            userId: data.id,
            token,
          })
        );
        //navigate(`/${data.short_id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    createAccount(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AuthPages
      title={"Create an account"}
      description={"Start now for free. No credit card required."}
    >
      <Form
        className="sign-form"
        name="sign-form"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="First Name"
          name="firstname"
          rules={[{ required: true, message: "Please input your firstname" }]}
        >
          <Input placeholder="Enter your first name" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastname"
          rules={[{ required: true, message: "Please input your lastname" }]}
        >
          <Input placeholder="Enter your last name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email" }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input.Password placeholder="Enter a password" />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" className="submit-button">
            Create
          </Button>
        </Form.Item>
      </Form>
    </AuthPages>
  );
};

export default SignUpPage;
