"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const LightDark = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMode = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        className="h-10 w-10 rounded-full hover:bg-primary/5"
        disabled
        aria-label="Toggle theme"
      />
    );
  }

  return (
    <Button
      type="button"
      variant="default"
      className="h-10 w-10 cursor-pointer rounded-full "
      onClick={toggleMode}
      aria-label={`Switch to ${resolvedTheme === "light" ? "dark" : "light"
        } mode`}
    >
      {resolvedTheme === "light" ? (
        <Moon className="size-5" />
      ) : (
        <Sun className="size-5" />
      )}

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export { LightDark as Switcher };
export default LightDark;