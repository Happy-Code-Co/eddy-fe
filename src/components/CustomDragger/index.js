import { message, Upload } from "antd";
import Dragger from "antd/es/upload/Dragger";
import classNames from "classnames";
import UploadIcon from "../../assets/ui/Upload.svg";

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
    className: classNames(
      "border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 flex flex-col items-center justify-center w-full",
      "ant-upload-dragger"
    ),
    showUploadList: false,
    beforeUpload,
    accept: ".svg,.png,.jpg,.jpeg,.gif",
  };

  return (
    <div>
      <Dragger {...props}>
        {previewImage ? (
          <div className="flex flex-col items-center mb-4">
            <img
              src={previewImage}
              alt="Preview"
              className="object-contain max-h-52 mb-2 rounded shadow"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          </div>
        ) : (
          <>
            <p className="flex justify-center mb-2">
              <img src={UploadIcon} alt="Upload Icon" className="w-10 h-10" />
            </p>
            <p className="text-blue-600 font-medium mb-1">
              Haz click para subir
            </p>
            <p className="text-xs text-gray-500">
              Solo se permite subir un archivo. Formatos permitidos:
              <br />
              <span>SVG, PNG, JPG o GIF (max. 800x400px)</span>
            </p>
          </>
        )}
      </Dragger>
      {previewImage && (
        <div className="flex justify-center mt-2">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded shadow"
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
        <div className="text-red-600 text-sm mt-2">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
export default CustomDragger;
