"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModePreference = localStorage.getItem("darkMode");
    setIsDarkMode(darkModePreference === "dark");

    document.documentElement.classList.toggle(
      "dark",
      darkModePreference === "dark",
    );
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
}
