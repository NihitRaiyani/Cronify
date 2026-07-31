"use client";

import { useEffect, useRef } from "react";
import { Rive } from "@rive-app/canvas";

export function QountDashboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const rive = new Rive({
      src: "/hero_desktop_V05_cronify.riv",
      canvas: canvasRef.current,
      autoplay: true,
      stateMachines: "State Machine 1",
      onLoad: () => {
        console.log("RIVE_DEBUG: Loaded successfully");
        console.log("RIVE_DEBUG: State Machines:", JSON.stringify(rive.stateMachineNames));
        console.log("RIVE_DEBUG: Animations:", JSON.stringify(rive.animationNames));

        setTimeout(() => {
          try {
            const inputs = rive.stateMachineInputs("State Machine 1");
            if (inputs) {
              console.log("RIVE_DEBUG: Inputs (Delayed):", JSON.stringify(inputs.map(inp => ({
                name: inp.name,
                type: inp.type,
                value: inp.value
              }))));
            } else {
              console.log("RIVE_DEBUG: Inputs (Delayed): null");
            }
          } catch (e) {
            console.error("RIVE_DEBUG: Error getting inputs delayed:", e);
          }
        }, 500);
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
    <div className="w-full aspect-[4/3] max-w-[850px] mx-auto relative">
      <figure className="relative w-full h-full">
        <canvas
          ref={canvasRef}
          width={1600}
          height={1200}
          className="w-full h-full"
        />
      </figure>
    </div>
  );
}
