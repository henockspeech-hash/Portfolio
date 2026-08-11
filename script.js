const hiddenElements = document.querySelectorAll(".hidden");
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    });

    hiddenElements.forEach((element) => {
        observer.observe(element);
    });
} else {
    hiddenElements.forEach((element) => element.classList.add("show"));
}

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    const closeMenu = () => {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Ouvrir le menu");
    };

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });
}

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get("nom").trim();
        const email = formData.get("email").trim();
        const subject = formData.get("sujet").trim() || "Demande depuis le portfolio";
        const message = formData.get("message").trim();
        const emailBody = `Bonjour Henock,\n\nJe m'appelle ${name}.\nMon adresse e-mail : ${email}\n\n${message}`;
        const emailUrl = `mailto:henockspeech@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

        window.location.href = emailUrl;
    });
}
