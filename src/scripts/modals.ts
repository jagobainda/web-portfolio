import { animateModalOpen, animateModalClose } from "./animations";

let isTransitioning = false;
let lastFocused: HTMLElement | null = null;

const FOCUSABLE_SELECTOR = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
].join(",");

export const initModals = (): void => {
    document.querySelectorAll(".close-btn").forEach(btn => {
        btn.addEventListener("click", () => closeModal());
    });

    document.querySelectorAll(".modal").forEach(modal => {
        modal.addEventListener("click", e => {
            if (e.target === modal) closeModal();
        });
    });

    document.removeEventListener("keydown", trapFocus);
    document.addEventListener("keydown", trapFocus);

    window.removeEventListener("popstate", handleHashChange);
    window.addEventListener("popstate", handleHashChange);

    window.removeEventListener("hashchange", handleHashChange);
    window.addEventListener("hashchange", handleHashChange);

    checkInitialHash();
};

const getFocusableElements = (modal: Element): HTMLElement[] =>
    Array.from(modal.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        el => el.offsetParent !== null || el === document.activeElement,
    );

const trapFocus = (e: KeyboardEvent): void => {
    if (e.key !== "Tab") return;

    const modal = document.querySelector(".modal:not(.hidden)");
    if (!modal) return;

    const focusables = getFocusableElements(modal);
    if (focusables.length === 0) {
        e.preventDefault();
        return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (e.shiftKey) {
        if (active === first || !modal.contains(active)) {
            e.preventDefault();
            last.focus();
        }
    } else if (active === last || !modal.contains(active)) {
        e.preventDefault();
        first.focus();
    }
};

const focusModalContent = (modal: Element): void => {
    const content = modal.querySelector(".modal-content") as HTMLElement | null;
    content?.focus();
};

export const openModal = (id: string): void => {
    if (isTransitioning) return;

    const modal = document.getElementById(`modal-${id}`);
    if (!modal) return;

    lastFocused = document.activeElement as HTMLElement | null;

    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");

    const content = modal.querySelector(".modal-content") as HTMLElement;
    if (content) animateModalOpen(content);

    initTabsInModal(modal);
    focusModalContent(modal);

    history.pushState({ modal: id }, "", `#${id}`);
};

export const closeModal = (skipHistory = false, callback?: () => void): void => {
    const modal = document.querySelector(".modal:not(.hidden)");
    if (!modal) {
        callback?.();
        return;
    }

    const content = modal.querySelector(".modal-content") as HTMLElement;
    if (!content) {
        callback?.();
        return;
    }

    isTransitioning = true;

    animateModalClose(content, () => {
        modal.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");

        if (location.hash && !skipHistory) history.back();

        isTransitioning = false;

        if (callback) {
            setTimeout(callback, 50);
        } else {
            lastFocused?.focus();
            lastFocused = null;
        }
    });
};

export const handleModalShortcut = (modalId: string): void => {
    const currentModal = document.querySelector(".modal:not(.hidden)");

    if (!currentModal) {
        openModal(modalId);
        return;
    }

    const currentModalId = currentModal.id.replace("modal-", "");

    if (currentModalId === modalId) {
        closeModal();
        return;
    }

    closeModal(false, () => openModal(modalId));
};

const initTabsInModal = (modal: Element): void => {
    const tabContainers = modal.querySelectorAll("[data-tabs]");

    tabContainers.forEach(container => {
        container.querySelectorAll(".tab-btn").forEach(btn => {
            btn.parentNode?.replaceChild(btn.cloneNode(true), btn);
        });

        const buttons = Array.from(container.querySelectorAll<HTMLElement>(".tab-btn"));
        const panels = Array.from(container.querySelectorAll<HTMLElement>(".tab-panel"));

        const activate = (btn: HTMLElement): void => {
            const targetId = btn.getAttribute("data-target");
            if (!targetId) return;

            buttons.forEach(b => {
                const selected = b === btn;
                b.classList.toggle("active", selected);
                b.setAttribute("aria-selected", String(selected));
                b.setAttribute("tabindex", selected ? "0" : "-1");
            });

            panels.forEach(p => p.classList.add("hidden"));
            document.getElementById(targetId)?.classList.remove("hidden");
        };

        buttons.forEach((btn, index) => {
            btn.addEventListener("click", () => activate(btn));

            btn.addEventListener("keydown", e => {
                let next = -1;

                switch (e.key) {
                    case "ArrowRight":
                    case "ArrowDown":
                        next = (index + 1) % buttons.length;
                        break;
                    case "ArrowLeft":
                    case "ArrowUp":
                        next = (index - 1 + buttons.length) % buttons.length;
                        break;
                    case "Home":
                        next = 0;
                        break;
                    case "End":
                        next = buttons.length - 1;
                        break;
                    default:
                        return;
                }

                e.preventDefault();
                const target = buttons[next];
                activate(target);
                target.focus();
            });
        });
    });
};

const checkInitialHash = (): void => {
    const hash = location.hash.slice(1);

    if (!hash) return;

    const modalId = hash;
    const modal = document.getElementById(`modal-${modalId}`);

    if (modal) openModalWithoutHistory(modalId);
};

const handleHashChange = (): void => {
    const hash = location.hash.slice(1);
    const openModal = document.querySelector(".modal:not(.hidden)");

    if (!hash) {
        if (openModal) closeModal(true);
        return;
    }

    const modalId = hash;
    const targetModal = document.getElementById(`modal-${modalId}`);

    if (targetModal && !targetModal.classList.contains("hidden")) return;

    if (openModal) {
        closeModal(true, () => openModalWithoutHistory(modalId));
    } else {
        openModalWithoutHistory(modalId);
    }
};

const openModalWithoutHistory = (id: string): void => {
    if (isTransitioning) return;

    const modal = document.getElementById(`modal-${id}`);
    if (!modal) return;

    lastFocused = document.activeElement as HTMLElement | null;

    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");

    const content = modal.querySelector(".modal-content") as HTMLElement;
    if (content) animateModalOpen(content);

    initTabsInModal(modal);
    focusModalContent(modal);
};
