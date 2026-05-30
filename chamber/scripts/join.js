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

const timestamp = document.querySelector("#timestamp");

if (timestamp) {
  timestamp.value = new Date().toLocaleString();
}

const modalButtons = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll(".close-modal");

modalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modalId = button.getAttribute("data-modal");
    const modal = document.querySelector(`#${modalId}`);

    if (modal && typeof modal.showModal === "function") {
      modal.showModal();
    }
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest("dialog");

    if (modal) {
      modal.close();
    }
  });
});