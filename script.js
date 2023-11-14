//spell search
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
//randomizer event listener for = key
document.addEventListener('keydown', async (event) => {
    if (event.key === '=') {
        const response = await fetch('https://www.dnd5eapi.co/api/spells');
        const data = await response.json();
        const randomSpellIndex = Math.floor(Math.random() * data.results.length);
        const randomSpellResponse = await fetch(`https://www.dnd5eapi.co/api/spells/${data.results[randomSpellIndex].index}`);
        const randomSpellData = await randomSpellResponse.json();
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `<div><h3>${randomSpellData.name}</h3><p>${randomSpellData.desc}</p></div>`;
    }
});
//light and dark mode toggle
document.addEventListener('click', (event) => {
    if (event.target.tagName === 'H4') {
        const body = document.body;
        if (body.style.backgroundColor === 'black') {
            body.style.backgroundColor = 'white';
            body.style.color = 'black';
        } else {
            body.style.backgroundColor = 'black';
            body.style.color = 'white';
        }
    }

});
//mouse over event listener for h4
document.addEventListener('mouseover', (event) => {
    if (event.target.tagName === 'H4') {
        event.target.style.cursor = 'pointer';
    }
});














