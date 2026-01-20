const navButtons = document.querySelectorAll(".nav-item, .nav-pill");
const screens = document.querySelectorAll(".screen");

const setActiveSection = (section) => {
  navButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.section === section);
  });

  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.section === section);
  });
};

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const section = button.dataset.section;
    if (section) {
      setActiveSection(section);
    }
  });
});
