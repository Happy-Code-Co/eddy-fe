import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

import useAuth from "../../hooks/useAuth";
import { DASHBOARD } from "../../routes/list";

import AuthPages from "../../layout/AuthPages/AuthPages";
import CustomForm from "../../layout/CustomForm";

const SigninPage = () => {
  // Hooks
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (await isAuthenticated()) {
        navigate(DASHBOARD);
      }
    })();
  }, [isAuthenticated, navigate]);

  const loginAction = async (values) => {
    try {
      const result = await login(values);
      if (result.success) {
        navigate(DASHBOARD);
      } else {
        // Optionally handle error, e.g., show message
        console.log(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthPages
      title={"Hey there, welcome back!"}
      description={"Access your dashboard and manage your store."}
    >
      <CustomForm
        className="sign-form"
        name="sign-form"
        layout="vertical"
        onFinish={loginAction}
        onFinishFailed={() => {}}
        autoComplete="off"
      >
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
            Continue
          </Button>
        </Form.Item>
      </CustomForm>
    </AuthPages>
  );
};

export default SigninPage;
