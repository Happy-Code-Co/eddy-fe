// index.js
import { Button, Modal } from "antd";
import { useState, useRef } from "react";
import "./Onboarding.scss";
import StepOne from "./Steps/StepOne";
import StepTwo from "./Steps/StepTwo";
import StepThree from "./Steps/StepThree";
import StepFour from "./Steps/StepFour";
import StepFive from "./Steps/StepFive";

const OnboardingView = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isConnectionSuccess, setIsConnectionSuccess] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Refs for each step's form
  const formRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const steps = [
    <StepOne
      formData={formData}
      updateFormData={updateFormData}
      formRef={formRefs[0]}
    />,
    <StepTwo
      formData={formData}
      updateFormData={updateFormData}
      formRef={formRefs[1]}
    />,
    <StepThree
      formData={formData}
      updateFormData={updateFormData}
      testConnection={testConnection}
      isConnectionSuccess={isConnectionSuccess}
      formRef={formRefs[2]}
    />,
    <StepFour
      formData={formData}
      updateFormData={updateFormData}
      formRef={formRefs[3]}
    />,
    <StepFive formData={formData} />,
  ];

  function updateFormData(newData) {
    setFormData((prev) => ({ ...prev, ...newData }));
  }

  async function testConnection() {
    try {
      // Simulate API call
      const response = await fetch("your-api-endpoint", {
        method: "POST",
        body: JSON.stringify({
          publicKey: formData.publicKey,
          privateKey: formData.privateKey,
        }),
      });

      if (response.ok) {
        setIsConnectionSuccess(true);
        setIsModalVisible(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Connection test failed:", error);
      return false;
    }
  }

  const handleNext = async () => {
    try {
      const currentForm = formRefs[currentStep]?.current;

      if (currentForm) {
        await currentForm.validateFields();
      }

      if (currentStep === 2) {
        if (!isConnectionSuccess) {
          const connectionSuccess = await testConnection();
          if (!connectionSuccess) return;
        }
      }

      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    } catch (error) {
      console.log("Validation failed:", error);
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
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext} type="primary">
              Continuar
            </Button>
          ) : null}
        </div>
      </div>

      <Modal
        title="Conexión Exitosa"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>La conexión con Wompi se ha establecido correctamente.</p>
      </Modal>
    </div>
  );
};

export default OnboardingView;
