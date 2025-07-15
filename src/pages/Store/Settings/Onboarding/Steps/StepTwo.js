import React from "react";
import { Form, Input } from "antd";
import CustomForm from "../../../../../layout/CustomForm";
import CustomDragger from "../../../../../components/CustomDragger";
import StepHeader from "../../../../../components/Steps/StepHeader";
import { forwardRef } from "react";

const StepTwo = ({ formData, updateFormData }, ref) => {
  const [form] = Form.useForm();

  React.useImperativeHandle(ref, () => ({
    validateFields: () => form.validateFields(),
  }));

  const onValuesChange = (changedValues, allValues) => {
    updateFormData({ ...formData, ...allValues });
  };

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

        <CustomForm
          form={form}
          layout="vertical"
          initialValues={formData}
          onValuesChange={onValuesChange}
        >
          <Form.Item
            name="siteName"
            label="Nombre del sitio o Tienda"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el nombre del sitio",
              },
              { min: 3, message: "El nombre debe tener al menos 3 caracteres" },
            ]}
          >
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

export default forwardRef(StepTwo);
