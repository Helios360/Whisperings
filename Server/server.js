const express = require('express');
const cors = require('cors');
const app = express();
const ratelimit = require('express-rate-limit');
const path = require('path');
const {sequelize, Article} = require('./db.js')
app.disable('x-powered-by');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const distPath = path.join(__dirname, '../Whisperings/dist');

app.set('trust proxy', 1);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(distPath));
app.use(ratelimit({ windowMs : 15*60*1000, max : 200 }));

async function start(){
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, HOST, () => { console.log(`Server running at http://${HOST}:${PORT}`); });
    } catch (err) {
        console.error(err);
    }
}

// ==== READ articles ====
app.get('/api/articles', async (req, res, next) => {
    try {
        const articles = await Article.findAll({ order: [['createdAt', 'DESC']] }); 
        res.json({success: true, articles});
    } catch (err) {
        next(err);
    }
})
// ==== CREATE an article ====
app.post('/api/articles/create', async (req, res, next) => {
    try {
        const current_article = {
            name: req.body.name,
            content: req.body.content,
            created_at: new Date(),
            updated_at: new Date(),
        };
        await Article.create(current_article);
        res.status(201).json(current_article);
    } catch(err) {
        next(err);
    }
});
// ==== UPDATE an article ====
app.put('/api/articles/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { name, content } = req.body;
        const article = await Article.findByPk(id);
        if (!article) return res.status(404).json({success: false, message: 'Article not found' });
        await Article.update({
            name: name ?? article.name,
            content: content ?? article.content,
        });
        res.json({ success: true, article });
    } catch (err) {
        next(err);
    }
})
// ==== DELETE an article ====
app.delete('/api/articles/:id', async (req, res, next) => {
    try{
        const id = Number(req.params.id);
        const article = await Article.findByPk(id);
        if (!article) return res.status(404).json({success: false, message: 'Article not found' });
        await article.destroy();
        res.json({ success: true });
    } catch(err) {
        next(err);
    }
})
// ==== Error handling ====
app.use((err, req, res, next) => {
    console.error('Global error handler :\n', err);
    res.status(500).json({success: false, message: 'Internal server error.'});
});
app.use('/api', (req, res) => { res.status(404).json({ error: "Not Found" }); })
if (require.main === module) start();
module.exports = app;