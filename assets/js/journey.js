import journeys from "./data/journey-data.js";

export function initJourney() {

    renderJourney();

}

function renderJourney() {

    const container =
        document.getElementById("journey-container");

    if (!container) return;

    const lang =
        localStorage.getItem("lang") || "en";

    container.innerHTML = "";

    journeys.forEach(item => {

        container.insertAdjacentHTML(
            "beforeend",
            createCard(item, lang)
        );

    });

}

function createCard(item, lang) {

    return `

        <article
            class="journey-card group cursor-pointer overflow-hidden rounded-3xl border border-border bg-surface transition duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-xl"
            data-id="${item.id}">

            <div class="overflow-hidden">

                <img
                    src="${item.image}"
                    alt="${item.place[lang]}"
                    class="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105">

            </div>

            <div class="p-7">

                <div class="flex items-center justify-between">

                    <h3
                        class="text-xl font-bold text-text">

                        ${item.place[lang]}

                    </h3>

                    <span
                        class="rounded-full border border-border bg-background px-3 py-1 text-xs">

                        ${item.year}

                    </span>

                </div>

                <p
                    class="mt-2 text-accent">

                    ${item.province[lang]}

                </p>

                <p
                    class="mt-5 line-clamp-3 leading-7 text-subtext">

                    ${item.shortDescription[lang]}

                </p>

                <div
                    class="mt-6 flex items-center justify-between">

                    <span
                        class="text-sm font-medium text-accent">

                        ${lang === "id"
                            ? "Lihat Perjalanan →"
                            : "View Journey →"}

                    </span>

                    <span
                        class="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">

                        ${item.gallery.length}
                        ${lang === "id"
                            ? "Foto"
                            : "Photos"}

                    </span>

                </div>

            </div>

        </article>

    `;

}