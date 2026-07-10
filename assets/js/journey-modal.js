import journeys from "./data/journey-data.js";

let modal = null;

export function initJourneyModal() {

    modal =
        document.getElementById("journey-modal");

    if (!modal) return;

    document.addEventListener("click", handleCardClick);

    document
        .getElementById("close-journey-modal")
        ?.addEventListener("click", closeJourney);

    document
        .getElementById("journey-modal-overlay")
        ?.addEventListener("click", closeJourney);

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            closeJourney();

        }

    });

}

function handleCardClick(e) {

    const card =
        e.target.closest(".journey-card");

    if (!card) return;

    openJourney(card.dataset.id);

}

function openJourney(id) {

    const journey =
        journeys.find(item => item.id === id);

    if (!journey) return;

    const lang =
        localStorage.getItem("lang") || "en";

    document.getElementById("journey-cover").src =
        journey.image;

    document.getElementById("journey-title").textContent =
        journey.place[lang];

    document.getElementById("journey-location").textContent =
        journey.province[lang];

    document.getElementById("journey-year").textContent =
        journey.year;

    document.getElementById("journey-story").textContent =
        journey.description[lang];

    document.getElementById("journey-gallery").innerHTML =
        journey.gallery
            .map(image => `

                <img
                    src="${image}"
                    class="aspect-square w-full rounded-2xl object-cover transition duration-300 hover:scale-105">

            `)
            .join("");

    document.getElementById("journey-gallery-count").textContent =
        `${journey.gallery.length} ${lang === "id" ? "Foto" : "Photos"}`;

    document.getElementById("journey-info").innerHTML =
        journey.destinations[lang]
            .map(place => `

                <div
                    class="rounded-2xl border border-border bg-background p-5">

                    <div
                        class="flex items-center gap-3">

                        <span class="text-xl">
                            📍
                        </span>

                        <p
                            class="font-medium text-text">

                            ${place}

                        </p>

                    </div>

                </div>

            `)
            .join("");

    document.getElementById("journey-highlights").innerHTML =
        journey.highlights[lang]
            .map(item => `

                <div
                    class="flex items-start gap-3">

                    <span
                        class="mt-1 font-bold text-success">

                        ✓

                    </span>

                    <p
                        class="leading-7 text-subtext">

                        ${item}

                    </p>

                </div>

            `)
            .join("");

    const lessonSection =
        document.getElementById("journey-lessons");

    if (lessonSection) {

        lessonSection.parentElement.classList.add("hidden");

    }

    modal.classList.remove("hidden");

    modal.classList.add("flex");

    document.body.classList.add("overflow-hidden");

}

function closeJourney() {

    if (!modal) return;

    modal.classList.remove("flex");

    modal.classList.add("hidden");

    document.body.classList.remove("overflow-hidden");

}
