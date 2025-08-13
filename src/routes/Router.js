import { Routes, Route } from "react-router-dom";

import {
  ONBOARDING,
  SETTINGS,
  DASHBOARD,
  LOGIN,
  WEB_CONTENT,
  REGISTER,
  ROOT,
} from "./list";

import SignUpPage from "../pages/Signup";
import SignInPage from "../pages/Signin";
import HomePage from "../pages/Home";
import MainLayout from "../layout";
import SettingsPage from "../pages/Store/Settings";
import PrivateRoute from "./PrivateRoute";
import OnboardingView from "../pages/Store/Settings/Onboarding";
import StoreContent from "../pages/Store/Content";

const Router = ({ setIsDark, isDark }) => {
  return (
    <Routes>
      <Route path={ROOT} element={<SignInPage />} />
      <Route path={REGISTER} element={<SignUpPage />} />
      <Route path={LOGIN} element={<SignInPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout setIsDark={setIsDark} isDark={isDark} />}>
          <Route path={DASHBOARD} element={<HomePage />} />
          <Route path={SETTINGS} element={<SettingsPage />} />
          <Route path={ONBOARDING} element={<OnboardingView />} />
          {/* Add more routes here that need MainLayout */}
        </Route>
        <Route path={WEB_CONTENT} element={<StoreContent />} />
      </Route>
    </Routes>
  );
};

export default Router;
