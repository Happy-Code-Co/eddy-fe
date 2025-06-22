import { HashRouter, Routes, Route } from "react-router";

import HomePage from "../pages/Home";

const Router = () => {
  return (
    <HashRouter>
      {/* <BrowserRouter basename="/students-fundraising-program"> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
