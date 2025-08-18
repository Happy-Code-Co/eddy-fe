import React from "react";

const ContentEditorRightmenu = () => {
  return (
    <aside className="w-full max-w-xs bg-white rounded-lg shadow-md p-4">
      <div className="mb-4">
        <span className="block text-lg font-semibold text-gray-700 mb-2">
          Section Properties
        </span>
        <div className="space-y-2">
          <details>
            <summary>Section Style</summary>
            {/* Inputs for Section Style will go here */}
          </details>
          <details>
            <summary>Heading Text</summary>
            {/* Inputs for Heading Text will go here */}
          </details>
          <details>
            <summary>Body Text</summary>
            {/* Inputs for Body Text will go here */}
          </details>
          <details>
            <summary>Button</summary>
            {/* Inputs for Button will go here */}
          </details>
          <details>
            <summary>Image</summary>
            {/* Inputs for Image will go here */}
          </details>
          <details>
            <summary>Background Color</summary>
            {/* Inputs for Background Color will go here */}
          </details>
        </div>
      </div>
    </aside>
  );
};

export default ContentEditorRightmenu;
