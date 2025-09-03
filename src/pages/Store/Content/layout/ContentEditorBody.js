import { useSelector, useDispatch } from "react-redux";
import { setAddSectionModalVisible } from "../../../../redux/slices/StoreSlice";
import {
  LayoutOutlined,
  PlusCircleOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import axios from "../../../../axiosInterceptor";

import PrimaryButton from "../../../../components/PrimaryButton";
import Hero from "../_components/Hero";
import EditorComponent from "./EditorComponent";

// Helper to parse style string to object
function parseStyle(styleStr) {
  if (!styleStr) return {};
  return styleStr
    .split(";")
    .filter(Boolean)
    .reduce((acc, rule) => {
      const [prop, value] = rule.split(":");
      if (prop && value) {
        acc[prop.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase())] =
          value.trim();
      }
      return acc;
    }, {});
}

const ContentEditorBody = () => {
  const dispatch = useDispatch();
  const store_logo = useSelector((state) => state.store.logo_desktop);
  const store_name = useSelector((state) => state.store.name);
  const selectedPage = useSelector((state) => state.store.selectedPage);

  // Ensure components is always an array (parse if stringified)
  let components = [];
  if (selectedPage && selectedPage.components) {
    if (typeof selectedPage.components === "string") {
      try {
        components = JSON.parse(selectedPage.components);
      } catch {
        components = [];
      }
    } else if (Array.isArray(selectedPage.components)) {
      components = selectedPage.components;
    }
  }

  // Publish handler
  const publishPage = async () => {
    if (!selectedPage || !selectedPage.id) return;
    try {
      const payload = {
        ...selectedPage,
        components: JSON.stringify(selectedPage.components),
      };
      await axios.put(`/content/page/${selectedPage.id}`, payload, {
        withCredentials: true,
      });
      // Optionally show a success message or update state
      alert("Página publicada exitosamente.");
    } catch (err) {
      alert("Error al publicar la página.");
    }
  };

  return (
    <div className="w-full h-fit bg-white shadow-lg flex flex-col">
      {/* Top nav bar */}
      <nav className="flex items-center justify-between border-b-2 px-6 py-4">
        <div className="flex items-center gap-3">
          {store_logo ? (
            <img src={store_logo} alt={store_name} className="h-8 w-auto" />
          ) : (
            <span className="font-bold uppercase text-xl text-gray-900">
              {store_name}
            </span>
          )}
        </div>
        <div className="flex flex-row gap-2">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded bg-[#C6CB8D] text-[#232323] font-semibold hover:bg-[#D6E08D] transition border border-[#C6CB8D]"
            onClick={publishPage}
          >
            <CloudUploadOutlined />
            Publicar
          </button>
        </div>
      </nav>
      <div className="flex flex-col gap-4">
        {selectedPage && Array.isArray(components) && components.length > 0 ? (
          <>
            {components.map((comp) => {
              return <EditorComponent key={comp.id} component={comp} />;
            })}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <LayoutOutlined className="text-4xl text-gray-400 mb-4" />
            <h2 className="text-l font-semibold text-gray-800 text-center mb-4">
              Aún no has agregado secciones.
              <br />
              <span className="text-gray-500 font-normal text-1xl">
                Haz clic en el botón para comenzar a personalizar tu página.
              </span>
            </h2>
            <PrimaryButton
              className="outline-none mt-2 px-6 py-3 text-base font-semibold rounded-lg bg-[#C6CB8D] text-[#232323] hover:bg-[#D6E08D] transition flex items-center gap-2"
              icon={<PlusCircleOutlined />}
              onClick={() => dispatch(setAddSectionModalVisible(true))}
            >
              Agregar sección
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentEditorBody;
