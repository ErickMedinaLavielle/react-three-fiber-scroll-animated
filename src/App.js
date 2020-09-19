import React, { useState } from "react";
import { useSpring } from "@react-spring/core";
import { Canvas, useThree } from "react-three-fiber";

import { a } from "@react-spring/three";
import "./styles.css";

export default function App() {
  const [{ top }, set] = useSpring(() => ({
    top: 0,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 }
  }));

  function onScroll(e) {
    set({ top: e.target.scrollTop });
  }
  return (
    <>
      <Canvas>
        <mesh>
          <ambientLight />
          <pointLight position={[-10, 10, -10]} castShadow />
          <Box top={top} />
        </mesh>
      </Canvas>
      <div
        onScroll={onScroll}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          overflow: "auto"
        }}
      >
        <div style={{ height: `${7 * 100}vh` }} />
      </div>
    </>
  );
}

function Box({ top }) {
  const [active, setActive] = useState(false);
  const {
    size: { height }
  } = useThree();

  // interpolate values from commong spring
  const scale = top.to([0, height * 7], [1, 5]);

  // const color = top.to([0, height, height * 1, height * 2, height * 3, height * 4, height * 5], rainbow)
  return (
    <a.mesh
      scale-x={scale}
      scale-z={scale}
      onClick={() => {
        console.log("yo");
        setActive(!active);
      }}
    >
      <planeBufferGeometry attach="geometry" args={[5, 5]} />
      <meshStandardMaterial attach="material" color={"hotpink"} />
    </a.mesh>
  );
}
