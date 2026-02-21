/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

function freelancer() {
  const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
  const randomOccupation =
    OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
  const randomRate =
    Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min + 1)) +
    PRICE_RANGE.min;

  return {
    name: randomName,
    occupation: randomOccupation,
    rate: randomRate,
  };
}

console.log(freelancer());

//
//
//

const freelancers = [];

for (let i = 0; i < NUM_FREELANCERS; i++) {
  freelancers.push(freelancer());
}

//
//
//

function getAverageRate(freelancers) {
  const totalSum = freelancers.reduce((accumulator, freelancer) => {
    return accumulator + freelancer.rate;
  }, 0);

  return totalSum / freelancers.length;
}

//
//
//

let totalSum = 0;

for (let i = 0; i < freelancers.length; i++) {
  totalSum += freelancers[i].rate;
}

const averageRate = freelancers.length > 0 ? totalSum / freelancers.length : 0;

console.log(`The average rate is: $${averageRate.toFixed(2)}`);

//
//
//

function createFreelancerTable(freelancer) {
  const tr = document.createElement("tr");
  const nameCell = document.createElement("td");
  const occupationCell = document.createElement("td");
  const rateCell = document.createElement("td");

  nameCell.textContent = freelancer.name;
  occupationCell.textContent = freelancer.occupation;
  rateCell.textContent = `$${freelancer.rate}`;

  tr.append(nameCell, occupationCell, rateCell);

  return tr;
}
// console.log(createFreelancerTable(freelancer));
const newPerson = freelancer(); // Generate a person first
console.log(createFreelancerTable(newPerson)); // Pass that person to the table maker

//
//
//

function FreelancerTable(freelancers) {
  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>Name</th>
        <th>Occupation</th>
        <th>Rate</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");

  for (let i = 0; i < freelancers.length; i++) {
    const row = createFreelancerTable(freelancers[i]);
    tbody.appendChild(row);
  }

  return table;
}

//
//
//

function averageRateDisplay(freelancers) {
  let totalSum = 0;

  for (let i = 0; i < freelancers.length; i++) {
    totalSum += freelancers[i].rate;
  }
  const averageRate =
    freelancers.length > 0 ? totalSum / freelancers.length : 0;

  const container = document.createElement("div");
  container.className = "average-rate-container";

  container.innerHTML = `
  <h3>The average rate is</h3>
  <p class="rate-value">$${averageRate.toFixed(2)}</p>
  `;
  return container;
}
console.log(averageRateDisplay(freelancers));

//
//
//

/**
 * The main render function that mounts the app.
 * It uses placeholder tags and replaces them with component elements.
 */
function render() {
  const $app = document.querySelector("#app");

  // 1. Define the initial "shell" with custom placeholder tags
  $app.innerHTML = `
    <h1>Freelancer Form</h1>
    <AverageRateDisplay></AverageRateDisplay>
    <FreelancerTable></FreelancerTable>
  `;

  // 2. Replace placeholders with the actual DOM elements from our functions
  // Note: 'freelancers' is our state array of 100 objects
  $app
    .querySelector("AverageRateDisplay")
    .replaceWith(averageRateDisplay(freelancers));
  $app
    .querySelector("FreelancerTable")
    .replaceWith(FreelancerTable(freelancers));
}

// 3. Call the function to mount the application
render();
