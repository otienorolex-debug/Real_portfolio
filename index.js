document.addEventListener("DOMContentLoaded", () => {

  // 1. Profile data
  const profileData = {
    aboutText: "Hi! I am a student at Moringa School pursuing software development. I love crafting structured, performant, and reliable web applications.",
    worksIntroduction: "Here are some of my top interactive applications built with HTML, CSS, and structural JavaScript layouts."
  };

  // 2. Projects data
  const myProjects = [
    {
      title: "Jambo Mall & Shopping Centre",
      description: "A complete localized e-commerce and delivery dashboard featuring live ordering flows, delivery agent tracking models, and M-Pesa on delivery integrations.",
      techStack: "HTML5, CSS, Vanilla JavaScript",
      liveUrl: "https://otienorolex-debug.github.io/E-commerce-and-Delivery-app-web/"
    },
    {
      title: "LedgerCo — Expense & Budget Tracker",
      description: "A multi-currency expense ledger featuring real-time exchange rate conversions, dynamic calculation totals, category-based transaction sorting, and home currency tracking.",
      techStack: "JavaScript (Async / Fetch API), HTML5, Custom CSS",
      liveUrl: "https://otienorolex-debug.github.io/-budget-tracker/"
    },
    {
      title: "Sentinel Link — Ad-Route Integrity Engine",
      description: "A real-time analytical evaluation layout tracking diagnostic pipelines, financial click-through cost leaks, and simulation pipeline failure rates.",
      techStack: "JavaScript (Dynamic Math Matrices), Semantic Structures, CSS Layouts",
      liveUrl: "https://otienorolex-debug.github.io/sentinel/"
    },
    {
      title: "🛡️ Scamfix — Viral Claim & AI Integrity Prototype",
      description: "An open claim-verification hub engineered to trace unverified online screenshots, benchmark headline credibility against authoritative media records, and extract automated contextual indicators.",
      techStack: "Modern Structural Scripting, Real-time Validation Workflows, Responsive UI Layouts",
      liveUrl: "https://otienorolex-debug.github.io/scamfix/"
    }
  ];

  // 3. Inject text
  const aboutParagraph = document.getElementById("about-text");
  const worksIntroParagraph = document.getElementById("my-works");
  if (aboutParagraph) aboutParagraph.textContent = profileData.aboutText;
  if (worksIntroParagraph) worksIntroParagraph.textContent = profileData.worksIntroduction;

  // 4. Render projects (styling lives in styles.css)
  const workContainer = document.querySelector(".my-work");

  if (workContainer) {
    myProjects.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.className = "project-card tilt";

      projectCard.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p><strong>Built With:</strong> <em>${project.techStack}</em></p>
      `;

      const demoBtn = document.createElement("button");
      demoBtn.className = "demo-btn";
      demoBtn.textContent = "💻 View Live Demo Inside Portfolio";
      demoBtn.addEventListener("click", () => openProjectInModal(project.liveUrl));

      projectCard.appendChild(demoBtn);
      workContainer.appendChild(projectCard);
    });
  }

  // 5. Modal
  function openProjectInModal(url) {
    if (document.getElementById("project-demo-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "project-demo-overlay";
    overlay.className = "demo-overlay";

    const closeBtn = document.createElement("button");
    closeBtn.className = "demo-close";
    closeBtn.textContent = "✕ Close Live Window";

    const frame = document.createElement("iframe");
    frame.className = "demo-frame";
    frame.src = url;
    frame.title = "Live project demo";

    const close = () => {
      overlay.remove();
      document.removeEventListener("keydown", onKey);
    };
    const onKey = (e) => { if (e.key === "Escape") close(); };

    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
    document.addEventListener("keydown", onKey);

    overlay.appendChild(closeBtn);
    overlay.appendChild(frame);
    document.body.appendChild(overlay);
    closeBtn.focus();
  }

  // 6. 3D tilt effect (mouse only, skipped if the user prefers reduced motion)
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion) {
    document.querySelectorAll(".tilt").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        if (e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--ry", `${(x - 0.5) * 12}deg`);
        el.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
      });
      el.addEventListener("pointerleave", () => {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      });
    });
  }

  // 7. Navigation
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = {
    home: document.querySelector(".Home-section"),
    about: document.querySelector(".about-me"),
    work: document.querySelector(".my-work"),
    contacts: document.getElementById("footer")
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = link.getAttribute("data-target");
      if (sections[target]) {
        sections[target].scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});