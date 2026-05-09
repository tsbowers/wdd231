const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    completed: true
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    completed: true
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    completed: true
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    completed: true
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    completed: true
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    completed: false
  }
];

const courseContainer = document.querySelector("#course-container");
const creditsDisplay = document.querySelector("#credits");

const allButton = document.querySelector("#all");
const cseButton = document.querySelector("#cse");
const wddButton = document.querySelector("#wdd");

const filterButtons = [allButton, cseButton, wddButton];

function setSelectedButton(selectedButton) {
  filterButtons.forEach((button) => {
    button.classList.remove("selected");
  });

  selectedButton.classList.add("selected");
}

function displayCourses(courseList) {
  courseContainer.innerHTML = "";

  courseList.forEach((course) => {
    const courseCard = document.createElement("section");
    courseCard.classList.add("course-card");

    if (course.completed) {
      courseCard.classList.add("completed");
    }

    courseCard.innerHTML = `<span>${course.subject} ${course.number}</span>`;

    courseContainer.appendChild(courseCard);
  });

  const totalCredits = courseList.reduce((total, course) => total + course.credits, 0);
  creditsDisplay.textContent = `The total credits for courses listed above is ${totalCredits}`;
}

allButton.addEventListener("click", () => {
  setSelectedButton(allButton);
  displayCourses(courses);
});

cseButton.addEventListener("click", () => {
  setSelectedButton(cseButton);

  const cseCourses = courses.filter((course) => course.subject === "CSE");
  displayCourses(cseCourses);
});

wddButton.addEventListener("click", () => {
  setSelectedButton(wddButton);

  const wddCourses = courses.filter((course) => course.subject === "WDD");
  displayCourses(wddCourses);
});

setSelectedButton(allButton);
displayCourses(courses);