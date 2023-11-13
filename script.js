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

// 3. Add event listeners to the buttons to display the spell data from api when clicked.
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const spellName = event.target.textContent;
        const spell = spells.find((spell) => spell.name === spellName);
        fetch(spell.url)
          .then((response) => response.json())
          .then((data) => {
            const spellData = {
              name: data.name,
              desc: data.desc,
              higherLevel: data.higher_level,
              range: data.range,
              components: data.components,
              material: data.material,
              ritual: data.ritual,
              duration: data.duration,
              concentration: data.concentration,
              castingTime: data.casting_time,
              level: data.level,
              school: data.school,
              classes: data.classes,
              subclasses: data.subclasses,
            };
            displaySpell(spellData);
          });
      });
    });
  }