import React from "react";
import { GameProvider } from "@/context/GameContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { GamePage } from "@/pages/GamePage";
import { ThemeSelector } from "./components/ThemeSelector";
import "./index.css";
import "@/styles/themes.css";

export function App(): JSX.Element {
  return (
    <ThemeProvider>
      <div className="App">
        <ThemeSelector />
        <GameProvider>
          <GamePage />
        </GameProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
