const StepHeader = ({ stepLabel, title }) => {
  return (
    <div className="flex flex-col items-start mb-6">
      <label className="text-xs text-gray-500 uppercase tracking-wider mb-1">
        {stepLabel}
      </label>
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    </div>
  );
};

export default StepHeader;
