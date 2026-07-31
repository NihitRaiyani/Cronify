"use client";

import { useEffect, useRef } from "react";
import { Rive } from "@rive-app/canvas";

export function QountDashboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Fetch and scan Rive binary for ASCII strings (artboard names, inputs, etc.)
    fetch("/hero_desktop_V05_cronify.riv")
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const bytes = new Uint8Array(buffer);
        const strings = [];
        let current = "";
        for (let i = 0; i < bytes.length; i++) {
          const byte = bytes[i];
          if (byte >= 32 && byte <= 126) {
            current += String.fromCharCode(byte);
          } else {
            if (current.length >= 3) {
              strings.push(current);
            }
            current = "";
          }
        }
        console.log("RIVE_BINARY_STRINGS:", JSON.stringify([...new Set(strings)]));
      })
      .catch((err) => console.error("Error reading Rive binary:", err));

    const rive = new Rive({
      src: "/hero_desktop_V05_cronify.riv",
      canvas: canvasRef.current,
      autoplay: true,
      stateMachines: "State Machine 1",
      onLoad: () => {
        console.log("RIVE_DEBUG: Loaded successfully");
        console.log("RIVE_DEBUG: State Machines:", JSON.stringify(rive.stateMachineNames));
        console.log("RIVE_DEBUG: Animations:", JSON.stringify(rive.animationNames));
      },
      onLoadError: (err) => {
        console.error("RIVE_DEBUG: Load error:", err);
      }
    });

    if (typeof window !== "undefined") {
      (window as any).riveDebug = rive;
    }

    return () => {
      rive.cleanup();
    };
  }, []);

  return (
    <div className="w-full max-w-[850px] mx-auto relative">
      <figure className="relative w-full h-full">
        <canvas
          ref={canvasRef}
          width={1200}
          height={1000}
          className="w-full h-full"
        />
      </figure>
    </div>
  );
}
