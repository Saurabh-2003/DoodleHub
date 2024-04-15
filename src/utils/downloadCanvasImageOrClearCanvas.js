const canvasBgHex = {
    'bg-white': '#FFFFFF',
    'bg-gray-800': '#1F2937',
    'bg-zinc-900': '#18181b',
    'bg-stone-800': '#1c1917',
    'bg-indigo-950': '#1e1b4b'
  };

export const downloadCanvasImage = ({canvaRef, canvasBackground}) => {
    const canvas = canvaRef.current;
    const link = document.createElement('a');
    link.download = 'canvas_image.png';
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
  
    tempCtx.fillStyle = canvasBgHex[canvasBackground];
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
  };

  export const handleClearCanvas = ({canvaRef, setElements}) => {
    const canvas = canvaRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setElements([])
  }
