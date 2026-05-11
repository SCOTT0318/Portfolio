document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("mediaModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalImage = document.getElementById("modalImage");
    const modalVideo = document.getElementById("modalVideo");
    const closeButton = document.querySelector(".close");
    const galleryItems = document.querySelectorAll(".gallery-item");
    let lastFocusedElement = null;

    if (!modal || !modalTitle || !modalImage || !modalVideo || !closeButton) {
        return;
    }

    const getCaption = (item) => {
        const figure = item.closest("figure");
        const caption = figure ? figure.querySelector("figcaption") : null;
        return caption ? caption.textContent.trim() : "프로젝트 미디어";
    };

    const resetMedia = () => {
        modalImage.hidden = true;
        modalImage.removeAttribute("src");
        modalImage.alt = "";

        modalVideo.pause();
        modalVideo.hidden = true;
        modalVideo.removeAttribute("src");
        modalVideo.load();
    };

    const openModal = (item) => {
        const isImage = item.tagName.toLowerCase() === "img";
        const caption = getCaption(item);
        lastFocusedElement = document.activeElement;

        resetMedia();
        modalTitle.textContent = caption;

        if (isImage) {
            modalImage.src = item.currentSrc || item.src;
            modalImage.alt = item.alt || caption;
            modalImage.hidden = false;
        } else {
            const source = item.querySelector("source");
            modalVideo.src = source ? source.src : item.currentSrc;
            modalVideo.hidden = false;
            modalVideo.load();
            modalVideo.play().catch(() => {});
        }

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        closeButton.focus();
    };

    const closeModal = () => {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
        resetMedia();

        if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
            lastFocusedElement.focus();
        }
    };

    galleryItems.forEach((item) => {
        item.setAttribute("tabindex", "0");
        item.setAttribute("role", "button");
        item.setAttribute("aria-label", `${getCaption(item)} 크게 보기`);

        item.addEventListener("click", () => openModal(item));
        item.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openModal(item);
            }
        });
    });

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("is-open")) {
            closeModal();
        }
    });
});
