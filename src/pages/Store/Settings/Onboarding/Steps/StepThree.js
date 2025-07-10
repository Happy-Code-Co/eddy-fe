import { Form, Input, Checkbox } from "antd";
import StepHeader from "../../../../../components/Steps/StepHeader";
import CustomForm from "../../../../../layout/CustomForm";
import CustomCheckbox from "../../../../../components/CustomCheckbox";

const StepThree = () => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div className="step">
      <StepHeader
        stepLabel={"Paso 3 de 9"}
        title={"Métodos de Pago — Integración con Wompi"}
      ></StepHeader>
      <div className="step-content">
        <div className="instructions">
          <h6>Conecta tu cuenta de Wompi para recibir pagos</h6>
          <p>
            Para poder procesar pagos con tarjeta en tu sitio, necesitamos que
            ingreses las credenciales de tu cuenta Wompi.
          </p>
        </div>

        <CustomForm layout="vertical">
          <Form.Item label="Public Key" required>
            <Input size="large" placeholder="pub_prod_ABC123..." />
          </Form.Item>
          <Form.Item label="Private Key" required>
            <Input size="large" placeholder="pub_prod_ABC123..." />
          </Form.Item>

          <Form.Item label="Private Key" required>
            <CustomCheckbox onchange={onChange}>Producción</CustomCheckbox>
            <CustomCheckbox onchange={onChange}>
              Sandbox / Pruebas
            </CustomCheckbox>
          </Form.Item>
        </CustomForm>
      </div>
    </div>
  );
};

export default StepThree;
