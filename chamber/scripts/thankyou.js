const currentYear = document.querySelector("#currentyear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    menuButton.classList.toggle("open");
    navigation.classList.toggle("open");
  });
}

const params = new URLSearchParams(window.location.search);

const first = params.get("first") || "Not provided";
const last = params.get("last") || "Not provided";
const email = params.get("email") || "Not provided";
const phone = params.get("phone") || "Not provided";
const organization = params.get("organization") || "Not provided";
const timestamp = params.get("timestamp") || "Not provided";

const results = document.querySelector("#results");

if (results) {
  results.innerHTML = `
    <p><strong>First Name:</strong> ${first}</p>
    <p><strong>Last Name:</strong> ${last}</p>
    <p><strong>Email Address:</strong> ${email}</p>
    <p><strong>Mobile Phone:</strong> ${phone}</p>
    <p><strong>Business/Organization Name:</strong> ${organization}</p>
    <p><strong>Submitted:</strong> ${timestamp}</p>
  `;
}