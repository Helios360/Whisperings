const express = require('express');
const cors = require('cors');
const app = express();
const ratelimit = require('express-rate-limit');
const { get } = require('http');
const path = require('path');
const fs = require('fs').promises;

app.disable('x-powered-by');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const distPath = path.join(__dirname, '../client/dist');
const FILE = "db.json"; // All users are stored in one json file ("A performance blackhole"  -Me)

app.set('trust proxy', 1);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(distPath));
app.use(ratelimit({ windowMs : 15*60*1000, max : 200 }));

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
ensureFile();

// ==== READ articles ====
app.get('/api/articles', async (req, res, next) => {
    try {
        const articles = await getAll(); 
        res.json({articles});
    } catch (err) {
        next(err);
    }
})
// ==== CREATE an article ====
app.post('/api/articles/create', async (req, res, next) => {
    try {
        const articles = await getAll();
        const article = {
            id: Date.now(),
            name: req.body.name,
            content: req.body.content,
            created_at: new Date(),
            updated_at: new Date(),
        };
        articles.push(article);
        await saveAll(articles);
        res.status(201).json(article);
    } catch(err) {
        next(err);
    }
});
// ==== UPDATE an article ====
app.put('/api/articles/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { name, content } = req.body;
        const articles = await getAll();
        const index = articles.findIndex(article => article.id === id);
        if (index === -1) return res.status(404).json({ success: false, message: 'Article not found'});

        articles[index] = {
            ...articles[index],
            name: name ?? articles[index].name,
            content: content ?? articles[index].content,
            updated_at: new Date(),
        }
        await saveAll(articles);
        res.json({ success: true, article: articles[index] });
    } catch (err) {
        next(err);
    }
})
// ==== DELETE an article ====
app.delete('/api/articles/:id', async (req, res, next) => {
    try{
        const id = Number(req.params.id);
        const articles = await getAll();
        const index = articles.findIndex(article => article.id === id);
        if (index === -1) return res.status(404).json({ success: false, message: 'Article not found'});
        const deleted = articles.splice(index, 1)[0];
        await saveAll(articles);
        res.json({ success: true, deleted });
    } catch(err) {
        next(err);
    }
})
// ==== Error handling ====
app.use((err, req, res, next) => {
    console.error('Global error handler :\n', err);
    res.status(500).json({success: false, message: 'Internal server error.'});
});
app.use('/api', (req, res) => { res.status(404).json({error: "Not Found"}); })
app.listen(PORT, HOST, () => { console.log(`Server running at http://${HOST}:${PORT}`); });