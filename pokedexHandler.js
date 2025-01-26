const fetch = require('node-fetch');

async function sendToPokedex(username, pokemon) {
    const pokedexUrl = `https://pokedex-dt48.onrender.com`;

    try {
        const response = await fetch(pokedexUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                pokemonId: pokemon.id, // Pokémon-ID übergeben
                name: pokemon.name    // Pokémon-Name übergeben
            })
        });

        const result = await response.text();
        return result; // Gibt die Antwort des Pokédex-Backends zurück
    } catch (error) {
        console.error('Fehler beim Senden an das Pokédex-Backend:', error);
        throw new Error('Fehler beim Kommunizieren mit dem Pokédex.');
    }
}

module.exports = { sendToPokedex };

// Neue Funktion, die zusätzlich genutzt werden kann
async function handlePokedexInteraction(username, pokemon, isCaught, isShiny) {
    const pokedexUrl = `https://pokedex-dt48.onrender.com/catch`;

    try {
        const response = await fetch(pokedexUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                pokemonId: pokemon.id,
                caught: isCaught === '◓Gefangen◓',
                shiny: !!isShiny
            })
        });

        return await response.text(); // Antwort des Pokédex-Backends zurückgeben
    } catch (error) {
        console.error('Fehler beim Senden an das Pokédex-Backend:', error);
        throw new Error('Kommunikation mit dem Pokédex-Backend fehlgeschlagen.');
    }
}

// Exporte aller Funktionen
module.exports = {
    sendToPokedex, // Bestehende Funktion
    handlePokedexInteraction // Neue Funktion
};
