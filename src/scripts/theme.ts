const THEME_KEY = 'jidev_theme';

export const initTheme = (): void => {
    const toggle = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');

    if (!toggle || !icon) return;

    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    applyTheme(savedTheme);

    toggle.addEventListener('click', toggleTheme);
};

export const toggleTheme = (): void => {
    const isDark = document.body.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
};

export const applyTheme = (theme: string): void => {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;

    if (theme === 'dark') {
        document.body.classList.add('dark');
        icon.classList.remove('bi-lightbulb-fill');
        icon.classList.add('bi-lightbulb-off-fill');
    } else {
        document.body.classList.remove('dark');
        icon.classList.remove('bi-lightbulb-off-fill');
        icon.classList.add('bi-lightbulb-fill');
    }
};