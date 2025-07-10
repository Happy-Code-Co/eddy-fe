import { Button } from "antd";

import "./Onboarding.scss";
import StepOne from "./Steps/StepOne";
import StepTwo from "./Steps/StepTwo";
import StepThree from "./Steps/StepThree";

const OnboardingView = () => {
  return (
    <div className="onboarding-view">
      <div className="wizard">
        <StepThree />
        <div className="navigation-buttons">
          <Button type="secondary">Atrás</Button>
          <Button type="primary">Siguiente</Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingView;
