// useTextAreaEffect.js
import { useEffect } from "react";

export const useTextAreaEffect = (action, selectedElement, textAreaRef) => {
  useEffect(() => {
    const textArea = textAreaRef.current;
    if (action === "writing" && selectedElement) {
      setTimeout(() => {
        textArea.focus();
        textArea.value = selectedElement.text;
      }, 0);
    }
  }, [action, selectedElement, textAreaRef]);
};

