import { createContext, useState } from "react";

export const ThemeContext = createContext({
  currentTheme: "light",
  theme: {
    dark: {
      bgcolor: "bg-stone-900",
      bgcomps: "bg-stone-600",
      text: "text-white",
      bgdetail: "bg-neutral-400",
    },
    light: {
      bgcolor: "bg-white",
      bgcomps: "bg-white",
      text: "text-black",
    },
  },
});

export default function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState("light");
  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setCurrentTheme,
        theme: {
          dark: {
            bgcolor: "bg-stone-900",
            bgcomps: "bg-stone-600",
            text: "text-white",
            bgdetail: "bg-neutral-400",
          },
          light: {
            bgcolor: "bg-white",
            bgcomps: "bg-white",
            text: "text-black",
          },
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
