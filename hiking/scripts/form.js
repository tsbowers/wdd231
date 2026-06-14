const results = document.querySelector("#form-results");

const params = new URLSearchParams(window.location.search);

const name = params.get("name");
const email = params.get("email");
const difficulty = params.get("difficulty");
const trailType = params.get("trailType");
const comments = params.get("comments");

results.innerHTML = `
    <h2>Your Hiking Plan</h2>

    <p><strong>Name:</strong> ${name}</p>

    <p><strong>Email:</strong> ${email}</p>

    <p><strong>Preferred Difficulty:</strong> ${difficulty}</p>

    <p><strong>Favorite Trail Type:</strong> ${trailType}</p>

    <p><strong>Trip Notes:</strong> ${comments}</p>
`;