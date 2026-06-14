const menuButton = document.querySelector("#menu-button");
const siteNav = document.querySelector("#site-nav");

if (menuButton) {
    menuButton.addEventListener("click", () => {
        siteNav.classList.toggle("open");
    });
}

const featuredContainer = document.querySelector("#featured-hike");

async function loadFeaturedHike() {
    if (!featuredContainer) return;

    try {
        const response = await fetch("data/hikes.json");

        if (!response.ok) {
            throw new Error("Unable to load hike data.");
        }

        const hikes = await response.json();

        const dayNumber = new Date().getDate();
        const hike = hikes[dayNumber % hikes.length];

        featuredContainer.innerHTML = `
            <img
                src="${hike.image}"
                alt="${hike.name}"
                class="featured-image"
                loading="lazy"
                width="800"
                height="500"
            >

            <h3>${hike.name}</h3>

            <p><strong>Location:</strong> ${hike.location}</p>

            <p><strong>Difficulty:</strong> ${hike.difficulty}</p>

            <p><strong>Length:</strong> ${hike.length} miles</p>

            <p>${hike.description}</p>
        `;
    } catch (error) {
        featuredContainer.innerHTML =
            "<p>Featured hike unavailable.</p>";

        console.error(error);
    }
}

loadFeaturedHike();