// useCanvas.js
import { useLayoutEffect } from "react";
import rough from "roughjs/bundled/rough.esm";
import { drawElement } from "../utils/drawElement.js";

export const useRenderCanvas = ({
    canvaRef, setScaleOffset,elements, action, 
    color, canvasSize, selectedElement,panOffset,scale,
}) => {

  useLayoutEffect(() => {
    const canvas = canvaRef.current;
    const context = canvas.getContext("2d");
    const roughCanvas = rough.canvas(canvas);

    context.clearRect(0, 0, canvas.width, canvas.height);

    const scaledWidth = canvas.width * scale;
    const scaledHeight = canvas.height * scale;
    const scaleOffsetX = (scaledWidth - canvas.width) / 2;
    const scaleOffsetY = (scaledHeight - canvas.height) / 2;
    setScaleOffset({ x: scaleOffsetX, y: scaleOffsetY });
    context.save();
    context.translate(
      panOffset.x * scale - scaleOffsetX,
      panOffset.y * scale - scaleOffsetY
    );
    context.scale(scale, scale);

    elements.forEach((element) => {
      if (action === "writing" && selectedElement.id === element.id) return;
      drawElement(roughCanvas, context, element, color);
    });
    context.restore();
  }, [elements, action, canvaRef,setScaleOffset, color, canvasSize, selectedElement, panOffset, scale]);
};

