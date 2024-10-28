const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const pokemonId = Math.floor(Math.random() * 151) + 1;
    const caught = Math.random() < 0.5 ? 'Caught' : 'Not Caught';
    const shiny = Math.random() < 0.05 ? 'Shiny' : '';

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pokémon Catcher</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
            </style>
        </head>
        <body>
            <h1>Pokémon Catcher</h1>
            <div id="result">
                <h2>Pokémon #${pokemonId}</h2>
                <p>Status: ${caught}</p>
                <p>${shiny}</p>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
