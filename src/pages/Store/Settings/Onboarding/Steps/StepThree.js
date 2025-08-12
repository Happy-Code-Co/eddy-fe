import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Form, Input } from "antd";
import StepHeader from "../../../../../components/Steps/StepHeader";
import CustomForm from "../../../../../layout/CustomForm";
import CustomRadio from "../../../../../components/CustomRadio";

const StepThree = forwardRef(({ formData, updateFormData }, ref) => {
  const [form] = Form.useForm();
  const [keyType, setKeyType] = useState("public_key");

  useImperativeHandle(ref, () => ({
    validateFields: () => form.validateFields(),
  }));

  const onChange = (e) => {
    setKeyType(e.target.value);
    updateFormData({ keyType: e.target.value });
  };

  const onValuesChange = (changedValues, allValues) => {
    updateFormData({ ...formData, ...allValues });
  };

  const keyTypes = [
    { label: "Llave publica", value: "public_key" },
    { label: "Llave privada", value: "private_key" },
  ];

  useEffect(() => {
    updateFormData({ keyType });
  }, []);

  return (
    <div className="step">
      <StepHeader
        stepLabel={"Paso 3 de 5"}
        title={"Métodos de Pago — Integración con Wompi"}
      ></StepHeader>
      <div className="step-content">
        <div className="instructions">
          <h6>Conecta tu cuenta de Wompi para recibir pagos</h6>
          <p>
            Para poder procesar pagos con tarjeta en tu sitio, necesitamos que
            ingreses las credenciales de tu cuenta Wompi.
          </p>
        </div>

        <CustomForm
          form={form}
          layout="vertical"
          initialValues={formData}
          onValuesChange={onValuesChange}
        >
          <Form.Item
            label="Llave publica"
            name={"publicKey"}
            rules={[
              {
                required: true,
                message: "Por favor ingresa tu llave publica de Wompi",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="pub_prod_ABC123..."
              value={formData.publicKey}
            />
          </Form.Item>
          <Form.Item
            label="Llave privada"
            name={"privateKey"}
            rules={[
              {
                required: true,
                message: "Por favor ingresa tu llave privada de Wompi",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="pub_prod_ABC123..."
              value={formData.privateKey}
            />
          </Form.Item>

          <Form.Item label="Tipo de llave" required>
            <CustomRadio
              options={keyTypes}
              onchange={onChange}
              value={keyType}
            />
          </Form.Item>
        </CustomForm>
      </div>
    </div>
  );
});

export default StepThree;
