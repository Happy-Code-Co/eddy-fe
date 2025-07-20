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
        // Manejar errores específicos de campos si existen
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
      console.error("Error de inicio de sesión:", error);
      messageApi.open({
        type: "error",
        content: "Ocurrió un error inesperado. Por favor intenta más tarde.",
        duration: 4,
      });
    }
  };

  return (
    <AuthPages
      title={"¡Hola de nuevo!"}
      description={"Accede a tu panel y gestiona tu tienda."}
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
          label="Correo electrónico"
          name="email"
          tooltip="Este campo es obligatorio"
          rules={[
            { required: true, message: "Este campo es obligatorio." },
            {
              type: "email",
              message: "Por favor ingresa un correo electrónico válido.",
            },
          ]}
        >
          <Input placeholder="Ingresa tu correo electrónico" />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          tooltip="Este campo es obligatorio"
          rules={[
            { required: true, message: "Este campo es obligatorio." },
            {
              min: 6,
              message: "La contraseña debe tener al menos 6 caracteres.",
            },
          ]}
        >
          <Input.Password placeholder="Ingresa tu contraseña" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="submit-button"
            size="large"
          >
            Continuar
          </Button>
        </Form.Item>
      </CustomForm>
    </AuthPages>
  );
};

export default SigninPage;
