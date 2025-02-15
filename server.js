require("dotenv").config();
const express = require("express");
const { neon } = require("@neondatabase/serverless");

const app = express();
const PORT = process.env.PORT || 3000;

// Datenbankverbindung
const databaseUrl = process.env.DATABASE_URL?.trim();
if (!databaseUrl) {
    console.error("ERROR: Keine DATABASE_URL gefunden! Stelle sicher, dass sie in Render als Environment Variable gesetzt ist.");
    process.exit(1);
}
const sql = neon(databaseUrl);

// Fang- & Shiny-Chancen
const captureChances = { Common: 0.5, Strong: 0.45, Legendary: 0.2 };
const shinyChance = 0.05;

// Define Pokémon with capture probabilities
const pokemonData = [
    { name: "001 Bisasam", rarity: "Common" }, { name: "002 Bisaknosp", rarity: "Common" }, { name: "003 Bisaflor", rarity: "Strong" },
    { name: "004 Glumanda", rarity: "Common" }, { name: "005 Glutexo", rarity: "Common" }, { name: "006 Glurak", rarity: "Strong" },
    { name: "007 Schiggy", rarity: "Common" }, { name: "008 Schillok", rarity: "Common" }, { name: "009 Turtok", rarity: "Strong" },
    { name: "010 Raupy", rarity: "Common" }, { name: "011 Safcon", rarity: "Common" }, { name: "012 Smettbo", rarity: "Common" },
    { name: "013 Hornliu", rarity: "Common" }, { name: "014 Kokuna", rarity: "Common" }, { name: "015 Bibor", rarity: "Common" },
    { name: "016 Taubsi", rarity: "Common" }, { name: "017 Tauboga", rarity: "Common" }, { name: "018 Tauboss", rarity: "Common" },
    { name: "019 Rattfratz", rarity: "Common" }, { name: "020 Rattikarl", rarity: "Common" }, { name: "021 Habitak", rarity: "Common" },
    { name: "022 Ibitak", rarity: "Common" }, { name: "023 Rettan", rarity: "Common" }, { name: "024 Arbok", rarity: "Common" },
    { name: "025 Pikachu", rarity: "Strong" }, { name: "026 Raichu", rarity: "Strong" }, { name: "027 Sandan", rarity: "Common" },
    { name: "028 Sandamer", rarity: "Common" }, { name: "029 Nidoran♀", rarity: "Common" }, { name: "030 Nidorina", rarity: "Common" },
    { name: "031 Nidoqueen", rarity: "Strong" }, { name: "032 Nidoran♂", rarity: "Common" }, { name: "033 Nidorino", rarity: "Common" },
    { name: "034 Nidoking", rarity: "Strong" }, { name: "035 Piepi", rarity: "Common" }, { name: "036 Pixi", rarity: "Common" },
    { name: "037 Vulpix", rarity: "Common" }, { name: "038 Vulnona", rarity: "Strong" }, { name: "039 Pummeluff", rarity: "Common" },
    { name: "040 Knuddeluff", rarity: "Common" }, { name: "041 Zubat", rarity: "Common" }, { name: "042 Golbat", rarity: "Common" },
    { name: "043 Myrapla", rarity: "Common" }, { name: "044 Duflor", rarity: "Common" }, { name: "045 Giflor", rarity: "Strong" },
    { name: "046 Paras", rarity: "Common" }, { name: "047 Parasek", rarity: "Common" }, { name: "048 Bluzuk", rarity: "Common" },
    { name: "049 Omot", rarity: "Common" }, { name: "050 Digda", rarity: "Common" }, { name: "051 Digdri", rarity: "Common" },
    { name: "052 Mauzi", rarity: "Common" }, { name: "053 Snobilikat", rarity: "Common" }, { name: "054 Enton", rarity: "Common" },
    { name: "055 Entoron", rarity: "Common" }, { name: "056 Menki", rarity: "Common" }, { name: "057 Rasaff", rarity: "Common" },
    { name: "058 Fukano", rarity: "Common" }, { name: "059 Arkani", rarity: "Strong" }, { name: "060 Quapsel", rarity: "Common" },
    { name: "061 Quaputzi", rarity: "Common" }, { name: "062 Quappo", rarity: "Strong" }, { name: "063 Abra", rarity: "Common" },
    { name: "064 Kadabra", rarity: "Common" }, { name: "065 Simsala", rarity: "Strong" }, { name: "066 Machollo", rarity: "Common" },
    { name: "067 Maschock", rarity: "Common" }, { name: "068 Machomei", rarity: "Strong" }, { name: "069 Knofensa", rarity: "Common" },
    { name: "070 Ultrigaria", rarity: "Common" }, { name: "071 Sarzenia", rarity: "Strong" }, { name: "072 Tentacha", rarity: "Common" },
    { name: "073 Tentoxa", rarity: "Common" }, { name: "074 Kleinstein", rarity: "Common" }, { name: "075 Georok", rarity: "Common" },
    { name: "076 Geowaz", rarity: "Strong" }, { name: "077 Ponita", rarity: "Common" }, { name: "078 Gallopa", rarity: "Strong" },
    { name: "079 Flegmon", rarity: "Common" }, { name: "080 Lahmus", rarity: "Strong" }, { name: "081 Magnetilo", rarity: "Common" },
    { name: "082 Magneton", rarity: "Strong" }, { name: "083 Porenta", rarity: "Common" }, { name: "084 Dodu", rarity: "Common" },
    { name: "085 Dodri", rarity: "Common" }, { name: "086 Jurob", rarity: "Common" }, { name: "087 Jugong", rarity: "Common" },
    { name: "088 Sleima", rarity: "Common" }, { name: "089 Sleimok", rarity: "Common" }, { name: "090 Muschas", rarity: "Common" },
    { name: "091 Austos", rarity: "Strong" }, { name: "092 Nebulak", rarity: "Common" }, { name: "093 Alpollo", rarity: "Common" },
    { name: "094 Gengar", rarity: "Strong" }, { name: "095 Onix", rarity: "Strong" }, { name: "096 Traumato", rarity: "Common" },
    { name: "097 Hypno", rarity: "Common" }, { name: "098 Krabby", rarity: "Common" }, { name: "099 Kingler", rarity: "Common" },
    { name: "100 Voltobal", rarity: "Common" }, { name: "101 Lektrobal", rarity: "Common" }, { name: "102 Owei", rarity: "Common" },
    { name: "103 Kokowei", rarity: "Strong" }, { name: "104 Tragosso", rarity: "Common" }, { name: "105 Knogga", rarity: "Common" },
    { name: "106 Kicklee", rarity: "Strong" }, { name: "107 Nockchan", rarity: "Strong" }, { name: "108 Schlurp", rarity: "Common" },
    { name: "109 Smogon", rarity: "Common" }, { name: "110 Smogmog", rarity: "Common" }, { name: "111 Rihorn", rarity: "Common" },
    { name: "112 Rizeros", rarity: "Strong" }, { name: "113 Chaneira", rarity: "Strong" }, { name: "114 Tangela", rarity: "Common" },
    { name: "115 Kangama", rarity: "Strong" }, { name: "116 Seeper", rarity: "Common" }, { name: "117 Seemon", rarity: "Common" },
    { name: "118 Goldini", rarity: "Common" }, { name: "119 Golking", rarity: "Common" }, { name: "120 Sterndu", rarity: "Common" },
    { name: "121 Starmie", rarity: "Strong" }, { name: "122 Pantimos", rarity: "Strong" }, { name: "123 Sichlor", rarity: "Strong" },
    { name: "124 Rossana", rarity: "Strong" }, { name: "125 Elektek", rarity: "Strong" }, { name: "126 Magmar", rarity: "Strong" },
    { name: "127 Pinsir", rarity: "Strong" }, { name: "128 Tauros", rarity: "Strong" }, { name: "129 Karpador", rarity: "Common" },
    { name: "130 Garados", rarity: "Strong" }, { name: "131 Lapras", rarity: "Strong" }, { name: "132 Ditto", rarity: "Strong" },
    { name: "133 Evoli", rarity: "Common" }, { name: "134 Aquana", rarity: "Strong" }, { name: "135 Blitza", rarity: "Strong" },
    { name: "136 Flamara", rarity: "Strong" }, { name: "137 Porygon", rarity: "Strong" }, { name: "138 Amonitas", rarity: "Common" },
    { name: "139 Amoroso", rarity: "Strong" }, { name: "140 Kabuto", rarity: "Common" }, { name: "141 Kabutops", rarity: "Strong" },
    { name: "142 Aerodactyl", rarity: "Strong" }, { name: "143 Relaxo", rarity: "Strong" },
    { name: "144 Arktos", rarity: "Legendary" }, { name: "145 Zapdos", rarity: "Legendary" }, { name: "146 Lavados", rarity: "Legendary" },
    { name: "147 Dratini", rarity: "Common" }, { name: "148 Dragonir", rarity: "Strong" }, { name: "149 Dragoran", rarity: "Strong" },
    { name: "150 Mewtu", rarity: "Legendary" }, { name: "151 Mew", rarity: "Legendary" }
];

