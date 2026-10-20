const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const estimateForm = document.querySelector("#estimate-form");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && siteNav) {
  const menuLabel = menuToggle.querySelector(".sr-only");

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    siteNav.classList.toggle("is-open", !isExpanded);
    if (menuLabel) {
      menuLabel.textContent = isExpanded ? "Open navigation" : "Close navigation";
    }
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
      if (menuLabel) {
        menuLabel.textContent = "Open navigation";
      }
    }
  });
}

if (estimateForm) {
  estimateForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!estimateForm.reportValidity()) {
      return;
    }

    const formData = new FormData(estimateForm);
    const subject = `Junk removal request from ${formData.get("name")}`;
    const body = [
      `Name: ${formData.get("name")}`,
      `Phone or email: ${formData.get("contact")}`,
      `Project: ${formData.get("project")}`,
      `Details: ${formData.get("message") || "None provided"}`
    ].join("\n");

    window.location.href = `mailto:hello@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
