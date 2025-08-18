const ActionCard = ({ icon, title, description, ctaText, onClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
      <div className="flex flex-col items-center mb-4">
        <div className="mb-2 text-3xl">{icon}</div>
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onClick}
      >
        {ctaText}
      </button>
    </div>
  );
};

export default ActionCard;
