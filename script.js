const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const projectList = document.querySelector("#project-list");
const projectCards = projectList ? projectList.querySelectorAll(".project-card") : [];
const previousProject = document.querySelector("#project-prev");
const nextProject = document.querySelector("#project-next");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function moveProjects(direction) {
  const firstProject = projectCards[0];
  if (!projectList || !firstProject) return;
  const distance = firstProject.getBoundingClientRect().width + 16;
  projectList.scrollBy({ left: distance * direction, behavior: reduceMotion.matches ? "auto" : "smooth" });
}

previousProject?.addEventListener("click", () => moveProjects(-1));
nextProject?.addEventListener("click", () => moveProjects(1));
