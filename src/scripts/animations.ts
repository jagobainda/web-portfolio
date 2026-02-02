import { animate, remove } from 'animejs';

export const animateModalOpen = (content: HTMLElement): void => {
    remove(content);

    animate(content, {
        translateY: [-30, 0],
        scale: [0.95, 1],
        opacity: [0, 1],
        rotate: [-2, 0],
        duration: 400,
        easing: 'easeOutCubic',
        delay: 100
    });
};

export const animateModalClose = (content: HTMLElement, onComplete: () => void): void => {
    remove(content);

    animate(content, {
        translateY: [0, 20],
        scale: [1, 0.9],
        opacity: [1, 0],
        rotate: [0, -1],
        duration: 250,
        easing: 'easeInQuart',
        onComplete: onComplete
    });
};

export const animateButtonHover = (button: HTMLElement, isEntering: boolean): void => {
    animate(button, {
        translateY: isEntering ? -5 : 0,
        duration: 300,
        easing: 'easeOutCubic'
    });
};