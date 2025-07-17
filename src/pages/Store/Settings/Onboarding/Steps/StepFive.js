import StepHeader from "../../../../../components/Steps/StepHeader";
import { Button } from "antd";

const StepFive = ({ formData }) => {
  const handleFinish = () => {
    console.log("Final form data:", formData);
  };

  return (
    <div className="step">
      <StepHeader stepLabel={"Paso 5 de 5"} title={"Configuración Completa"} />
      <div className="step-content">
        <div className="instructions">
          <h6>¡Todo listo!</h6>
          <p>
            Tu sitio ha sido configurado correctamente. Ahora puedes comenzar a
            vender en línea.
          </p>
        </div>

        <Button type="primary" onClick={handleFinish}>
          Finalizar
        </Button>
      </div>
    </div>
  );
};

export default StepFive;
