const ContentEditorTopbar = ({ onClose }) => {
  return (
    <div className="w-full flex items-center justify-between px-6 py-5 bg-[#20211F] border-b border-[#232323]">
      {/* Left: Back arrow, Title, Live badge */}
      <div className="flex items-center gap-3">
        <button
          onClick={onClose}
          className="text-[#B5B5B5] hover:text-white focus:outline-none"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              d="M15 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="text-white font-semibold text-lg tracking-wide">
          Content Editor
        </span>
        <span className="flex items-center gap-1 bg-[#C6CB8D]/20 text-[#C6CB8D] text-xs font-medium px-2 py-0.5 rounded">
          <span className="w-2 h-2 rounded-full bg-[#C6CB8D] mr-1"></span>
          Live
        </span>
      </div>
      {/* Right: Controls */}
      <div className="flex items-center gap-2">
        {/* Desktop icon */}
        <button className="p-2 rounded bg-[#C6CB8D]/20 text-[#C6CB8D] hover:bg-[#C6CB8D]/30">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <rect
              x="3"
              y="5"
              width="14"
              height="8"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <rect
              x="8"
              y="15"
              width="4"
              height="1.5"
              rx="0.75"
              fill="currentColor"
            />
          </svg>
        </button>
        {/* Mobile icon */}
        <button className="p-2 rounded bg-[#C6CB8D]/20 text-[#C6CB8D] hover:bg-[#C6CB8D]/30">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <rect
              x="7"
              y="3"
              width="6"
              height="14"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <rect
              x="9"
              y="15.5"
              width="2"
              height="1"
              rx="0.5"
              fill="currentColor"
            />
          </svg>
        </button>
        {/* Undo */}
        <button className="p-2 rounded bg-[#232323] text-[#B5B5B5] hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="17"
            viewBox="0 0 20 17"
            fill="none"
          >
            <path
              d="M19.7501 11C19.7484 12.5908 19.1157 14.1159 17.9908 15.2407C16.866 16.3656 15.3409 16.9983 13.7501 17H5.5001C5.30119 17 5.11042 16.921 4.96977 16.7803C4.82912 16.6397 4.7501 16.4489 4.7501 16.25C4.7501 16.0511 4.82912 15.8603 4.96977 15.7197C5.11042 15.579 5.30119 15.5 5.5001 15.5H13.7501C14.9436 15.5 16.0882 15.0259 16.9321 14.182C17.776 13.3381 18.2501 12.1935 18.2501 11C18.2501 9.80653 17.776 8.66193 16.9321 7.81802C16.0882 6.97411 14.9436 6.5 13.7501 6.5H2.81041L6.03073 9.71937C6.17146 9.8601 6.25052 10.051 6.25052 10.25C6.25052 10.449 6.17146 10.6399 6.03073 10.7806C5.89 10.9214 5.69912 11.0004 5.5001 11.0004C5.30108 11.0004 5.11021 10.9214 4.96948 10.7806L0.469477 6.28062C0.399744 6.21097 0.344425 6.12825 0.306682 6.0372C0.268939 5.94616 0.249512 5.84856 0.249512 5.75C0.249512 5.65144 0.268939 5.55384 0.306682 5.46279C0.344425 5.37175 0.399744 5.28903 0.469477 5.21937L4.96948 0.719374C5.11021 0.578644 5.30108 0.499582 5.5001 0.499582C5.69912 0.499582 5.89 0.578644 6.03073 0.719374C6.17146 0.860105 6.25052 1.05098 6.25052 1.25C6.25052 1.44902 6.17146 1.63989 6.03073 1.78062L2.81041 5H13.7501C15.3409 5.00174 16.866 5.63444 17.9908 6.75928C19.1157 7.88412 19.7484 9.40923 19.7501 11Z"
              fill="white"
            />
          </svg>
        </button>
        {/* Redo */}
        <button className="p-2 rounded bg-[#232323] text-[#B5B5B5] hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="17"
            viewBox="0 0 20 17"
            fill="none"
          >
            <path
              d="M13.9694 9.71937L17.1897 6.5H6.25C5.05653 6.5 3.91193 6.97411 3.06802 7.81802C2.22411 8.66193 1.75 9.80653 1.75 11C1.75 12.1935 2.22411 13.3381 3.06802 14.182C3.91193 15.0259 5.05653 15.5 6.25 15.5H14.5C14.6989 15.5 14.8897 15.579 15.0303 15.7197C15.171 15.8603 15.25 16.0511 15.25 16.25C15.25 16.4489 15.171 16.6397 15.0303 16.7803C14.8897 16.921 14.6989 17 14.5 17H6.25C4.6587 17 3.13258 16.3679 2.00736 15.2426C0.882141 14.1174 0.25 12.5913 0.25 11C0.25 9.4087 0.882141 7.88258 2.00736 6.75736C3.13258 5.63214 4.6587 5 6.25 5H17.1897L13.9694 1.78062C13.8997 1.71094 13.8444 1.62822 13.8067 1.53717C13.769 1.44613 13.7496 1.34855 13.7496 1.25C13.7496 1.15145 13.769 1.05387 13.8067 0.962827C13.8444 0.871782 13.8997 0.789057 13.9694 0.719374C14.0391 0.649692 14.1218 0.594416 14.2128 0.556704C14.3039 0.518992 14.4015 0.499582 14.5 0.499582C14.5985 0.499582 14.6961 0.518992 14.7872 0.556704C14.8782 0.594416 14.9609 0.649692 15.0306 0.719374L19.5306 5.21937C19.6004 5.28903 19.6557 5.37175 19.6934 5.46279C19.7312 5.55384 19.7506 5.65144 19.7506 5.75C19.7506 5.84856 19.7312 5.94616 19.6934 6.0372C19.6557 6.12825 19.6004 6.21097 19.5306 6.28062L15.0306 10.7806C14.8899 10.9214 14.699 11.0004 14.5 11.0004C14.301 11.0004 14.1101 10.9214 13.9694 10.7806C13.8286 10.6399 13.7496 10.449 13.7496 10.25C13.7496 10.051 13.8286 9.8601 13.9694 9.71937Z"
              fill="white"
            />
          </svg>
        </button>
        {/* Publicar button */}
        <button className="ml-2 px-4 py-2 rounded bg-[#232323] text-[#C6CB8D] font-semibold hover:bg-[#C6CB8D]/10 border border-[#C6CB8D] transition">
          Publicar
        </button>
        {/* Compartir button */}
        <button className="ml-2 px-4 py-2 rounded bg-[#C6CB8D] text-[#232323] font-semibold hover:bg-[#C6CB8D]/90 transition">
          Compartir
        </button>
      </div>
    </div>
  );
};

export default ContentEditorTopbar;
