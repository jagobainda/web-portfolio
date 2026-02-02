import { animateModalOpen, animateModalClose } from './animations';

let isTransitioning = false;

export const initModals = (): void => {
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => closeModal());
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    });

    window.addEventListener('popstate', () => {
        const openModal = document.querySelector('.modal:not(.hidden)');
        if (openModal) closeModal(true);
    });
};

export const openModal = (id: string): void => {
    if (isTransitioning) return;

    const modal = document.getElementById(`modal-${id}`);
    if (!modal) return;

    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    const content = modal.querySelector('.modal-content') as HTMLElement;
    if (content) {
        animateModalOpen(content);
    }

    initTabsInModal(modal);

    history.pushState({ modal: id }, '', `#${id}`);
};

export const closeModal = (skipHistory = false, callback?: () => void): void => {
    const modal = document.querySelector('.modal:not(.hidden)');
    if (!modal) {
        callback?.();
        return;
    }

    const content = modal.querySelector('.modal-content') as HTMLElement;
    if (!content) {
        callback?.();
        return;
    }

    isTransitioning = true;

    animateModalClose(content, () => {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');

        if (location.hash && !skipHistory) history.back();

        isTransitioning = false;

        if (callback) setTimeout(callback, 50);
    });
};

export const handleModalShortcut = (modalId: string): void => {
    const currentModal = document.querySelector('.modal:not(.hidden)');

    if (!currentModal) {
        openModal(modalId);
        return;
    }

    const currentModalId = currentModal.id.replace('modal-', '');

    if (currentModalId === modalId) {
        closeModal();
        return;
    }

    closeModal(false, () => openModal(modalId));
};

const initTabsInModal = (modal: Element): void => {
    const tabContainers = modal.querySelectorAll('[data-tabs]');

    tabContainers.forEach(container => {
        const buttons = container.querySelectorAll('.tab-btn');
        const panels = container.querySelectorAll('.tab-panel');

        buttons.forEach(btn => {
            const newBtn = btn.cloneNode(true) as Element;
            btn.parentNode?.replaceChild(newBtn, btn);

            newBtn.addEventListener('click', () => {
                const targetId = newBtn.getAttribute('data-target');
                if (!targetId) return;

                buttons.forEach(b => b.classList.remove('active'));
                panels.forEach(p => p.classList.add('hidden'));

                newBtn.classList.add('active');
                document.getElementById(targetId)?.classList.remove('hidden');
            });
        });
    });
};