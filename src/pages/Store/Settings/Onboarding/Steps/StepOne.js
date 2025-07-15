import React, { useState } from "react";
import { Radio } from "antd";
import StepHeader from "../../../../../components/Steps/StepHeader";

const StepOne = ({ formData, updateFormData }) => {
  const options = [
    { label: "Estoy empezando, no tengo ventas", value: "starting" },
    { label: "Ya estoy vendiendo online o en persona", value: "operational" },
  ];

  const [businessStage, setBusinessStage] = useState(
    formData.businessStage || "starting"
  );

  const handleChange = (e) => {
    updateFormData({ businessStage: e.target.value });
    setBusinessStage(e.target.value);
  };

  return (
    <div className="step">
      <StepHeader stepLabel={"Paso 1 de 5"} title={"Configuración Rápida"} />
      <div className="step-content">
        <div className="instructions">
          <h6>¿En qué etapa está tu negocio?</h6>
          <p>Esto nos ayudará a configurar tu sitio según tus necesidades.</p>
        </div>

        <Radio.Group
          block
          options={options}
          value={businessStage}
          onChange={handleChange}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
    </div>
  );
};

export default StepOne;
