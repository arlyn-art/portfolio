import projects from "./data/projects.js";

let currentCategory = "commercial";

export function initProjects(options = {}) {

    const {
        limit = null
    } = options;

    renderProjects(currentCategory, limit);

    const buttons = document.querySelectorAll(".project-tab");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(item => {
                item.classList.remove("bg-accent", "text-white");
                item.classList.add("text-subtext");
            });

            button.classList.add("bg-accent", "text-white");
            button.classList.remove("text-subtext");

            currentCategory = button.dataset.project;

            renderProjects(currentCategory, limit);

        });

    });

    document.querySelectorAll(".lang-btn, [data-lang]").forEach(langButton => {

        langButton.addEventListener("click", () => {

            setTimeout(() => {

                renderProjects(currentCategory, limit);

            }, 50);

        });

    });

}

function renderProjects(category, limit = null) {

    const container = document.getElementById("projects-container");

    if (!container) return;

    const currentLang = localStorage.getItem("lang") || "en";

    let filteredProjects = projects
        .filter(project => project.category === category)
        .sort((a, b) => {

            const aId = Number(a.id.split("-").pop());
            const bId = Number(b.id.split("-").pop());

            return bId - aId;

        });

    if (limit !== null) {
        filteredProjects = filteredProjects.slice(0, limit);
    }

    container.innerHTML = filteredProjects
        .map(project => createCard(project, currentLang))
        .join("");

}

function createCard(project, lang) {

    return `
    <div class="project-card group overflow-hidden rounded-3xl border border-border bg-surface transition duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-xl cursor-pointer"
        data-id="${project.id}">

        <div class="overflow-hidden">
            <img
                src="${project.thumbnail}"
                alt="${project.title[lang]}"
                class="aspect-video w-full object-cover transition duration-500 group-hover:scale-105">
        </div>

        <div class="p-8">

            <div class="flex items-start justify-between gap-6">

                <div>

                    <p class="text-sm font-medium text-accent">
                        ${project.company}
                    </p>

                    <h3 class="mt-2 text-2xl font-bold text-text">
                        ${project.title[lang]}
                    </h3>

                </div>

                <span class="rounded-full border border-border bg-background px-4 py-2 text-sm">
                    ↗
                </span>

            </div>

            <p class="mt-5 leading-7 text-subtext">
                ${project.shortDescription[lang]}
            </p>

            <div class="mt-8 flex flex-wrap gap-3">

                ${project.technologies
                    .slice(0, 5)
                    .map(item => `
                        <span class="rounded-full border border-border bg-background px-4 py-2 text-sm">
                            ${item}
                        </span>
                    `)
                    .join("")}

            </div>

        </div>

    </div>
    `;

}