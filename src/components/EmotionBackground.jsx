// frontend/src/components/EmotionBackground.jsx
import { useEffect, useRef } from "react";
import * as THREE from "three"; // Import Three.js properly

const EmotionBackground = ({ emotion }) => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    // Only load effects on desktop
    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop || !emotion) return;

    // Load effect based on emotion
    const loadEffect = async () => {
      try {
        let effectModule;
        switch (emotion) {
          case "fear_anxiety":
            effectModule = await import("vanta/dist/vanta.fog.min");
            break;
          case "sadness":
            effectModule = await import("vanta/dist/vanta.waves.min");
            break;
          case "happiness_gratitude":
            effectModule = await import("vanta/dist/vanta.clouds.min");
            break;
          case "anger":
            // Use fog effect for anger instead of topology
            effectModule = await import("vanta/dist/vanta.fog.min");
            break;
          case "regret_repentance":
            effectModule = await import("vanta/dist/vanta.fog.min");
            break;
          default:
            return;
        }

        // Destroy previous effect safely
        if (vantaEffect.current) {
          try {
            vantaEffect.current.destroy();
          } catch (e) {
            console.warn("Error destroying previous effect:", e);
          }
          vantaEffect.current = null;
        }

        // Ensure THREE is available
        if (!window.THREE) {
          window.THREE = THREE;
        }

        // Common configuration
        const configs = {
          el: vantaRef.current,
          THREE: window.THREE, // Explicitly pass THREE
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
        };

        // Emotion-specific configurations with color fixes
        switch (emotion) {
          case "fear_anxiety":
            vantaEffect.current = effectModule.default({
              ...configs,
              highlightColor: "#e9e9fc",
              midtoneColor: "#fcfcfc",
              lowlightColor: "#d2c3f2",
              baseColor: "#c1c1ea",
              blurFactor: 0.6,
              speed: 1.5,
            });
            break;
          case "sadness":
            vantaEffect.current = effectModule.default({
              ...configs,
              color: "#164981",
              waveHeight: 22,
              waveSpeed: 1,
              zoom: 0.3,
            });
            break;
          case "happiness_gratitude":
            vantaEffect.current = effectModule.default({
              ...configs,
              skyColor: "#CCF1FF",
              cloudColor: "#ffffff",
              sunColor: "#FFFFFF",
              speed: 0.6,
            });
            break;
          case "anger":
            // Fog configuration for anger
            vantaEffect.current = effectModule.default({
              ...configs,
              highlightColor: "#fc7e51",
              midtoneColor: "#cf6726",
              lowlightColor: "#d95757",
              baseColor: "#d95757",
              zoom: 2,
              blurFactor: 0.7,
              speed: 2.0,
            });
            break;
          case "regret_repentance":
            vantaEffect.current = effectModule.default({
              ...configs,
              highlightColor: "#c2a4ef",
              midtoneColor: "#9664d1",
              lowlightColor: "#7a4ea2",
              baseColor: "#b799d6",
              blurFactor: 0.7,
              speed: 1,
            });
            break;
        }
      } catch (error) {
        console.error("Vanta effect failed to load:", error);
      }
    };

    loadEffect();

    return () => {
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
        } catch (e) {
          console.warn("Error destroying Vanta effect:", e);
        }
        vantaEffect.current = null;
      }
    };
  }, [emotion]);

  return (
    <div ref={vantaRef} className="absolute inset-0 z-0 pointer-events-none" />
  );
};

export default EmotionBackground;
