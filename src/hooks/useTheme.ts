import { useThemeContext } from "@/context/ThemeContext";
import { themes } from "@/types/themes";

export const useTheme = () => {
  const { currentTheme, changeTheme, availableThemes } = useThemeContext();

  const getCurrentTheme = () => themes[currentTheme];

  const getCurrentColors = () => themes[currentTheme].colors;

  const applyThemeToElement = (element: HTMLElement) => {
    const theme = getCurrentTheme();
    Object.entries(theme.colors).forEach(([key, value]) => {
      element.style.setProperty(`--color-${key}`, value);
    });
  };

  return {
    currentTheme,
    changeTheme,
    availableThemes,
    getCurrentTheme,
    getCurrentColors,
    applyThemeToElement,
    themes
  };
};
