import logo from "../../assets/logo.svg";

const AuthPages = ({ children, title, description }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#232323]">
      {/* Left: Form Section */}
      <div className="flex flex-col justify-center w-full md:w-1/2 px-6 md:px-16 py-10">
        <div className="mb-10">
          <img src={logo} alt="Eddy Logo" className="h-10 mb-8" />
        </div>
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {title}
          </h1>
          <p className="text-gray-300 mb-8">{description}</p>
          {children}
        </div>
      </div>
      {/* Right: Image Section */}
      <div className="hidden md:block md:w-1/2 h-[400px] md:h-auto">
        <div className="w-full h-full min-h-screen flex items-stretch">
          <img
            src={require("../../assets/bg/bg-1.jpg")}
            alt="Login visual"
            className="object-cover w-full h-full grayscale-[.7] opacity-90"
            style={{ filter: "sepia(0.3) hue-rotate(45deg) brightness(0.95)" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPages;
