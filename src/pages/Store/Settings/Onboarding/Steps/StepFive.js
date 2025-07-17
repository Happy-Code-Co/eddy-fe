import { useEffect } from "react";
import StepHeader from "../../../../../components/Steps/StepHeader";
import finishedImage from "../../../../../assets/ui/finish-onboarding.svg";

const StepFive = ({ formData }) => {
  useEffect(() => {
    console.log("StepFive mounted with formData:", formData);
  }, [formData]);

  return (
    <div className="step">
      <StepHeader stepLabel={"Paso 5 de 5"} title={"¡Tu tienda está lista!"} />
      <div className="step-content step-five-content">
        <div className="instructions">
          <h6>¡Has terminado de configurar tu tienda!</h6>
          <p>
            Ahora puedes empezar a cargar productos o armar el diseño de tu
            sitio web.
          </p>

          <p>
            Puedes volver a esta pantalla desde el panel de administración
            cuando quieras.
          </p>
        </div>

        <img
          src={finishedImage}
          alt="Configuración completa"
          className="step-image"
        />
      </div>
    </div>
  );
};

export default StepFive;
