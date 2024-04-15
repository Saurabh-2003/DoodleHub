const distance = (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const nearPoint = (x, y, x1, y1, name) => {
  return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
};

const onLine = (x1, y1, x2, y2, x, y, maxDistance = 1) => {
  const a = { x: x1, y: y1 };
  const b = { x: x2, y: y2 };
  const c = { x, y };
  const offset = distance(a, b) - (distance(a, c) + distance(b, c));
  return Math.abs(offset) < maxDistance ? "inside" : null;
};

function isPointInsidePolygon(x, y, vertices) {
  let inside = false;
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const xi = vertices[i][0], yi = vertices[i][1];
    const xj = vertices[j][0], yj = vertices[j][1];
    const intersect = ((yi > y) !== (yj > y)) &&
                      (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}
const nearPolygonVertex = (x, y, vertices, vertexIndex) => {
  const [vertexX, vertexY] = vertices[vertexIndex];
  return Math.abs(x - vertexX) < 5 && Math.abs(y - vertexY) < 5 ? vertexIndex : null;
};

const positionWithinElement = (x, y, element) => {
  const { type, x1, x2, y1, y2 } = element;
  switch (type) {
    case "line":
      const on = onLine(x1, y1, x2, y2, x, y);
      const start = nearPoint(x, y, x1, y1, "start");
      const end = nearPoint(x, y, x2, y2, "end");
      return start || end || on;
    case "rectangle":
      const topLeft = nearPoint(x, y, x1, y1, "tl");
      const topRight = nearPoint(x, y, x2, y1, "tr");
      const bottomLeft = nearPoint(x, y, x1, y2, "bl");
      const bottomRight = nearPoint(x, y, x2, y2, "br");
      const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
      return topLeft || topRight || bottomLeft || bottomRight || inside;
    case "circle":
      const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) / 2;
      const distanceToCenter = Math.sqrt(Math.pow(x - ((x1 + x2) / 2), 2) + Math.pow(y - ((y1 + y2) / 2), 2));
      if (Math.abs(distanceToCenter - radius) < 2) {
        return 'perim'; // Mouse pointer is on the perimeter
      } else if (distanceToCenter < radius) {
        return "inside"; // Mouse pointer is inside the circle
      } else {
        return null; // Mouse pointer is outside the circle
      }
    case "polygon":
      const vertices = [[x1, y1], [(x1 + x2) / 2, y2], [x2, y1], [(x1 + x2) / 2, y1 - (y2 - y1)]];
      // First check if mouse pointer in vertices
      for (let i = 0; i < vertices.length; i++) {
        const vertexIndex = nearPolygonVertex(x, y, vertices, i);
        if (vertexIndex !== null) {
          return `vertex_${i}`;
        }
      }
      // Secondly check if mouse pointer inside or in the area of polygon to move it around
      const insidePolygon = isPointInsidePolygon(x, y, vertices);
      if (insidePolygon) {
        return "inside";
      }

      return null;
    case "pencil":
      const betweenAnyPoint = element.points.some((point, index) => {
        const nextPoint = element.points[index + 1];
        if (!nextPoint) return false;
        return onLine(point.x, point.y, nextPoint.x, nextPoint.y, x, y, 5) != null;
      });
      return betweenAnyPoint ? "inside" : null;
    case "text":
      return x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
    default:
      throw new Error(`Type not recognised: ${type}`);
  }
};

export const getElementAtPosition = (x, y, elements) => {
  return elements
    .map(element => ({ ...element, position: positionWithinElement(x, y, element) }))
    .find(element => element.position !== null);
};
