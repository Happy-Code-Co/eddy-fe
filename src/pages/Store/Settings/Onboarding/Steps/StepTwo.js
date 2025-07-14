import { Form, Input } from "antd";
import CustomForm from "../../../../../layout/CustomForm";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import CustomDragger from "../../../../../components/CustomDragger";
import StepHeader from "../../../../../components/Steps/StepHeader";

const StepTwo = () => {
  return (
    <div className="step">
      <StepHeader stepLabel={"Paso 2 de 5"} title={"Nombre y Marca"} />
      <div className="step-content">
        <div className="instructions">
          <h6>Define tu identidad</h6>
          <p>
            Configura el nombre, logo y elementos visuales básicos de tu marca.
          </p>
        </div>

        <CustomForm layout="vertical">
          <Form.Item label="Nombre del sitio o Tienda" required>
            <Input placeholder="Agrega el nombre del Sitio" />
          </Form.Item>
          <Form.Item label="Logo (Subida de imagen)" required>
            <CustomDragger />
          </Form.Item>
          <Form.Item label="Favicon (opcional)" required>
            <CustomDragger />
          </Form.Item>
        </CustomForm>
      </div>
    </div>
  );
};

export default StepTwo;
