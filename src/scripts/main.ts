import { initTheme, toggleTheme } from './theme';
import { initModals, openModal, closeModal, handleModalShortcut } from './modals';
import { initTypewriter } from './typewriter';
import 'devicon/devicon.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const init = (): void => {
    initTheme();
    initModals();
    initTypewriter();
    bindEvents();
};

const bindEvents = (): void => {
    document.addEventListener('keydown', handleKeydown);

    bindButton('btn-projects', () => openModal('projects'));
    bindButton('btn-technologies', () => openModal('technologies'));
    bindButton('btn-experience', () => openModal('experience'));
    bindButton('btn-about-me', () => openModal('about-me'));
    bindButton('contact-button', () => openModal('contact'));
};

const bindButton = (id: string, handler: () => void): void => {
    const btn = document.getElementById(id);

    if (btn) btn.addEventListener('click', handler);
};

const handleKeydown = (event: KeyboardEvent): void => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;

    switch (event.key) {
        case '1':
            handleModalShortcut('projects');
            break;
        case '2':
            handleModalShortcut('technologies');
            break;
        case '3':
            handleModalShortcut('experience');
            break;
        case '4':
            handleModalShortcut('about-me');
            break;
        case 'c':
        case 'C':
            handleModalShortcut('contact');
            break;
        case 't':
        case 'T':
            toggleTheme();
            break;
        case 'Escape':
            closeModal();
            break;
    }
};

document.addEventListener('DOMContentLoaded', init);

document.addEventListener('astro:page-load', init);