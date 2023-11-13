async function searchSpells() {
        const response = await fetch('https://www.dnd5eapi.co/api/spells');
        const data = await response.json();
        const searchInput = document.getElementById('search-bar').value.toLowerCase();
        const results = data.results.filter(spell => spell.name.toLowerCase().includes(searchInput));
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        results.forEach(async spell => {
                const spellResponse = await fetch(`https://www.dnd5eapi.co${spell.url}`);
                const spellData = await spellResponse.json();
                const spellDiv = document.createElement('div');
                spellDiv.innerHTML = `<h3>${spellData.name}</h3><p>${spellData.desc}</p>`;
                resultsDiv.appendChild(spellDiv);
        });
}

document.addEventListener('keydown', (event) => {
    if (event.key === '=') {
        const randomIndex = Math.floor(Math.random() * 319);
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        const spellResponse = await fetch(`https://www.dnd5eapi.co/api/spells/${randomIndex}`);
        const spellData = await spellResponse.json();
        const spellDiv = document.createElement('div');
        spellDiv.innerHTML = `<h3>${spellData.name}</h3><p>${spellData.desc}</p>`;
        resultsDiv.appendChild(spellDiv);
    }
});

// const resultsDiv = document.getElementById('results');
// resultsDiv.addEventListener('DOMNodeInserted', () => {
//     if (resultsDiv.children.length > 1) {
//         resultsDiv.removeChild(resultsDiv.firstChild);
//     }
// });


    
}