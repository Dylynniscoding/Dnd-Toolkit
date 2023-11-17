//spell search
let spellArray = null;
let spellDetails = {};

// creates empty array for spells to go in locally on page load
addEventListener("DOMContentLoaded", async () => {
  // Fetch data from API
  const response = await fetch("https://www.dnd5eapi.co/api/spells");
  // Convert data to JSON
  const data = await response.json();
  // Store the results in spellArray
  spellArray = data.results;
});

async function renderSpell(spell, resultsDiv) {
  // checks if spellDetails does not have spell
  if (!spellDetails.hasOwnProperty(spell.url)) {
    // fetches api data for spells
    const spellResponse = await fetch(`https://www.dnd5eapi.co${spell.url}`);
    // converts data to json
    const spellData = await spellResponse.json();
    // adds spell to spellDetails
    spellDetails[spell.url] = spellData;
  }
  // gets spell data from spellDetails
  const spellData = spellDetails[spell.url];
  // creates div for spells to go in
  const spellDiv = document.createElement("div");
  // adds class to div
  spellDiv.innerHTML = `<h3>${spellData.name}</h3><p>${spellData.desc}</p>`;
  // adds div to results div
  resultsDiv.appendChild(spellDiv);
};


// function for searching for spells
async function searchSpells() {
  // Get search input from search bar
  const searchInput = document.getElementById("search-bar").value.toLowerCase();
  // Filter spellArray for spells that match search input
  const results = spellArray.filter((spell) =>
    spell.name.toLowerCase().includes(searchInput)
  );
  // Display results
  const resultsDiv = document.getElementById("results");
  // Clear results div
  resultsDiv.innerHTML = "";
  // Loop through results and display them
  results.forEach(async (spell) => {
    // calls renderSpell function
    await renderSpell(spell, resultsDiv);
  });
}

// randomizer event listener for = key
// adds event listener for = key
document.addEventListener("keydown", async (event) => {
  // checks if key pressed is =
  if (event.key === "=") {
    
    const randomSpellIndex = Math.floor(Math.random() * spellArray.length);
    // gets random spell data
    const spell = spellArray[randomSpellIndex];
    // displays random spell in results div
    const resultsDiv = document.getElementById("results");
    // clears results div
    resultsDiv.innerHTML = "";
    // calls renderSpell function
    await renderSpell(spell, resultsDiv);
  }
});
// light and dark mode toggle
// click event listener for h4
document.addEventListener("click", (event) => {
  //checks if h4 is clicked
  if (event.target.tagName === "H4") {
    //changes background color and text color checking if it is one color or the other
    const body = document.body;
    if (body.style.backgroundColor === "black") {
      body.style.backgroundColor = "white";
      body.style.color = "black";
    } else {
      body.style.backgroundColor = "black";
      body.style.color = "white";
    }
  }
});
//mouse over event listener for h4
//adds event listener for mouse over
document.addEventListener("mouseover", (event) => {
  //checks if h4 is moused over
  if (event.target.tagName === "H4") {
    //changes cursor to pointer when moused over
    event.target.style.cursor = "pointer";
  }
});

