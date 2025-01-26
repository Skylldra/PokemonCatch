const fetch = require('node-fetch');

// Bestehende Funktion
async function sendToPokedex(username, pokemon, isCaught, isShiny) {
    const pokedexUrl = `https://pokedex-dt48.onrender.com/catch`;

    try {
        // Daten an das Pokédex-Backend senden
        const response = await fetch(pokedexUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                pokemonId: pokemon.id,
                caught: isCaught,
                shiny: isShiny
            })
        });

        const result = await response.text();
        return result; // Gibt die Antwort des Pokédex-Backends zurück
    } catch (error) {
        console.error('Fehler beim Senden an das Pokédex-Backend:', error);
        throw new Error('Fehler beim Kommunizieren mit dem Pokédex.');
    }
}

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
