import projects from "./data/projects.js";

let modal;

export function initProjectModal() {
    modal = document.getElementById("project-modal");

    if (!modal) {
        console.error("Elemen modal tidak ditemukan!");
        return;
    }

    document.addEventListener("click", (e) => {
        const card = e.target.closest(".project-card");
        if (!card) return;
        
        const id = card.dataset.id; 
        openProject(id);
    });

    document
        .getElementById("close-project-modal")
        ?.addEventListener("click", closeProject);

    document
        .getElementById("project-modal-overlay")
        ?.addEventListener("click", closeProject);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeProject();
        }
    });
}

function openProject(id) {
    const project = projects.find(item => item.id === id);
    if (!project) return;

    const lang = localStorage.getItem('lang') || 'en';

    document.getElementById("modal-image").src = project.thumbnail;
    document.getElementById("modal-title").textContent = project.title[lang];
    document.getElementById("modal-company").textContent = project.company;
    document.getElementById("modal-category").textContent = capitalize(project.category);
    document.getElementById("modal-description").textContent = project.description[lang];

    document.getElementById("modal-tech").innerHTML = project.technologies
        .map(item => `<span class="rounded-full border border-border bg-background px-4 py-2 text-sm">${item}</span>`)
        .join("");

    document.getElementById("modal-features").innerHTML = project.features[lang]
        .map(item => `
            <div class="flex gap-3">
                <span class="text-success font-bold">✓</span>
                <p class="text-subtext">${item}</p>
            </div>
        `)
        .join("");

    document.getElementById("modal-responsibilities").innerHTML = project.responsibilities[lang]
        .map(item => `
            <div class="flex gap-3">
                <span class="text-accent font-bold">•</span>
                <p class="text-subtext">${item}</p>
            </div>
        `)
        .join("");

    const live = document.getElementById("modal-live");

    if (project.category === "documentation") {
        live.classList.remove("hidden");
        live.removeAttribute("href");
        
        live.className = "flex-1 text-center rounded-xl bg-neutral-500/10 text-neutral-400 border border-border px-6 py-4 font-semibold cursor-not-allowed text-sm md:text-base";
        
        live.textContent = lang === "id" ? "Dokumen Internal (Lindungan NDA)" : "Confidential Document (NDA Protected)";

    } else if (project.liveUrl) {
        live.href = project.liveUrl;
        live.classList.remove("hidden");
        live.className = "flex-1 text-center rounded-xl bg-accent px-6 py-4 font-semibold text-white transition hover:-translate-y-1 cursor-pointer text-sm md:text-base";
        live.textContent = lang === "id" ? "Lihat Website" : "Live Website";
    } else {
        live.classList.add("hidden");
    }

    const github = document.getElementById("modal-github");

    if (project.github) {
        github.href = project.github;
        github.classList.remove("hidden");
    } else {
        github.classList.add("hidden");
    }

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.classList.add("overflow-hidden"); 
}

function closeProject() {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden"); 
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}