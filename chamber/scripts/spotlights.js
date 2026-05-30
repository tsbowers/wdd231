const spotlightContainer = document.querySelector("#spotlight-cards");
const membersURL = "data/members.json";

async function getSpotlights() {
  try {
    const response = await fetch(membersURL);

    if (!response.ok) {
      throw new Error("Unable to fetch member data.");
    }

    const members = await response.json();

    const qualifiedMembers = members.filter((member) => {
      return member.membership === 2 || member.membership === 3;
    });

    const shuffledMembers = qualifiedMembers.sort(() => Math.random() - 0.5);
    const selectedMembers = shuffledMembers.slice(0, 3);

    displaySpotlights(selectedMembers);
  } catch (error) {
    console.error(error);

    if (spotlightContainer) {
      spotlightContainer.innerHTML = "<p>Member spotlights are currently unavailable.</p>";
    }
  }
}

function displaySpotlights(members) {
  if (!spotlightContainer) {
    return;
  }

  spotlightContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="images/${member.image}" alt="${member.name} logo" width="120" height="120" loading="lazy">
      <p>${member.description}</p>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
      <p class="membership-level">${getMembershipLevel(member.membership)} Member</p>
    `;

    spotlightContainer.appendChild(card);
  });
}

function getMembershipLevel(level) {
  if (level === 3) {
    return "Gold";
  }

  if (level === 2) {
    return "Silver";
  }

  return "Standard";
}

if (spotlightContainer) {
  getSpotlights();
}