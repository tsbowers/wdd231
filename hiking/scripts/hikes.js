const trailContainer = document.querySelector("#trail-cards");
const difficultySelect = document.querySelector("#difficulty");
const sortSelect = document.querySelector("#sort");

const dialog = document.querySelector("#trail-dialog");
const dialogContent = document.querySelector("#dialog-content");
const closeDialog = document.querySelector("#close-dialog");

let trails = [];

async function getTrails() {
    try {
        const response = await fetch("data/hikes.json");

        if (!response.ok) {
            throw new Error("Could not load trails.");
        }

        trails = await response.json();

        displayTrails(trails);
    } catch (error) {
        trailContainer.innerHTML =
            "<p>Trail information unavailable.</p>";

        console.error(error);
    }
}

function displayTrails(trailList) {
    trailContainer.innerHTML = "";

    trailList.forEach((trail) => {
        const card = document.createElement("section");

        card.classList.add("trail-card");

        card.innerHTML = `
            <img
                src="${trail.image}"
                alt="${trail.name}"
                class="trail-image"
                loading="lazy"
                width="600"
                height="338"
            >

            <h3>${trail.name}</h3>

            <p><strong>Location:</strong> ${trail.location}</p>

            <p><strong>Difficulty:</strong> ${trail.difficulty}</p>

            <p><strong>Length:</strong> ${trail.length} miles</p>

            <p><strong>Time:</strong> ${trail.time}</p>

            <button class="details-btn">
                Trail Details
            </button>
        `;

        card
            .querySelector(".details-btn")
            .addEventListener("click", () => {
                showDetails(trail);
            });

        trailContainer.appendChild(card);
    });
}

function showDetails(trail) {
    dialogContent.innerHTML = `
        <h2>${trail.name}</h2>

        <p><strong>Location:</strong> ${trail.location}</p>

        <p><strong>Difficulty:</strong> ${trail.difficulty}</p>

        <p><strong>Length:</strong> ${trail.length} miles</p>

        <p><strong>Type:</strong> ${trail.type}</p>

        <p>${trail.description}</p>
    `;

    dialog.showModal();
}

function filterAndSort() {
    let filtered = [...trails];

    const difficulty = difficultySelect.value;
    const sort = sortSelect.value;

    localStorage.setItem("difficulty", difficulty);
    localStorage.setItem("sort", sort);

    if (difficulty !== "all") {
        filtered = filtered.filter(
            trail => trail.difficulty === difficulty
        );
    }

    if (sort === "shortest") {
        filtered.sort((a, b) => a.length - b.length);
    }

    if (sort === "longest") {
        filtered.sort((a, b) => b.length - a.length);
    }

    displayTrails(filtered);
}

function loadPreferences() {
    const savedDifficulty =
        localStorage.getItem("difficulty");

    const savedSort =
        localStorage.getItem("sort");

    if (savedDifficulty) {
        difficultySelect.value = savedDifficulty;
    }

    if (savedSort) {
        sortSelect.value = savedSort;
    }
}

difficultySelect?.addEventListener(
    "change",
    filterAndSort
);

sortSelect?.addEventListener(
    "change",
    filterAndSort
);

closeDialog?.addEventListener("click", () => {
    dialog.close();
});

loadPreferences();
getTrails();