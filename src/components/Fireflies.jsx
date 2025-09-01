import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

const Fireflies = () => {
  const containerRef = useRef(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (init) return;

    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setInit(true));
  }, [init]);

  const particlesLoaded = useCallback((container) => {
    containerRef.current = container;
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: false }, // keeps particles in background
      background: {
        color: "transparent",
      },
      particles: {
        number: {
          value: 80, // number of fireflies
          density: { enable: true, area: 800 },
        },
        color: {
          value: "#f5e068", // golden yellow
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.8,
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.3,
            sync: false, // twinkling effect
          },
        },
        size: {
          value: 4,
          random: true,
        },
        move: {
          enable: true,
          speed:3,
          direction: "none",
          random: true,
          straight: false,
          outModes: "out",
        },
        links: {
          enable: false, // no connecting lines
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse", // fireflies move away when hovered
          },
        },
      },
    }),
    []
  );

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      )}
    </>
  );
};

export default Fireflies;
