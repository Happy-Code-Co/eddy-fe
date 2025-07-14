import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

import useAuth from "../../hooks/useAuth";
import { STORE_ONBOARDING, DASHBOARD } from "../../routes/list";

import AuthPages from "../../layout/AuthPages/AuthPages";
import CustomForm from "../../layout/CustomForm";

const SignUpPage = () => {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (await isAuthenticated()) {
        navigate(DASHBOARD);
      }
    })();
  }, [isAuthenticated, navigate]);

  const createAccount = async (values) => {
    try {
      const result = await register(values);
      if (result.success) {
        navigate(STORE_ONBOARDING);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AuthPages
      title={"Create an account"}
      description={"Start now for free. No credit card required."}
    >
      <CustomForm
        className="sign-form"
        name="sign-form"
        layout="vertical"
        onFinish={createAccount}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="First Name"
          name="first_name"
          tooltip="This is a required field"
          rules={[{ required: true, message: "Please input your firstname" }]}
        >
          <Input placeholder="Enter your first name" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="last_name"
          tooltip="This is a required field"
          rules={[{ required: true, message: "Please input your lastname" }]}
        >
          <Input placeholder="Enter your last name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          tooltip="This is a required field"
          rules={[{ required: true, message: "Please input your email" }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          tooltip="This is a required field"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input.Password placeholder="Enter a password" />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" className="submit-button">
            Create
          </Button>
        </Form.Item>
      </CustomForm>
    </AuthPages>
  );
};

export default SignUpPage;
