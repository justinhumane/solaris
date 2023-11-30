// Defining API base url
const baseUrl = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com";

// Defining empty variables for global use
let apiKey = "";
let bodies = [];

// Defining the DOM elements needing changes
const bodiesContainer = document.getElementsByClassName("bodies")[0];
const starsContainer = document.getElementById("stars");
const modal = document.getElementsByClassName("modal")[0];
const closeButton = document.getElementsByClassName("close")[0];
const bodyName = document.getElementById("bodyName");
const latinName = document.getElementById("latinName");
const description = document.getElementById("description");
const circumference = document.getElementById("circumference");
const distance = document.getElementById("distance");
const maxTemp = document.getElementById("maxTemp");
const minTemp = document.getElementById("minTemp");
const moonsContainer = document.getElementsByClassName("moons")[0];
const moons = document.getElementById("moons");
const highlightedBody = document.getElementsByClassName("big")[0];

// Defining general event listeners
closeButton.addEventListener("click", () => hideDetails());

// Function to get API key and set that key to global variable
const getApiKey = async () => {
  try {
    let response = await fetch(`${baseUrl}/keys`, { method: "POST" });
    if (!response) throw new Error();
    let data = await response.json();

    apiKey = data.key;
  } catch (error) {
    console.log(error);
  }
};

// Function to fetch API data. The function waits for getApiKey to be ready before proceeding. Lastly it calls renderBodies to show the celestial bodies
const fetchBodies = async () => {
  try {
    await getApiKey();
    let response = await fetch(`${baseUrl}/bodies`, {
      headers: {
        "x-zocom": apiKey,
      },
    });
    if (!response) throw new Error();
    let data = await response.json();
    bodies = data.bodies;

    renderBodies();
  } catch (error) {
    console.log(error);
  }
};
fetchBodies();

// Function that renders all celestial bodies and adds event listeners to the bodies
const renderBodies = async () => {
  bodies.forEach((body, i) => {
    const bodyElement = document.createElement("div");
    bodyElement.classList.add(body.name.toLowerCase());
    bodyElement.addEventListener("click", () => showDetails(body));
    bodiesContainer.append(bodyElement);
  });
};

// Function to show details regarding a certain celestial body. When called it removes the class hidden on the modal element and fills it with data
const showDetails = (body) => {
  modal.classList.toggle("hidden");
  highlightedBody.classList = `big stora-${body.name.toLowerCase()}`;
  bodyName.textContent = body.name;
  latinName.textContent = body.latinName;
  description.textContent = body.desc;
  circumference.textContent = `${body.circumference.toLocaleString(
    "sv-SE"
  )} km`;
  distance.textContent = `${body.distance.toLocaleString("sv-SE")} km`;
  maxTemp.textContent = `${body.temp.day}C`;
  minTemp.textContent = `${body.temp.night}C`;
  if (body.moons.length > 0) {
    moonsContainer.classList = "moons";
    moons.textContent = body.moons.join(", ");
  } else {
    moonsContainer.classList = "moons hidden";
  }
};

// Simple function to hide the modal
const hideDetails = () => {
  modal.classList.toggle("hidden");
};

// Function to renders stars. The function loops 200 times and creates a star with a random position and a random size between 0.2 and 0.08 rem.
const renderStars = async () => {
  for (let i = 0; i < 200; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    let size = Math.random() * (0.2 - 0.08) + 0.08;
    star.style.width = `${size}rem`;
    star.style.height = `${size}rem`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;

    starsContainer.append(star);
  }
};
renderStars();
