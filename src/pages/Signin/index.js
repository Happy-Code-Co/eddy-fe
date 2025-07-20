import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import useAuth from "../../hooks/useAuth";
import { DASHBOARD } from "../../routes/list";
import AuthPages from "../../layout/AuthPages/AuthPages";
import CustomForm from "../../layout/CustomForm";

const SigninPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

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
        messageApi.open({
          type: "success",
          content: "¡Bienvenido de nuevo! Redirigiéndote a tu panel...",
          duration: 2,
        });
        setTimeout(() => navigate(DASHBOARD), 2000);
      } else {
        // Handle specific field errors if they exist
        if (result.details) {
          const fieldErrors = {};
          result.details.forEach((detail) => {
            const fieldName = detail.path[0];
            if (!fieldErrors[fieldName]) {
              fieldErrors[fieldName] = [];
            }
            fieldErrors[fieldName].push(detail.message);
          });

          form.setFields(
            Object.entries(fieldErrors).map(([name, errors]) => ({
              name,
              errors,
            }))
          );
        }

        messageApi.open({
          type: "error",
          content:
            result.error ||
            "Correo o contraseña incorrectos. Por favor verifica tus datos.",
          duration: 4,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      messageApi.open({
        type: "error",
        content: "Ocurrió un error inesperado. Por favor intenta más tarde.",
        duration: 4,
      });
    }
  };

  return (
    <AuthPages
      title={"Hey there, welcome back!"}
      description={"Access your dashboard and manage your store."}
    >
      {contextHolder}
      <CustomForm
        form={form}
        className="sign-form"
        name="sign-form"
        layout="vertical"
        onFinish={loginAction}
        onFinishFailed={({ errorFields }) => {
          form.scrollToField(errorFields[0].name);
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          tooltip="This is a required field"
          rules={[
            { required: true, message: "Este campo es obligatorio." },
            {
              type: "email",
              message: "Por favor ingresa un correo electrónico válido.",
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          tooltip="This is a required field"
          rules={[
            { required: true, message: "Este campo es obligatorio." },
            {
              min: 6,
              message: "La contraseña debe tener al menos 6 caracteres.",
            },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="submit-button"
            size="large"
          >
            Continue
          </Button>
        </Form.Item>
      </CustomForm>
    </AuthPages>
  );
};

export default SigninPage;
