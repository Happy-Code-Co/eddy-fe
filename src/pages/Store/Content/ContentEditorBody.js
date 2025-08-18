import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { setAddSectionModalVisible } from "../../../redux/slices/StoreSlice";

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

  return (
    <div className="content-editor-body">
      <div className="editor-document">
        <nav className="editor-navbar">
          {store_logo ? (
            <img src={store_logo} alt={store_name} style={{ height: 32 }} />
          ) : (
            <span style={{ fontWeight: 600, fontSize: 18 }}>{store_name}</span>
          )}
        </nav>
        <div className="editor-content">
          {selectedPage &&
          Array.isArray(selectedPage.page_component) &&
          selectedPage.page_component.length > 0 ? (
            <>
              {selectedPage.page_component.map((comp, idx) => (
                <div key={idx} className={`${comp.type}-section`}>
                  {Array.isArray(comp.content) &&
                    comp.content.map((el, i) => {
                      if (el.tag === "img") {
                        return (
                          <img
                            key={i}
                            src={el.content}
                            alt=""
                            style={el.style ? parseStyle(el.style) : {}}
                          />
                        );
                      }
                      if (el.tag === "button") {
                        return (
                          <Button
                            key={i}
                            type="primary"
                            style={el.style ? parseStyle(el.style) : {}}
                          >
                            {el.content}
                          </Button>
                        );
                      }
                      const Tag = el.tag;
                      return (
                        <Tag
                          key={i}
                          style={el.style ? parseStyle(el.style) : {}}
                        >
                          {el.content}
                        </Tag>
                      );
                    })}
                </div>
              ))}
            </>
          ) : (
            <div className="editor-empty">
              <Button
                type="dashed"
                size="large"
                className="add-section-button"
                icon={<span style={{ fontWeight: 600 }}>+</span>}
                onClick={() => dispatch(setAddSectionModalVisible(true))}
              >
                Add Section
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentEditorBody;
