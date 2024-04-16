// usePanFunctionEffect.js
import { useEffect } from "react";

export const usePanFunctionEffect = (setPanOffset) => {
  useEffect(() => {
    const panFunction = (event) => {
      setPanOffset((prevState) => ({
        x: prevState.x - event.deltaX,
        y: prevState.y - event.deltaY,
      }));
    };

    document.addEventListener("wheel", panFunction);
    return () => {
      document.removeEventListener("wheel", panFunction);
    };
  }, [setPanOffset]);
};

