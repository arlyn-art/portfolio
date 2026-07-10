import profileImages from "./data/profile-images.js";

let current = 0;
let cards;
let counter;

let startX = 0;
let currentX = 0;
let isDragging = false;
let activeCard = null;

const swipeThreshold = 100; 

export function initProfile() {
    cards = document.querySelectorAll(".photo-card");
    counter = document.getElementById("profile-counter");

    if (!cards.length) return;

    update();

    document.getElementById("profile-next")?.addEventListener("click", next);
    document.getElementById("profile-prev")?.addEventListener("click", prev);

    const photoStack = document.querySelector(".photo-stack");
    if (photoStack) {
        photoStack.addEventListener("mousedown", dragStart);
        window.addEventListener("mousemove", dragMove);
        window.addEventListener("mouseup", dragEnd);

        photoStack.addEventListener("touchstart", dragStart, { passive: true });
        window.addEventListener("touchmove", dragMove, { passive: false });
        window.addEventListener("touchend", dragEnd);
        
        photoStack.querySelectorAll("img").forEach(img => {
            img.addEventListener("dragstart", (e) => e.preventDefault());
        });
    }
}

function dragStart(e) {
    isDragging = true;
    
    activeCard = document.querySelector(".photo-card.active");
    if (activeCard) {
        activeCard.style.transition = "none"; // Matikan transisi agar responsif saat ditarik
    }

    startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
}

function dragMove(e) {
    if (!isDragging || !activeCard) return;

    currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    
    const translateX = currentX - startX;

    const rotate = translateX * 0.05; 

    activeCard.style.transform = `translateX(${translateX}px) rotate(${rotate}deg)`;
}

function dragEnd() {
    if (!isDragging || !activeCard) return;
    isDragging = false;

    activeCard.style.transition = "transform 0.4s ease, opacity 0.4s ease";

    const totalDistance = currentX - startX;

    if (totalDistance < -swipeThreshold) {
        next();
    } 
    else if (totalDistance > swipeThreshold) {
        prev();
    } 
    else {
        activeCard.style.transform = "";
    }

    startX = 0;
    currentX = 0;
    activeCard = null;
}

function next() {
    current++;
    if (current >= profileImages.length) {
        current = 0;
    }
    update();
}

function prev() {
    current--;
    if (current < 0) {
        current = profileImages.length - 1;
    }
    update();
}

function update() {
    const total = profileImages.length;

    const first = current;
    const second = (current + 1) % total;
    const third = (current + 2) % total;

    cards.forEach(card => {
        card.style.transform = "";
        card.style.transition = "";
    });

    setCard(cards[0], profileImages[first], 1);
    setCard(cards[1], profileImages[second], 2);
    setCard(cards[2], profileImages[third], 3);

    if (counter) {
        counter.textContent =
            `${String(current + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
    }
}

function setCard(card, image, order) {
    const img = card.querySelector("img");
    if (!img) return;

    img.src = image.image;
    img.alt = image.title;

    card.classList.remove(
        "photo-card-1",
        "photo-card-2",
        "photo-card-3",
        "active"
    );

    card.classList.add(`photo-card-${order}`);

    if (order === 1) {
        card.classList.add("active");
    }
}