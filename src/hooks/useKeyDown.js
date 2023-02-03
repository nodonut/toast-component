import React from "react";

const useKeyDown = (key, callback) => {
  React.useEffect(() => {
    function handle(event) {
      if (event.key === key) {
        callback(event);
      }
    }
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [key, callback]);
};

export default useKeyDown;
