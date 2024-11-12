import { useReactFlow } from '@xyflow/react';

const useNodeCentering = (nodeId: string) => {
  const { getNode, setCenter } = useReactFlow();

  const handleNodeCenter = () => {
    const node = getNode(nodeId);

    if (!node) return;

    const { position, measured } = node;

    if (!position || !measured) return;

    const { width, height } = measured;
    const x = position.x + width! / 2;
    const y = position.y + height! / 2;

    if (x === undefined || y === undefined) return;

    setCenter(x, y, { duration: 500 });
  };

  return handleNodeCenter;
};

export default useNodeCentering;
