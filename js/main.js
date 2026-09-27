const PROJECTS = {
  aula: {
    title: "Aula Abierta",
    visual: "learning",
    image: "img/guios_pro/guios_pro_1.png",
    metric: "12",
    metricLabel: "rutas activas",
    description: "Plataforma académica accesible para descubrir, guardar y seguir rutas de aprendizaje.",
    problem: "Reduce el tiempo de evaluación y facilita el acceso a rutas de aprendizaje relevantes.",
    technologies: ["HTML", "CSS Grid", "JavaScript", "LocalStorage", "python", "Django"],
    live: "https://pages.github.com/",
    repo: "https://github.com/tuusuario/aula-abierta",
  },
  verde: {
    title: "Memoria de cartas",
    visual: "memory",
    image: "img/juego de cartas/juego-cartas-1.jpg",
    metric: "12s",
    metricLabel: "tiempo medio",
    description: "Juego de memoria con cartas para entrenar la atencion y la retencion visual.",
    problem: "Diseña una experiencia divertida y desafiante que combine rapidez, memoria y detalle visual en una sola mecánica.",
    technologies: ["HTML", "CSS", "JavaScript", "DOM"],
    live: "https://pages.github.com/",
    repo: "https://github.com/juliojimenez200/juego-de-cartas.git",

  },
  banano: {
    title: "Banano IA",
    visual: "banano",
    image: "img/banano-ia/banana-ia-1.png",
    metric: "98%",
    metricLabel: "detección precisa",
    description: "Aplicación con Django e IA para detectar enfermedades en plantaciones de banano.",
    problem: "Ayuda a los productores a identificar plagas y enfermedades de manera temprana para reducir pérdidas y mejorar la salud del cultivo.",
    technologies: ["Python", "Django", "IA", "OpenCV"],
    repo: "https://github.com/juliojimenez200/proyecto-final.git",

  }
};

const root = document.documentElement;
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark" || savedTheme === "light") {
  root.dataset.theme = savedTheme;
}

