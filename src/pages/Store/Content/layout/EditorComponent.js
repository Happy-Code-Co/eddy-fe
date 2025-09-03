import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedComponent } from "../../../../redux/slices/StoreSlice";

import Hero from "../_components/Hero";
import ContentGrid from "../_components/ContentGrid";

const EditorComponent = ({ component }) => {
  const dispatch = useDispatch();
  const selectedComponent = useSelector(
    (state) => state.store.selectedComponent
  );

  const handleSelect = (e) => {
    e.stopPropagation();
    dispatch(setSelectedComponent(component));
  };

  const CompToRender = () => {
    switch (component.type) {
      case "hero":
        return <Hero key={component.id} component={component} />;
      case "content-grid":
        return <ContentGrid key={component.id} component={component} />;
      default:
        return <></>;
    }
  };

  return (
    <div
      className="relative cursor-pointer z-0 hover:scale-[1.018] transition-transform"
      onClick={handleSelect}
    >
      <div
        className={cn("absolute inset-0 z-10", {
          "border-[5px] border-[#BAC887]":
            component.id === selectedComponent?.id,
        })}
      />
      <div
        className={cn(
          "bg-[#BAC887] p-[2px_8px] absolute top-0 left-0 rounded-[4px] z-10",
          {
            visible: component.id === selectedComponent?.id,
            invisible: component.id !== selectedComponent?.id,
          }
        )}
      >
        {component.id}
      </div>
      <CompToRender />
    </div>
  );
};

export default EditorComponent;
