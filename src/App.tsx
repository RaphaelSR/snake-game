import { GameProvider } from "@/context/GameContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { GameSettingsProvider } from "@/context/GameSettingsContext";
import { I18nProvider } from "@/context/I18nContext";
import { AnalyticsProvider } from "@/context/AnalyticsContext";
import { GamePage } from "@/pages/GamePage";
import { GameSettingsSelector } from "./components/GameSettingsSelector";
import "./index.css";
import "@/styles/themes.css";

export function App(): JSX.Element {
  return (
    <I18nProvider>
      <ThemeProvider>
        <GameSettingsProvider>
          <AnalyticsProvider>
            <GameProvider>
              <div className="App">
                <GameSettingsSelector />
                <GamePage />
              </div>
            </GameProvider>
          </AnalyticsProvider>
        </GameSettingsProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
