import React from "react";

const AIButton = ({ startAI }) => {
  return (
    <button onClick={startAI}>
      Play against AI
    </button>
  );
};

export default AIButton;
