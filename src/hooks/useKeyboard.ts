import { useEffect } from "react";
import type { Direction } from "@/types";

interface UseKeyboardProps {
  onDirectionChange: (direction: Direction) => void;
  onPause: () => void;
  onRestart: () => void;
  onStart?: () => void;
  isPlaying: boolean;
  isGameOver?: boolean;
}

export function useKeyboard({
  onDirectionChange,
  onPause,
  onRestart,
  onStart,
  isPlaying,
  isGameOver
}: UseKeyboardProps) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Verificar se o foco está em um input ou textarea
      const activeElement = document.activeElement;
      const isInputFocused =
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA" ||
        activeElement?.contentEditable === "true";

      // Se um input estiver focado, não processar teclas do jogo
      if (isInputFocused) {
        return;
      }

      // Prevenir comportamento padrão apenas para teclas do jogo
      const gameKeys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "KeyW",
        "KeyA",
        "KeyS",
        "KeyD",
        "Space",
        "KeyR"
      ];

      if (gameKeys.includes(event.code)) {
        event.preventDefault();
      }

      // Controles de direção (apenas quando jogando)
      if (isPlaying) {
        switch (event.code) {
          case "ArrowUp":
          case "KeyW":
            onDirectionChange("UP");
            break;
          case "ArrowDown":
          case "KeyS":
            onDirectionChange("DOWN");
            break;
          case "ArrowLeft":
          case "KeyA":
            onDirectionChange("LEFT");
            break;
          case "ArrowRight":
          case "KeyD":
            onDirectionChange("RIGHT");
            break;
        }
      }

      // Controles de jogo (sempre disponíveis)
      switch (event.code) {
        case "Space":
          if (isGameOver) {
            onRestart();
          } else if (isPlaying) {
            onPause();
          } else if (onStart) {
            onStart();
          }
          break;
        case "KeyR":
          onRestart();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [onDirectionChange, onPause, onRestart, onStart, isPlaying, isGameOver]);
}
