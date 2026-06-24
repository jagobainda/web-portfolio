import { animateThemeIcon } from "./animations";

const THEME_KEY = "jidev_theme";

export const initTheme = (): void => {
    const toggle = document.getElementById("theme-toggle");

    if (!toggle) return;

    const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
    applyTheme(savedTheme);

    toggle.addEventListener("click", toggleTheme);
};

export const toggleTheme = (): void => {
    const isDark = document.body.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);

    const visibleIconId = newTheme === "dark" ? "theme-icon-dark" : "theme-icon-light";
    const icon = document.getElementById(visibleIconId);
    if (icon) animateThemeIcon(icon);
};

export const applyTheme = (theme: string): void => {
    document.body.classList.toggle("dark", theme === "dark");
};
