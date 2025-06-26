import { Routes, Route } from "react-router-dom";

import {
  ACCOUNT_ONBOARDING,
  ACCOUNT_SETTINGS,
  DASHBOARD,
  LOGIN,
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

const Router = () => {
  return (
    <Routes>
      <Route path={ROOT} element={<SignInPage />} />
      <Route path={REGISTER} element={<SignUpPage />} />
      <Route path={LOGIN} element={<SignInPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path={DASHBOARD} element={<HomePage />} />
          <Route path={ACCOUNT_SETTINGS} element={<SettingsPage />} />
          <Route path={ACCOUNT_ONBOARDING} element={<OnboardingView />} />
          {/* Add more routes here that need MainLayout */}
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
