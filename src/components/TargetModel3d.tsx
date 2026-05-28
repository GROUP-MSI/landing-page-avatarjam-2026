import { useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface ModelProps {
  modelPath: string;
  animationName?: string;
}

interface TargetModel3dProps {
  // Modelo
  modelPath: string;
  animationName?: string;

  // Canvas / tamaño
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;

  // Cámara
  cameraPosition?: [number, number, number];
  cameraFov?: number;

  // Iluminación
  ambientIntensity?: number;
  directionalIntensity?: number;
  directionalPosition?: [number, number, number];
}

// ─── Componente interno (DENTRO del Canvas) ───────────────────────────────────

const Model = ({ modelPath, animationName }: ModelProps) => {
  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, scene);

  React.useEffect(() => {
    if (!animationName) return;

    const action = actions[animationName];
    if (action) {
      action.reset().play();
    } else {
      console.warn(
        `Animación "${animationName}" no encontrada. Disponibles:`,
        Object.keys(actions),
      );
    }
  }, [actions, animationName]);

  return <primitive object={scene} />;
};

// ─── Componente público (contiene el Canvas) ──────────────────────────────────

export const TargetModel3d = ({
  modelPath,
  animationName,
  width = "100%",
  height = 400,
  className,
  style,
  cameraPosition = [0, 2, 5],
  cameraFov = 60,
  ambientIntensity = 0.8,
  directionalIntensity = 1,
  directionalPosition = [10, 10, 5],
}: TargetModel3dProps) => {
  return (
    <Canvas
      style={{ width, height, ...style }}
      className={className}
      camera={{ position: cameraPosition, fov: cameraFov }}
    >
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        position={directionalPosition}
        intensity={directionalIntensity}
      />
      <Model modelPath={modelPath} animationName={animationName} />
    </Canvas>
  );
};
