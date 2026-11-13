const navigationLinks = document.querySelectorAll(".nav-link");
const homeLinks = document.querySelectorAll(".home-button");
const pages = document.querySelectorAll(".page");

function showPage(pageId) {
    pages.forEach((page) => {
        const isActive = page.id === pageId;

        page.classList.toggle("active", isActive);
        page.hidden = !isActive;
    });

    navigationLinks.forEach((link) => {
        const isActive = link.dataset.page === pageId;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}

navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        showPage(link.dataset.page);
        sidebar.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
    });
});

homeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        showPage(link.dataset.page);
    });
});

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");

menuToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("form-status");

contactForm.reset();

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    const submitButton = contactForm.querySelector("button[type='submit']");

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
        const response = await fetch("https://formspree.io/f/xwllynge", {
            method: "POST",
            body: new FormData(contactForm),
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {
            contactForm.reset();
            formStatus.textContent = "Your message has been sent successfully!";
            formStatus.className = "success";
        } else {
            throw new Error("Submission failed");
        }

    } catch (error) {
        formStatus.textContent = "Something went wrong. Please try again.";
        formStatus.className = "error";
    }

    submitButton.disabled = false;
    submitButton.textContent = "Send Message";
});