import { GameProvider } from "@/context/GameContext";
import { GamePage } from "@/pages/GamePage";
import "./index.css";

export function App(): JSX.Element {
  return (
    <GameProvider>
      <GamePage />
    </GameProvider>
  );
}
