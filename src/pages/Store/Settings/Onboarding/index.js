import { Button, Modal } from "antd";
import { useRef, useState } from "react";
import caret from "../../../../assets/ui/caret.svg";
import done from "../../../../assets/ui/done.svg";
import error from "../../../../assets/ui/error.svg";
import "./Onboarding.scss";
import StepFive from "./Steps/StepFive";
import StepFour from "./Steps/StepFour";
import StepOne from "./Steps/StepOne";
import StepThree from "./Steps/StepThree";
import StepTwo from "./Steps/StepTwo";

const OnboardingView = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isConnectionSuccess, setIsConnectionSuccess] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Test connection simulation set true for success, false for failure
  //const isSuccess = false;
  const isSuccess = Math.random() > 0.5; // Randomly simulate success or failure

  // Refs for each step's form
  const formRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const steps = [
    <StepOne
      key="step1"
      formData={formData}
      updateFormData={updateFormData}
      ref={formRefs[0]}
    />,
    <StepTwo
      key="step2"
      formData={formData}
      updateFormData={updateFormData}
      ref={formRefs[1]}
    />,
    <StepThree
      key="step3"
      formData={formData}
      updateFormData={updateFormData}
      testConnection={testConnection}
      isConnectionSuccess={isConnectionSuccess}
      ref={formRefs[2]}
    />,
    <StepFour
      key="step4"
      formData={formData}
      updateFormData={updateFormData}
      ref={formRefs[3]}
    />,
    <StepFive key="step5" formData={formData} />,
  ];

  function updateFormData(newData) {
    setFormData((prev) => ({ ...prev, ...newData }));
  }

  async function testConnection() {
    try {
      // Simular un delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Si deseamos que sea exitosa la simulacion

      if (isSuccess) {
        setIsConnectionSuccess(true);
        setIsModalVisible(true);
        return true;
      } else {
        setIsConnectionSuccess(false);
        setIsModalVisible(true);
        return false;
      }
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
        const isConnected = await testConnection();
        if (isConnected) {
          setCurrentStep((prev) => prev + 1);
        } else {
          return;
        }
      } else {
        if (currentStep < steps.length - 1) {
          setCurrentStep((prev) => prev + 1);

          if (currentStep === steps.length - 2) {
            console.log("Final step reached, saving data:", formData);
          }
        }
      }
    } catch (error) {
      return;
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }

    if (currentStep === 3) {
      setIsConnectionSuccess(false);
      setIsModalVisible(false);
    }
  };

  const getButtonText = () => {
    if (currentStep === 2) return "Probar conexión";
    if (currentStep === steps.length - 2) return "Finalizar";
    return "Continuar";
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
              {getButtonText()}
              <img src={caret} alt="Next" />
            </Button>
          ) : null}
        </div>
      </div>

      <Modal
        title={isConnectionSuccess ? "Conexión Exitosa" : "Conexión fallida."}
        open={isModalVisible}
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
        footer={
          isConnectionSuccess
            ? [
                <Button
                  className={isConnectionSuccess ? "" : "btn-danger"}
                  type="primary"
                  key="back"
                  onClick={handleCancel}
                >
                  Guardar y continuar
                </Button>,
              ]
            : [
                <Button
                  className={isConnectionSuccess ? "" : "btn-danger"}
                  type="primary"
                  key="back"
                  onClick={handleCancel}
                >
                  Reintentar
                </Button>,
                <Button
                  className={isConnectionSuccess ? "" : "btn-danger--secondary"}
                  key="link"
                  href="https://docs.wompi.co/en/docs/colombia/ambientes-y-llaves-pagos-a-terceros/"
                  target="_blank"
                  type="secondary"
                  loading={loading}
                  onClick={handleOk}
                >
                  Ir a la guía de integración
                </Button>,
              ]
        }
      >
        {isConnectionSuccess ? (
          <img src={done} alt="Success Icon" />
        ) : (
          <img src={error} alt="Error Icon" />
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
            <h3>No pudimos conectar con Wompi.</h3>
          )}
          <p>
            {isConnectionSuccess
              ? "Las usamos únicamente para conectar tu tienda con Wompi y no serán compartidas con terceros."
              : "Revisa tus credenciales o vuelve a intentarlo más tarde."}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default OnboardingView;
