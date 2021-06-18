import React, { useEffect } from "react";

const Help = () => {
  useEffect(() => {
    document.title = "Should Do - Help";
  }, []);
  return (
    <div>
      <h3 className="center">Help page</h3>
    </div>
  );
};

export default Help;
