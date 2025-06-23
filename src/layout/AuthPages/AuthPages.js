import logo from "../../assets/logo.svg";

import "./AuthPages.scss";

const AuthPages = ({ children, title, description }) => {
  return (
    <div className="auth-page">
      <div className="main-container">
        <img src={logo} alt="Eddy Logo" />
        <div className="form-container">
          <div className="title">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          {children}
        </div>
      </div>

      <div className="bg-image" />
    </div>
  );
};

export default AuthPages;
