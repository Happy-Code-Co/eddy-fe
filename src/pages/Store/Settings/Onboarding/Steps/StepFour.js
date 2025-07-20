import { useState } from "react";
import { Form } from "antd";
import StepHeader from "../../../../../components/Steps/StepHeader";
import CustomForm from "../../../../../layout/CustomForm";
import CustomCheckbox from "../../../../../components/CustomChecbox";

const StepFour = ({ formData, updateFormData }) => {
  const [deliveryType, setDeliveryType] = useState(["delivery"]);

  const onChange = (e) => {
    setDeliveryType(e);
    updateFormData({ deliveryType: e });
  };

  const deliveryTypes = [
    { label: "Envíos nacionales e internacionales", value: "delivery" },
    { label: "Tarifas planas o calculadas", value: "rates" },
    {
      label: "Integraciones con mensajerías (DHL, UPS, etc.)",
      value: "delivery_integration",
    },
    { label: "Retiro en tienda o punto de entrega", value: "pickup_point" },
  ];

  return (
    <div className="step">
      <StepHeader stepLabel={"Paso 4 de 5"} title={"Envíos"}></StepHeader>
      <div className="step-content">
        <div className="instructions">
          <h6>Define tus opciones de envío</h6>
          <p>
            Establece reglas de entrega según tu negocio y el lugar donde
            operas.
          </p>
        </div>

        <CustomForm layout="vertical">
          <Form.Item label="" required>
            <CustomCheckbox
              options={deliveryTypes}
              onchange={onChange}
              value={deliveryType}
            />
          </Form.Item>
        </CustomForm>
      </div>
    </div>
  );
};

export default StepFour;
