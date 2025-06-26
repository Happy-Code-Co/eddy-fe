import { Button, Radio } from "antd";

import "./Onboarding.scss";

const OnboardingView = () => {
  const options = [
    { label: "Estoy empezando, no tengo ventas", value: "starting" },
    { label: "Ya estoy vendiendo online o en persona", value: "operational" },
  ];
  return (
    <div className="onboarding-view">
      <div className="wizard">
        <div className="step">
          <div className="step-header">
            <label>Paso 1 de 9</label>
            <h2>Configuración Rápida</h2>
          </div>
          <div className="step-content">
            <div className="instructions">
              <h6>¿En qué etapa está tu negocio?</h6>
              <p>
                Esto nos ayudará a configurar tu sitio según tus necesidades.
              </p>
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
        <div className="navigation-buttons">
          <Button type="secondary">Atrás</Button>
          <Button type="primary">Siguiente</Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingView;