// **Pokémon in die Datenbank speichern oder aktualisieren**
async function saveToDatabase(user, pokemon, isCaught, isShiny) {
    if (!user || user.trim() === "unknown") {
        console.log(`⚠️ Twitch-Username ungültig oder fehlt!`);
        return;
    }

    console.log(`🔄 Speichere ${pokemon.name} für ${user} in die Datenbank...`);

    try {
        await sql`
            INSERT INTO pokedex (twitch_username, pokemon_id, pokemon_name, gefangen, shiny)
            VALUES (${user}, ${pokemon.id}, ${pokemon.name}, ${isCaught}, ${isShiny})
            ON CONFLICT (twitch_username, pokemon_id) DO UPDATE
            SET gefangen = EXCLUDED.gefangen, shiny = EXCLUDED.shiny;
        `;
        console.log(`✅ ${pokemon.name} für ${user} gespeichert!`);
    } catch (error) {
        console.error("❌ Fehler beim Speichern:", error);
    }
}

// **API-Endpunkt für Fangversuch**
app.get("/", async (req, res) => {
    const user = req.query.user;
    if (!user) return res.send("Fehlender Parameter: user");

    const randomIndex = Math.floor(Math.random() * pokemonData.length);
    const pokemon = pokemonData[randomIndex];
    const isCaught = Math.random() < captureChances[pokemon.rarity];
    const isShiny = Math.random() < shinyChance;

    const catchStatus = isCaught ? "Gefangen" : "Nicht gefangen";
    const shinyText = isShiny ? "✪Shiny✪ " : "";

    // **Pokémon wird immer gespeichert, auch wenn es nicht gefangen wurde**
    await saveToDatabase(user, pokemon, isCaught, isShiny);

    res.send(`${shinyText}#${pokemon.id} ${pokemon.name} - ${catchStatus}`);
});

// **Server starten**
app.listen(PORT, () => console.log(`🚀 Server läuft auf Port ${PORT}`));
