const body = document.body;
const theme = document.querySelector(".theme");
const menu = document.querySelector(".menu");
const links = document.querySelector(".links");

/* Mode sombre */
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
}

theme?.addEventListener("click", () => {
    body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        body.classList.contains("dark") ? "dark" : "light"
    );
});

/* Menu mobile */
menu?.addEventListener("click", () => {
    links?.classList.toggle("open");
});

document.querySelectorAll(".links a").forEach((link) => {
    link.addEventListener("click", () => {
        links?.classList.remove("open");
    });
});

/* Animations au défilement */
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
});

/* Compteurs */
const formatter = new Intl.NumberFormat("fr-FR");

const countersObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const element = entry.target;
            const target = Number(element.dataset.count);
            const start = performance.now();
            const duration = 1200;

            function animate(time) {
                const progress = Math.min((time - start) / duration, 1);
                const easing = 1 - Math.pow(1 - progress, 3);

                element.textContent = formatter.format(
                    Math.floor(target * easing)
                );

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            }

            requestAnimationFrame(animate);
            countersObserver.unobserve(element);
        });
    },
    { threshold: 0.7 }
);

document.querySelectorAll("[data-count]").forEach((element) => {
    countersObserver.observe(element);
});

/* Lightbox */
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");

function openLightbox(image) {
    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || "Aperçu du projet";

    lightbox.classList.add("show");
    body.classList.add("lightbox-open");
}

function closeLightbox() {
    if (!lightbox || !lightboxImage) return;

    lightbox.classList.remove("show");
    body.classList.remove("lightbox-open");
    lightboxImage.src = "";
}

document.querySelectorAll(".project img").forEach((image) => {
    image.addEventListener("click", () => {
        openLightbox(image);
    });
});

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLightbox();
    }
});