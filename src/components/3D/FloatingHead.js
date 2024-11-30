import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";

const FloatingHead = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("/models/facetest3.gltf");

  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      geometry={nodes.FBHead003.geometry}
      material={materials["FBHead.001_preview_mat"]}
    //   material-emissive="#ffbf40"
    />
  );
});

FloatingHead.displayName = 'FloatingHead';

export default FloatingHead;

useGLTF.preload("/models/facetest3.gltf");
