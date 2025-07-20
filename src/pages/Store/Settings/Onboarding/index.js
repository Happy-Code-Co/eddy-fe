// index.js
import { Button, Modal } from "antd";
import { useState, useRef, useEffect } from "react";
import "./Onboarding.scss";
import StepOne from "./Steps/StepOne";
import StepTwo from "./Steps/StepTwo";
import StepThree from "./Steps/StepThree";
import StepFour from "./Steps/StepFour";
import StepFive from "./Steps/StepFive";
import done from "../../../../assets/ui/done.svg";

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
      // Simular un delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Si deseamos que sea exitosa la simulacion
      const success = true;

      if (success) {
        setIsConnectionSuccess(true);
        setIsModalVisible(true);
        return true;
      } else {
        setIsConnectionSuccess(false);
        setIsModalVisible(true);
        return true;
      }
    } catch (error) {
      console.error("Connection test failed:", error);
      return false;
    }
  }

  const handleNext = async () => {
    try {
      const currentForm = formRefs[currentStep]?.current;
      console.log("Validating form for step:", currentStep + 1);

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

  useEffect(() => {
    console.log("Form data:", formData);
  }, [currentStep, formData]);

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
        title={isConnectionSuccess ? "Conexión Exitosa" : "Error de Conexión"}
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        okButtonProps={
          isConnectionSuccess ? {} : { danger: true, type: "secondary" }
        }
        cancelButtonProps={{ style: { display: "none" } }}
        okText={isConnectionSuccess ? "Guardar y continuar" : "Reintentar"}
        className={
          isConnectionSuccess
            ? "onboarding-success-modal"
            : "onboarding-success-modal onboarding-error-modal"
        }
      >
        {isConnectionSuccess ? (
          <img src={done} alt="Success Icon" />
        ) : (
          <div className="error-icon">!</div>
        )}

        <div
          className={
            isConnectionSuccess
              ? "message success-message"
              : "message error-message"
          }
        >
          {isConnectionSuccess ? (
            <h3>Tus credenciales están seguras.</h3>
          ) : (
            <h3>Hubo un error al conectar tu tienda</h3>
          )}
          <p>
            {isConnectionSuccess
              ? "Las usamos únicamente para conectar tu tienda con Wompi y no serán compartidas con terceros."
              : "Por favor, verifica tus credenciales y vuelve a intentarlo."}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default OnboardingView;
