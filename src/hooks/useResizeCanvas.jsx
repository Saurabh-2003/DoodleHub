import { useEffect } from "react";


export const useResizeCanvas = ({canvaRef, setCanvasSize}) => {
    useEffect(() => {
        const updateCanvasSize = () => {
          const canvas = canvaRef.current;
          const { innerWidth, innerHeight } = window;
          canvas.width = innerWidth;
          canvas.height = innerHeight;
          setCanvasSize({ width: innerWidth, height: innerHeight });
        };
    
        updateCanvasSize();

        window.addEventListener("resize", updateCanvasSize);
    
        return () => {
          window.removeEventListener("resize", updateCanvasSize);
        };
      }, [canvaRef, setCanvasSize]);
}
