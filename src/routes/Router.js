import { Routes, Route } from "react-router-dom";

import SignUpPage from "../pages/Signup";
import SignInPage from "../pages/Signin";
import HomePage from "../pages/Home";
import MainLayout from "../layout";
import SettingsPage from "../pages/Store/Settings";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUpPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/login" element={<SignInPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/store/settings" element={<SettingsPage />} />
          {/* Add more routes here that need MainLayout */}
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
