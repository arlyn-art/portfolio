import featured from "./data/featured.js";
import projects from "./data/projects.js";

let featuredData = null;

function getProject(projectId) {
    return projects.find(project => project.id === projectId);
}

function renderFeaturedProjects() {

    const section = document.getElementById(
        "featured-projects-section"
    );

    if (!section) return;

    section.innerHTML = `
        <section class="py-12 bg-background">

            <div class="container mx-auto px-6">

                ${renderSectionTitle(featuredData)}

                ${renderHero(featuredData.hero)}

                <div
                    id="featured-project-grid"
                    class="mt-12 grid gap-8 lg:grid-cols-3">

                    ${featuredData.projects
                        .map(renderProjectCard)
                        .join("")}

                </div>

            </div>

        </section>
    `;

}

function buildFeaturedData() {

    const heroProject = getProject(featured.hero.projectId);

    const featuredProjects = featured.projects
        .map(item => ({
            ...item,
            project: getProject(item.projectId)
        }))
        .filter(item => item.project);

    return {

        title: featured.title,

        subtitle: featured.subtitle,

        hero: {
            ...heroProject,
            badge: featured.hero.badge,
            headline: featured.hero.headline,
            description: featured.hero.description,
            status: featured.hero.status
        },

        projects: featuredProjects

    };

}

function renderSectionTitle(data) {

    const lang = localStorage.getItem("lang") || "en";

    return `
        <div class="text-center max-w-3xl mx-auto">

            <p class="text-accent font-semibold tracking-[0.25em] uppercase">
                ${data.title[lang]}
            </p>

            <h2 class="mt-4 text-xl md:text-2xl font-black text-text leading-tight">
                ${data.subtitle[lang]}
            </h2>

        </div>
    `;

}

function renderHero(hero) {

    const lang = localStorage.getItem("lang") || "en";

    const technologies = hero.technologies
        .slice(0, 5)
        .map(tech => `
            <span class="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium">
                ${tech}
            </span>
        `)
        .join("");

    const statusColor = {
        development: "bg-amber-500",
        live: "bg-green-500",
        completed: "bg-blue-500"
    };

    return `
    <div class="mt-20">
        <div class="overflow-hidden rounded-[32px] border border-border bg-surface">
            <div class="grid lg:grid-cols-2">
                <!-- IMAGE -->
                <div class="relative">
                    <img
                        src="${hero.thumbnail}"
                        alt="${hero.title[lang]}"
                        class="h-full w-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent"></div>
                    <div class="absolute left-6 top-6">
                        <span class="${statusColor[hero.status] || "bg-accent"} rounded-full px-4 py-2 text-xs font-semibold text-white">
                            ${hero.badge[lang]}
                        </span>
                    </div>
                </div>
                <!-- CONTENT -->
                <div class="flex flex-col justify-center p-10 lg:p-14">
                    <p class="text-accent font-semibold uppercase tracking-[0.2em]">
                        ${hero.company}
                    </p>
                    <h3 class="mt-4 text-4xl font-black leading-tight text-text">
                        ${hero.title[lang]}
                    </h3>
                    <p class="mt-6 text-xl leading-8 text-text">
                        ${hero.headline[lang]}
                    </p>
                    <p class="mt-6 leading-8 text-subtext">
                        ${hero.description[lang]}
                    </p>
                    <div class="mt-8 flex flex-wrap gap-3">
                        ${technologies}
                    </div>
                    <div class="mt-10 flex flex-wrap gap-4">
                        ${hero.liveUrl ? `
                            <a
                                href="${hero.liveUrl}"
                                target="_blank"
                                class="rounded-xl bg-accent px-6 py-4 font-semibold text-white transition hover:-translate-y-1">
                                Live Demo
                            </a>
                        ` : ""}
                        ${hero.github ? `
                            <a
                                href="${hero.github}"
                                target="_blank"
                                class="rounded-xl border border-border bg-background px-6 py-4 font-semibold transition hover:border-accent">
                                GitHub
                            </a>
                        ` : ""}

                    </div>
                </div>
            </div>
        </div>
    </div>
`;

}

function renderProjectCard(item) {

    const lang = localStorage.getItem("lang") || "en";
    const project = item.project;
    const technologies = project.technologies
        .slice(0, 3)
        .map(tech => `
            <span class="rounded-full border border-border bg-background px-3 py-1 text-xs">
                ${tech}
            </span>
        `)
        .join("");
    return `

<div
    class="group overflow-hidden rounded-3xl border border-border bg-surface transition hover:-translate-y-2 hover:border-accent">
    <div class="relative overflow-hidden">
        <img
            src="${project.thumbnail}"
            alt="${project.title[lang]}"
            class="h-56 w-full object-cover transition duration-700 group-hover:scale-110">
        <div
            class="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 transition duration-500 group-hover:opacity-100">
        </div>
        <div
            class="absolute left-4 top-4">
            <span
                class="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                ${item.badge[lang]}
            </span>
        </div>
        <div
            class="absolute bottom-5 left-5 right-5 opacity-0 transition duration-500 group-hover:opacity-100">
        </div>
    </div>
    <div class="p-6">
        <p class="text-xs uppercase tracking-[0.18em] text-accent font-semibold">
            ${project.company}
        </p>
        <h3 class="mt-3 text-xl font-bold text-text">
            ${project.title[lang]}
        </h3>
        <p class="mt-4 line-clamp-3 leading-7 text-subtext">
            ${project.shortDescription[lang]}
        </p>
        <div class="mt-6 flex flex-wrap gap-2">
            ${technologies}
        </div>

    </div>
</div>
`;

}

export function initFeaturedProjects() {

    const section = document.getElementById(
        "featured-projects-section"
    );

    if (!section) return;

    featuredData = buildFeaturedData();

    renderFeaturedProjects();

    document
        .querySelectorAll(".lang-btn, [data-lang]")
        .forEach(button => {

            button.addEventListener("click", () => {

                setTimeout(() => {

                    renderFeaturedProjects();

                }, 50);

            });

        });

}