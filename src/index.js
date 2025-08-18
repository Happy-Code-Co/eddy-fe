import ReactDOM from "react-dom/client";
import App from "./routes/Router";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { useState } from "react";

import store from "./redux/store";
import { getAntdTheme } from "./theme";

import "./index.scss";

function Root() {
  const [isDark, setIsDark] = useState(false);
  return (
    <ConfigProvider theme={getAntdTheme(isDark)}>
      <Provider store={store}>
        <BrowserRouter>
          <App setIsDark={setIsDark} isDark={isDark} />
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
