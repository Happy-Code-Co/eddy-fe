import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import useAuth from "../../hooks/useAuth";
import { ONBOARDING, DASHBOARD } from "../../routes/list";
import AuthPages from "../../layout/AuthPages/AuthPages";
import CustomForm from "../../layout/CustomForm";

const SignUpPage = () => {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (await isAuthenticated()) {
        navigate(DASHBOARD);
      }
    })();
  }, [isAuthenticated, navigate]);

  const createAccount = async (values) => {
    setLoading(true);
    try {
      const result = await register(values);

      if (result.success) {
        messageApi.open({
          type: "success",
          content:
            "¡Registro exitoso! Redirigiéndote para completar tu perfil...",
          duration: 2,
        });
        setTimeout(() => navigate(ONBOARDING), 2000);
      } else {
        if (result.error === "Email already in use") {
          form.setFields([
            {
              name: "email",
              errors: ["Este correo electrónico ya está registrado"],
            },
          ]);

          messageApi.open({
            type: "error",
            content:
              "Este correo ya está registrado. Por favor usa otro o inicia sesión.",
            duration: 4,
          });
        } else {
          messageApi.open({
            type: "error",
            content: result.error || "Ocurrió un error al registrar tu cuenta",
            duration: 4,
          });
        }
      }
    } catch (error) {
      console.error("Error en registro:", error);
      messageApi.open({
        type: "error",
        content: "Ocurrió un error inesperado. Por favor intenta más tarde.",
        duration: 4,
      });
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = ({ errorFields }) => {
    form.scrollToField(errorFields[0].name);
  };

  return (
    <AuthPages
      title={"Crea una cuenta"}
      description={"Empieza ahora gratis. No necesitas tarjeta de crédito."}
    >
      {contextHolder}
      <CustomForm
        form={form}
        className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
        name="sign-form"
        layout="vertical"
        onFinish={createAccount}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre"
          name="first_name"
          tooltip="Este campo es obligatorio"
          rules={[{ required: true, message: "Por favor, ingresa tu nombre" }]}
        >
          <Input placeholder="Escribe tu nombre" />
        </Form.Item>

        <Form.Item
          label="Apellido"
          name="last_name"
          tooltip="Este campo es obligatorio"
          rules={[
            { required: true, message: "Por favor, ingresa tu apellido" },
          ]}
        >
          <Input placeholder="Escribe tu apellido" />
        </Form.Item>

        <Form.Item
          label="Correo electrónico"
          name="email"
          tooltip="Este campo es obligatorio"
          rules={[
            {
              required: true,
              message: "Por favor, ingresa tu correo electrónico",
            },
            { type: "email", message: "Por favor ingresa un correo válido" },
          ]}
        >
          <Input placeholder="Escribe tu correo electrónico" />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          tooltip="Este campo es obligatorio"
          rules={[
            { required: true, message: "Por favor, ingresa una contraseña" },
            {
              min: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          ]}
        >
          <Input.Password placeholder="Escribe una contraseña" />
        </Form.Item>

        <Form.Item label={null}>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            loading={loading}
            size="large"
          >
            Crear cuenta
          </Button>
        </Form.Item>
      </CustomForm>
    </AuthPages>
  );
};

export default SignUpPage;
