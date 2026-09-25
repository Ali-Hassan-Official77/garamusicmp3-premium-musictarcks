"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("gara-theme");
    const prefers = window.matchMedia("(prefers-color-scheme: light)").matches;
    const next = stored ? stored === "light" : prefers;
    document.documentElement.classList.toggle("theme-light", next);
    setLight(next);
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("theme-light", next);
    localStorage.setItem("gara-theme", next ? "light" : "dark");
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggle} aria-label={`Switch to ${light ? "dark" : "light"} mode`} title={`${light ? "Dark" : "Light"} mode`}>
      <span className="theme-toggle-icon"><Icon name={light ? "music" : "sparkles"} size={15} /></span>
      <span className="theme-toggle-label">{light ? "Light" : "Dark"}</span>
    </button>
  );
}
