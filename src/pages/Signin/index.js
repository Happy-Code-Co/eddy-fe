import { Button, Form, Input } from "antd";
import axiosRequest, { ENDPOINTS } from "../../axiosInterceptor";
import { LOCAL_STORAGE } from "../../consts";

import logo from "../../assets/logo.svg";

import "./Signin.scss";

const SignInPage = () => {
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
    <div className="sign-in">
      <div className="main-container">
        <img src={logo} alt="Eddy Logo" />
        <div className="form-container">
          <div className="title">
            <h1>Create an account</h1>
            <p>Start now for free. No credit card required.</p>
          </div>
          <Form
            className="signin-form"
            name="signin-form"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="First Name"
              name="firstname"
              rules={[
                { required: true, message: "Please input your firstname" },
              ]}
            >
              <Input placeholder="Enter your first name" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastname"
              rules={[
                { required: true, message: "Please input your lastname" },
              ]}
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
              rules={[
                { required: true, message: "Please input your password" },
              ]}
            >
              <Input.Password placeholder="Enter a password" />
            </Form.Item>

            <Form.Item label={null}>
              <Button
                type="primary"
                htmlType="submit"
                className="submit-button"
              >
                Create
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <div className="bg-image" />
    </div>
  );
};

export default SignInPage;
