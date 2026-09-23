import { navigationNodes } from "./navigationNodes";

export const getNodeFloor = (nodeId) => {
  const node = navigationNodes[nodeId];
  if (!node) return 1;
  return node[1] > 0.5 ? 2 : 1;
};

const getStaircaseId = (nodeId) => nodeId
  .replace(/_(1f|2f)$/i, "")
  .replace(/stairs_zm?\d+(?:_\d+)?/i, (match) => match.replace(/_(1f|2f)$/i, ""));

export const analyzeRoute = (path) => {
  if (!path?.length) return null;

  let distance = 0;
  let floorChanges = 0;
  const staircases = new Set();

  for (let index = 0; index < path.length; index += 1) {
    const nodeId = path[index];
    if (nodeId.toLowerCase().includes("stairs")) {
      staircases.add(getStaircaseId(nodeId));
    }

    if (index === 0) continue;

    const previousId = path[index - 1];
    const previous = navigationNodes[previousId];
    const current = navigationNodes[nodeId];

    if (getNodeFloor(previousId) !== getNodeFloor(nodeId)) {
      floorChanges += 1;
    }

    if (previous && current) {
      const dx = current[0] - previous[0];
      const dy = current[1] - previous[1];
      const dz = current[2] - previous[2];
      distance += Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
  }

  const walkingSeconds = distance / 1.2 + floorChanges * 25;

  return {
    floorChanges,
    staircases: staircases.size,
    walkingMinutes: Math.max(1, Math.ceil(walkingSeconds / 60)),
    startFloor: getNodeFloor(path[0]),
    endFloor: getNodeFloor(path[path.length - 1]),
  };
};
