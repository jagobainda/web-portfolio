const VISITED_KEY = "jagoba_dev_visited";

export const initTypewriter = (): void => {
    const el = document.getElementById("welcome-title");
    if (!el) return;

    const fullText = el.textContent || " Jagoba Inda ~$ Full Stack Developer";

    el.classList.remove("invisible");

    const typed = document.createElement("span");
    typed.className = "typing-cursor";

    const rest = document.createElement("span");
    rest.style.opacity = "0";

    el.replaceChildren(typed, rest);

    const render = (count: number): void => {
        typed.textContent = fullText.slice(0, count);
        rest.textContent = fullText.slice(count);
    };

    if (localStorage.getItem(VISITED_KEY)) {
        render(fullText.length);
        return;
    }

    render(0);

    typeText(fullText.length, render, () => {
        localStorage.setItem(VISITED_KEY, "true");
    });
};

const typeText = (length: number, render: (count: number) => void, onComplete: () => void): void => {
    let index = 0;

    const randomDelay = (): number => Math.floor(Math.random() * 81) + 60;

    const step = (): void => {
        render(index);

        if (index >= length) {
            onComplete();
            return;
        }

        index++;
        setTimeout(step, randomDelay());
    };

    step();
};

export const resetTypewriter = (): void => {
    localStorage.removeItem(VISITED_KEY);
};