const menuButton = document.querySelector(".js-menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeButton = document.querySelector(".js-theme-toggle");
const backTopButton = document.querySelector(".js-back-top");
const contactForm = document.querySelector(".js-contact-form");
const formStatus = document.querySelector(".js-form-status");
const modal = document.querySelector(".js-modal");
const modalClose = document.querySelector(".js-modal-close");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector(".js-modal-description");
const modalProblem = document.querySelector(".js-modal-problem");
const modalTags = document.querySelector(".js-modal-tags");
const modalVisual = document.querySelector(".js-modal-visual");
const modalLive = document.querySelector(".js-modal-live");
const modalRepo = document.querySelector(".js-modal-repo");

function projectVisual(project) {
  if (project.visual === "memory") {
    return `
      <img class="project-image optional-image" src="img/juego de cartas/juego-cartas-1.jpg" alt="Captura del juego de memoria de cartas" />
      <img class="project-image optional-image second-image" src="img/juego de cartas/juego-cartas-2.jpg" alt="Captura adicional del juego de memoria de cartas" />
    `;
  }

  if (project.visual === "banano") {
    return `
      <img class="project-image optional-image" src="img/banano-ia/banana-ia-3.png" alt="Vista previa de la app de diagnóstico del banano" />
      <img class="project-image optional-image" src="img/banano-ia/banana-ia-1.png" alt="Dashboard de detección de enfermedades en banano" />
      <img class="project-image optional-image second-image" src="img/banano-ia/banana-ia-2.png" alt="Landing page de la app de diagnóstico del banano" />
      
    `;
  }

  if (project.visual === "learning") {
    return `
      <img class="project-image optional-image" src="img/guios_pro/guios_pro_1.png" alt="Captura principal de Aula Abierta" />
      <img class="project-image optional-image second-image" src="img/guios_pro/guios_pro_2.png" alt="Segunda captura de Aula Abierta" />
      <img class="project-image optional-image" src="img/guios_pro/guios_pro_3.png" alt="Tercera captura de Aula Abierta" />
    `;
  }

  return `
    <img class="project-image optional-image" src="${project.image}" alt="Captura del proyecto ${project.title}" />
    <div class="mock-window">
      <div class="mock-bar"></div>
      <div class="mock-body">
        <div class="mock-sidebar"></div>
        <div class="mock-content">
          <span>${project.metric}</span>
          <small>${project.metricLabel}</small>
          <div class="mock-chart"><span></span><span></span><span></span><span></span><span></span></div>
        </div>
      </div>
    </div>
  `;
}

function setupOptionalImages(scope = document) {
  scope.querySelectorAll(".optional-image").forEach((image) => {
    const hideImage = () => {
      image.classList.add("is-hidden");
      image.closest(".project-visual")?.classList.remove("has-image");
    };

    const showImage = () => {
      image.classList.remove("is-hidden");
      image.closest(".project-visual")?.classList.add("has-image");
    };

    image.addEventListener("error", hideImage, { once: true });
    image.addEventListener("load", showImage, { once: true });

    if (image.complete) {
      if (image.naturalWidth > 0) showImage();
      else hideImage();
    }
  });
}

function closeMenu() {
  if (!menuButton || !navLinks) return;
  navLinks.classList.remove("open");
  menuButton.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
  document.body.classList.remove("menu-open");
}

function updateThemeButton(theme) {
  if (!themeButton) return;
  const nextTheme = theme === "light" ? "oscuro" : "claro";
  themeButton.setAttribute("aria-label", `Cambiar a tema ${nextTheme}`);
}

function toggleTheme() {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = nextTheme;
  localStorage.setItem("portfolio-theme", nextTheme);
  updateThemeButton(nextTheme);
}

function openModal(projectId) {
  const project = PROJECTS[projectId];
  if (!project || !modal) return;

  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalProblem.textContent = project.problem;
  modalTags.innerHTML = project.technologies.map((tech) => `<span>${tech}</span>`).join("");
  modalVisual.className = `project-visual js-modal-visual ${project.visual}`;
  modalVisual.innerHTML = projectVisual(project);
  setupOptionalImages(modalVisual);

  if (modalLive) {
    modalLive.href = project.live || "#";
  }

  if (modalRepo) {
    modalRepo.href = project.repo || "#";
  }

  modal.hidden = false;
  document.body.classList.add("modal-open");
  modalClose.focus();
}

function closeModal() {
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

function validateContactForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const fields = [...form.querySelectorAll("input, textarea")];
  const invalidField = fields.find((field) => !field.checkValidity());

  fields.forEach((field) => field.classList.toggle("field-error", !field.checkValidity()));

  if (invalidField) {
    formStatus.textContent = "Revisa los campos indicados antes de enviar.";
    formStatus.classList.remove("success");
    invalidField.focus();
    return;
  }

  formStatus.textContent = "Gracias. Tu mensaje fue validado correctamente.";
  formStatus.classList.add("success");
  form.reset();
  fields.forEach((field) => field.classList.remove("field-error"));
}

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Cerrar menu" : "Abrir menu");
    document.body.classList.toggle("menu-open", isOpen);
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.matches("a")) closeMenu();
  });
}

if (themeButton) {
  updateThemeButton(root.dataset.theme || "light");
  themeButton.addEventListener("click", toggleTheme);
}

setupOptionalImages();

document.querySelectorAll(".js-filter").forEach((filterButton) => {
  filterButton.addEventListener("click", () => {
    const filter = filterButton.dataset.filter;
    document.querySelectorAll(".js-filter").forEach((button) => {
      button.classList.toggle("active", button === filterButton);
    });
    document.querySelectorAll(".project-card[data-category]").forEach((card) => {
      const shouldShow = filter === "Todos" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

document.querySelectorAll(".js-project-open").forEach((button) => {
  button.addEventListener("click", () => openModal(button.dataset.project));
});

if (modal && modalClose) {
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeModal();
  }
});

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", validateContactForm);
  contactForm.addEventListener("input", (event) => {
    if (event.target.matches("input, textarea")) {
      event.target.classList.remove("field-error");
    }
  });
}

if (backTopButton) {
  window.addEventListener("scroll", () => {
    backTopButton.classList.toggle("visible", window.scrollY > 600);
  });

  backTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
