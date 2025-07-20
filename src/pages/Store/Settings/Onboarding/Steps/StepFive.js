import { useEffect } from "react";
import StepHeader from "../../../../../components/Steps/StepHeader";
import finishedImage from "../../../../../assets/ui/finish-onboarding.svg";
import ActionCard from "../../../../../components/ActionCard/ActionCard";

import MagicWand from "../../../../../assets/ui/MagicWand.svg";
import Storefront from "../../../../../assets/ui/Storefront.svg";

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

          <ActionCard
            icon={<img src={Storefront} alt="Storefront" />}
            title="Agregar un nuevo producto"
            description="Comienza a cargar tus productos o servicios."
            ctaText="Agregar producto"
            onClick={() => console.log("Agregar producto")}
          />

          <ActionCard
            icon={<img src={MagicWand} alt="Magic Wand" />}
            title="Armar mi sitio web"
            description="Personaliza el diseño y contenido de tu sitio."
            ctaText="Ir al editor del sitio"
            onClick={() => console.log("Ir al editor")}
          />

          <p style={{ marginTop: "24px" }}>
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
