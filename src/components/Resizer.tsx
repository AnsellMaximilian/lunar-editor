import { useState, useEffect, useCallback } from "react";

type MousePos = {
  x: number;
  y: number;
};

interface Props {
  onResize: (deltaPos: MousePos) => void;
  onMouseUp: () => void;
}

export default function Resizer({ onResize, onMouseUp }: Props) {
  const [initialMousPos, setInitialMousPos] = useState<MousePos | null>(null);
  const handleMouseMove = useCallback<(this: Window, ev: MouseEvent) => void>(
    (e) => {
      if (initialMousPos) {
        const deltaX = e.screenX - initialMousPos.x;
        const deltaY = e.screenY - initialMousPos.y;
        onResize({ x: deltaX, y: deltaY });
      }
    },
    [initialMousPos, onResize]
  );

  const handleMouseUp = useCallback(() => {
    setInitialMousPos(null);
    onMouseUp();
  }, [onMouseUp]);
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      className="bg-zinc-800 cursor-move"
      style={{ width: 10, minWidth: 10 }}
      onMouseDown={(e) => {
        setInitialMousPos({ x: e.clientX, y: e.clientY });
      }}
    ></div>
  );
}
