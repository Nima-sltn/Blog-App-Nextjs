import { useDarkMode } from "@/context/DarkModeContext";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const icon = isDarkMode ? (
    <SunIcon className="h-5 w-5 text-primary-900" />
  ) : (
    <MoonIcon className="h-5 w-5 text-primary-900" />
  );

  return (
    <button onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
      {mounted ? icon : <MoonIcon className="h-5 w-5 text-primary-900" />}
    </button>
  );
};

export default DarkModeToggle;
