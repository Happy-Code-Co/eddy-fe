import { Radio } from "antd";

const StepOne = () => {
  const options = [
    { label: "Estoy empezando, no tengo ventas", value: "starting" },
    { label: "Ya estoy vendiendo online o en persona", value: "operational" },
  ];
  return (
    <div className="step">
      <div className="step-header">
        <label>Paso 1 de 9</label>
        <h2>Configuración Rápida</h2>
      </div>
      <div className="step-content">
        <div className="instructions">
          <h6>¿En qué etapa está tu negocio?</h6>
          <p>Esto nos ayudará a configurar tu sitio según tus necesidades.</p>
        </div>

        <Radio.Group
          block
          options={options}
          defaultValue="Pear"
          optionType="button"
          buttonStyle="solid"
        />
      </div>
    </div>
  );
};

export default StepOne;
