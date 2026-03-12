const fs = require('fs').promises;
const FILE = "db.json"; // All users are stored in one json file ("A performance blackhole"  -Me)

// ==== HELPERS ====
async function getAll(){
    const raw = await fs.readFile(FILE, 'utf-8');
    return JSON.parse(raw);
}
async function saveAll(data){
    await fs.writeFile(FILE, JSON.stringify(data, null, 2), 'utf-8');
}
async function ensureFile(){ // If file doesn't exist, create it
    try { await fs.readFile(FILE); }
    catch { await fs.writeFile(FILE, '[]', 'utf-8'); }
} // If file exists but doesn't have the "[]" the program fails lol

module.exports = { getAll, saveAll, ensureFile };