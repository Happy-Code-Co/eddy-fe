import { Button } from "antd";
import { useState } from "react";

import "./Onboarding.scss";
import StepOne from "./Steps/StepOne";
import StepTwo from "./Steps/StepTwo";
import StepThree from "./Steps/StepThree";
import StepFour from "./Steps/StepFour";

const OnboardingView = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [<StepOne />, <StepTwo />, <StepThree />, <StepFour />];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="onboarding-view">
      <div className="wizard">
        {steps[currentStep]}
        <div className="navigation-buttons">
          {currentStep > 0 ? (
            <Button onClick={handleBack} type="secondary">
              Atrás
            </Button>
          ) : (
            <span></span>
          )}
          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            type="primary"
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingView;
