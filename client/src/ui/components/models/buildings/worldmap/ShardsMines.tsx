/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 ./client/public/models/bank2.glb 
Author: Tunca.Erkal (https://sketchfab.com/Tunca.Erkal)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/medieval-house-c959349f23f04998b8d9687a4a2c6b50
Title: Medieval House
*/

import { getUIPositionFromColRow } from "@/ui/utils/utils";
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { useEntityQuery } from "@dojoengine/react";
import { HasValue, getComponentValue } from "@dojoengine/recs";
import { useDojo } from "@/hooks/context/DojoContext";

export const ShardsMines = () => {
  const { setup } = useDojo();
  const mines = useEntityQuery([HasValue(setup.components.Structure, { category: "ShardsMine" })]);

  const minesPositions = Array.from(mines).map((mine) => {
    const position = getComponentValue(setup.components.Position, mine);
    return { position: position!, entityId: position!.entity_id };
  });

  const handleModelClick = (entityId: any) => {};

  return (
    <group>
      {minesPositions.map((mine, index) => {
        const { x, y } = getUIPositionFromColRow(mine.position.x, mine.position.y, false);
        return <ShardsMineModel key={index} position={[x, 0.5, -y]} onClick={() => handleModelClick(mine.entityId)} />;
      })}
    </group>
  );
};

const ShardsMineModel = ({ position, onClick }: { position: any; onClick: () => void }) => {
  const shardsMineModel = useGLTF("/models/buildings/mine.glb");
  const clone = useMemo(() => {
    const clone = shardsMineModel.scene.clone();
    return clone;
  }, [shardsMineModel]);

  return <primitive scale={3} object={clone} position={position} onClick={onClick} />;
};
