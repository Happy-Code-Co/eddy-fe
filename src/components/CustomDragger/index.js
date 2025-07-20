import { message, Upload } from "antd";
import Dragger from "antd/es/upload/Dragger";
import classNames from "classnames";
import UploadIcon from "../../assets/ui/Upload.svg";
import "./CustomDragger.scss";
import { useState, useEffect } from "react";

const CustomDragger = ({ value, onChange, name }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (value && typeof value === "object") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(value);
    }
  }, [value]);

  const beforeUpload = (file) => {
    setError(null);

    const allowedTypes = [
      "image/svg+xml",
      "image/png",
      "image/jpeg",
      "image/gif",
    ];
    const allowedExtensions = [".svg", ".png", ".jpg", ".jpeg", ".gif"];

    const isAllowedType =
      allowedTypes.includes(file.type) ||
      allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));

    if (!isAllowedType) {
      setError("Tipo de archivo no permitido");
      return Upload.LIST_IGNORE;
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const { width, height } = img;
          if (width > 800 || height > 400) {
            setError("La imagen debe ser menor a 800x400px");
            resolve(false);
          } else {
            setPreviewImage(e.target.result);
            // Informar al formulario
            onChange?.(file);
            resolve(false);
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const props = {
    name,
    multiple: false,
    className: classNames("custom-dragger", "ant-upload-dragger"),
    showUploadList: false,
    beforeUpload,
    accept: ".svg,.png,.jpg,.jpeg,.gif",
  };

  return (
    <div>
      <Dragger {...props}>
        {previewImage ? (
          <div className="preview-container">
            <img
              src={previewImage}
              alt="Preview"
              className="preview-image"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          </div>
        ) : (
          <>
            <p className="ant-upload-drag-icon">
              <img src={UploadIcon} alt="Upload Icon" />
            </p>
            <p className="ant-upload-text">Haz click para subir</p>
            <p className="ant-upload-hint">
              Solo se permite subir un archivo. Formatos permitidos:
              <br />
              <span>SVG, PNG, JPG o GIF (max. 800x400px)</span>
            </p>
          </>
        )}
      </Dragger>
      {previewImage && (
        <div className="preview-actions">
          <button
            className="remove-button"
            onClick={() => {
              setPreviewImage(null);
              onChange?.(null);
            }}
          >
            Eliminar imagen
          </button>
        </div>
      )}
      {error && (
        <div className="ant-upload-error-message">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
export default CustomDragger;
