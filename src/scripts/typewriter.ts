const VISITED_KEY = 'jagoba_dev_visited';

export const initTypewriter = (): void => {
    const el = document.getElementById('welcome-title');
    if (!el) return;

    const baseText = ' Jagoba Inda ~$ ';
    const mainText = 'Full Stack Developer';
    const fullText = baseText + mainText;

    if (localStorage.getItem(VISITED_KEY)) {
        el.textContent = fullText;
        return;
    }

    el.textContent = '';

    typeText(el, fullText, () => { localStorage.setItem(VISITED_KEY, 'true'); });
};

const typeText = (element: HTMLElement, text: string, onComplete: () => void): void => {
    let index = 0;

    const randomDelay = (): number => Math.floor(Math.random() * 81) + 60;

    const step = (): void => {
        if (index > text.length) {
            onComplete();
            return;
        }

        element.textContent = text.substring(0, index);
        index++;
        setTimeout(step, randomDelay());
    };

    step();
};

export const resetTypewriter = (): void => {
    localStorage.removeItem(VISITED_KEY);
};