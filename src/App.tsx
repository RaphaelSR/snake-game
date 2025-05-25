import React from "react";
import { GameProvider } from "@/context/GameContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { GameSettingsProvider } from "@/context/GameSettingsContext";
import { GamePage } from "@/pages/GamePage";
import { GameSettingsSelector } from "./components/GameSettingsSelector";
import "./index.css";
import "@/styles/themes.css";

export function App(): JSX.Element {
  return (
    <ThemeProvider>
      <GameSettingsProvider>
        <GameProvider>
          <div className="App">
            <GameSettingsSelector />
            <GamePage />
          </div>
        </GameProvider>
      </GameSettingsProvider>
    </ThemeProvider>
  );
}

export default App;
