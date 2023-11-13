// 1. Use the fetch API to get the spell data from the D&D 5e API.
const apiUrl = 'https://www.dnd5eapi.co/api/spells';

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    // 2. Parse the JSON response and extract the relevant data for each spell.
    const spells = data.results.map((spell) => {
      return {
        name: spell.name,
        url: spell.url,
      };
    });

    // 3. Store the spell data in an array of objects.
    const fetchSpellDataPromises = spells.map((spell) =>
      fetch(spell.url)
        .then((response) => response.json())
        .then((data) => {
          return {
            name: spell.name,
            level: data.level,
            school: data.school.name,
            castingTime: data.casting_time,
            range: data.range,
            components: data.components.map((component) => component.name).join(', '),
            duration: data.duration,
            description: data.desc.join(' '),
          };
        })
    );

    Promise.all(fetchSpellDataPromises).then((spellData) => {
      // 4. Create a search function that filters the array of spells based on user input.
      function searchSpells(query) {
        return spellData.filter((spell) => {
          return spell.name.toLowerCase().includes(query.toLowerCase());
        });
      }

      // 5. Create a display function that generates HTML to display the filtered spells.
      function displaySpells(spellList) {
        const table = document.createElement('table');
        const headerRow = document.createElement('tr');
        // ... (rest of the displaySpells function remains the same)

        document.body.appendChild(table);
      }

      // 6. Create an input field and button to allow the user to search for spells.
      const searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.placeholder = 'Search for a spell...';
      document.body.appendChild(searchInput);

      const searchButton = document.createElement('button');
      searchButton.textContent = 'Search';
      document.body.appendChild(searchButton);

      // 7. Add an event listener to the button that calls the search and display functions.
      searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        const matchingSpells = searchSpells(query);
        displaySpells(matchingSpells);
      });
    });
  });