import { Routes, Route } from "react-router-dom";

import SignInPage from "../pages/Signin";
import HomePage from "../pages/Home";
import MainLayout from "../layout";
import SettingsPage from "../pages/Store/Settings";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/store/settings" element={<SettingsPage />} />
        {/* Add more routes here that need MainLayout */}
      </Route>
    </Routes>
  );
};

export default Router;
