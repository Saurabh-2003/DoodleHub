import { useEffect } from "react";

export const useUndoRedo = ({undo, redo}) => {
  useEffect(() => {
    const undoRedoFunction = event => {
      if ((event.metaKey || event.ctrlKey) && event.key === "z") {
        undo();
      }else if( (event.metaKey || event.ctrlKey) && event.key === "y"){
        redo();
      }
    };

    document.addEventListener("keydown", undoRedoFunction);
    return () => {
      document.removeEventListener("keydown", undoRedoFunction);
    };
  }, [undo, redo]);
};
