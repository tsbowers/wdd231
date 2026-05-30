const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuButton.classList.toggle("open");
  });
}

const membersContainer = document.querySelector("#members");

async function getMembers() {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error("Could not load members.json");
    }

    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error(error);

    if (membersContainer) {
      membersContainer.innerHTML = "<p>Member information could not be loaded.</p>";
    }
  }
}

function displayMembers(members) {
  if (!membersContainer) {
    return;
  }

  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    const image = document.createElement("img");
    const name = document.createElement("h2");
    const address = document.createElement("p");
    const phone = document.createElement("p");
    const website = document.createElement("a");
    const membership = document.createElement("p");
    const description = document.createElement("p");

    image.src = `images/${member.image}`;
    image.alt = `${member.name} logo`;
    image.loading = "lazy";
    image.width = 200;
    image.height = 120;

    name.textContent = member.name;
    address.textContent = member.address;
    phone.textContent = member.phone;

    website.href = member.website;
    website.target = "_blank";
    website.rel = "noopener";
    website.textContent = "Visit Website";

    membership.textContent = `Membership Level: ${member.membership}`;
    description.textContent = member.description;

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);
    card.appendChild(membership);
    card.appendChild(description);

    membersContainer.appendChild(card);
  });
}

if (membersContainer) {
  getMembers();
}

const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

if (gridButton && listButton && membersContainer) {
  gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
  });

  listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
  });
}