const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Array of the first 151 Pokémon names
const pokemonNames = [
    "Bisasam", "Bisaknosp", "Bisaflor", "Glumanda", "Glutexo", "Glurak",
    "Schiggy", "Schillok", "Turtok", "Raupy", "Safcon", "Smettbo",
    "Hornliu", "Kokuna", "Bibor", "Taubsi", "Tauboga", "Tauboss",
    "Rattfratz", "Rattikarl", "Habitak", "Ibitak", "Rettan", "Arbok",
    "Pikachu", "Raichu", "Sandan", "Sandamer", "Nidoran♀", "Nidorina",
    "Nidoqueen", "Nidoran♂", "Nidorino", "Nidoking", "Piepi", "Pixi",
    "Vulpix", "Vulnona", "Pummeluff", "Knuddeluff", "Zubat", "Golbat",
    "Myrapla", "Duflor", "Giflor", "Paras", "Parasek", "Bluzuk",
    "Omot", "Digda", "Digdri", "Mauzi", "Snobilikat", "Enton",
    "Entoron", "Menki", "Rasaff", "Fukano", "Arkani", "Quapsel",
    "Quaputzi", "Quappo", "Abra", "Kadabra", "Simsala", "Machollo",
    "Maschock", "Machomei", "Knofensa", "Ultrigaria", "Sarzenia",
    "Tentacha", "Tentoxa", "Kleinstein", "Georok", "Geowaz", "Ponita",
    "Gallopa", "Flegmon", "Lahmus", "Magnetilo", "Magneton", "Porenta",
    "Dodu", "Dodri", "Jurob", "Jugong", "Sleima", "Sleimok",
    "Muschas", "Austos", "Nebulak", "Alpollo", "Gengar", "Onix",
    "Traumato", "Hypno", "Krabby", "Kingler", "Voltobal", "Lektrobal",
    "Owei", "Kokowei", "Tragosso", "Knogga", "Kicklee", "Nockchan",
    "Schlurp", "Smogon", "Smogmog", "Rihorn", "Rizeros", "Chaneira",
    "Tangela", "Kangama", "Seeper", "Seemon", "Goldini", "Golking",
    "Sterndu", "Starmie", "Pantimos", "Sichlor", "Rossana", "Elektek",
    "Magmar", "Pinsir", "Tauros", "Karpador", "Garados", "Lapras",
    "Ditto", "Evoli", "Aquana", "Blitza", "Flamara", "Porygon",
    "Amonitas", "Amoroso", "Kabuto", "Kabutops", "Aerodactyl", "Relaxo",
    "Arktos", "Zapdos", "Lavados", "Dratini", "Dragonir", "Dragoran",
    "Mewtu", "Mew"
];


app.get('/', (req, res) => {
    const randomIndex = Math.floor(Math.random() * pokemonNames.length);
    const pokemonName = pokemonNames[randomIndex];
    const caught = Math.random() < 0.5 ? 'Caught' : 'Not Caught';
    const shiny = Math.random() < 0.05 ? 'Shiny' : '';

    // Send a simple text response
    res.send(`${pokemonName} - ${caught} ${shiny}`);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
