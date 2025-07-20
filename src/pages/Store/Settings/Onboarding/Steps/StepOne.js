import { useEffect, forwardRef, useImperativeHandle } from "react";
import { Form, Radio } from "antd";
import StepHeader from "../../../../../components/Steps/StepHeader";

const StepOne = forwardRef(({ formData, updateFormData }, ref) => {
  const [form] = Form.useForm();
  const options = [
    { label: "Estoy empezando, no tengo ventas", value: "starting" },
    { label: "Ya estoy vendiendo online o en persona", value: "operational" },
  ];

  useImperativeHandle(ref, () => ({
    validateFields: () => form.validateFields(),
  }));

  const handleChange = (e) => {
    updateFormData({ businessStage: e.target.value });
  };

  useEffect(() => {
    if (!formData.businessStage) {
      updateFormData({ businessStage: "starting" });
    }
  }, []);

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
          value={formData.businessStage || "starting"}
          onChange={handleChange}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
    </div>
  );
});

export default StepOne;
