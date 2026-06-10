import discoverItems from "../data/discover.mjs";

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const visitMessage = document.querySelector("#visit-message");
const discoverCards = document.querySelector("#discover-cards");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    menuButton.classList.toggle("open");
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");
    menuButton.setAttribute("aria-expanded", isOpen);
  });
}

function displayVisitMessage() {
  const lastVisit = localStorage.getItem("lastVisit");
  const currentVisit = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const millisecondsBetweenVisits = currentVisit - Number(lastVisit);
    const daysBetweenVisits = Math.floor(millisecondsBetweenVisits / 86400000);

    if (daysBetweenVisits < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysBetweenVisits === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${daysBetweenVisits} days ago.`;
    }
  }

  localStorage.setItem("lastVisit", currentVisit);
}

function buildDiscoverCards(items) {
  if (!discoverCards) {
    return;
  }

  discoverCards.innerHTML = "";

  items.forEach((item, index) => {
    const card = document.createElement("article");
    card.classList.add("discover-card");
    card.style.gridArea = `card${index + 1}`;

    const title = document.createElement("h2");
    title.textContent = item.name;

    const figure = document.createElement("figure");

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.name;
    image.loading = "lazy";
    image.width = 300;
    image.height = 200;

    figure.appendChild(image);

    const address = document.createElement("address");
    address.textContent = item.address;

    const description = document.createElement("p");
    description.textContent = item.description;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Learn More";
    button.setAttribute("aria-label", `Learn more about ${item.name}`);

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);

    discoverCards.appendChild(card);
  });
}

if (visitMessage) {
  displayVisitMessage();
}

buildDiscoverCards(discoverItems);