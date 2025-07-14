import React, { useState } from "react";
import { Form, Input } from "antd";
import StepHeader from "../../../../../components/Steps/StepHeader";
import CustomForm from "../../../../../layout/CustomForm";
import CustomRadio from "../../../../../components/CustomRadio";

const StepThree = () => {
  const [keyType, setKeyType] = useState("public_key");

  const onChange = (e) => {
    setKeyType(e.target.value);
    console.log("Selected Key Type:", e.target.value);
  };

  const keyTypes = [
    { label: "Llave publica", value: "public_key" },
    { label: "Llave privada", value: "private_key" },
  ];

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

        <CustomForm layout="vertical">
          <Form.Item label="Llave publica" required>
            <Input size="large" placeholder="pub_prod_ABC123..." />
          </Form.Item>
          <Form.Item label="Llave privada" required>
            <Input size="large" placeholder="pub_prod_ABC123..." />
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
};

export default StepThree;
