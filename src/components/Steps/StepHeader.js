const StepHeader = ({ stepLabel, title }) => {
  return (
    <div className="step-header">
      <label>{stepLabel}</label>
      <h2>{title}</h2>
    </div>
  );
};

export default StepHeader;
