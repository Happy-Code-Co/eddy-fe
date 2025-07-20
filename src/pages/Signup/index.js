import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

import useAuth from "../../hooks/useAuth";
import { ACCOUNT_ONBOARDING, DASHBOARD } from "../../routes/list";

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
        navigate(ACCOUNT_ONBOARDING);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Falló:", errorInfo);
  };

  return (
    <AuthPages
      title={"Crea una cuenta"}
      description={"Empieza ahora gratis. No necesitas tarjeta de crédito."}
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
          ]}
        >
          <Input.Password placeholder="Escribe una contraseña" />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" className="submit-button">
            Crear cuenta
          </Button>
        </Form.Item>
      </CustomForm>
    </AuthPages>
  );
};

export default SignUpPage;
