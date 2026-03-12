const request = require('supertest');
const fs = require('fs').promises;
const app = require('../server');

const FILE = "db.json";

beforeEach(async ()=> { await fs.writeFile(FILE, "[]"); });

describe("Articles API", () => {
    test("GET /api/articles retourne la liste", async () => {
        const res = await request(app).get("/api/articles");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("articles");
        expect(Array.isArray(res.body.articles)).toBe(true);
    });
    test("POST /api/articles/create crée un article", async () => {
        const res = await request(app).post("/api/articles/create").send({name: "Test create name", content: "Test create content"});
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe("Test create name");
        expect(res.body.content).toBe("Test create content");
        expect(res.body).toHaveProperty("id");
    });
    test("PUT /api/articles/:id met a jour un article", async () => {
        const create = await request(app).post("/api/articles/create").send({name: "Test update name", content: "Test update content"});
        const id = create.body.id;
        const res = await request(app).put(`/api/articles/${id}`).send({name: "Test new name", content: "Test new content"});
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.article.name).toBe("Test new name");
    });
    test("PUT /api/articles/:id 404 si innexistant", async () => {
        const res = await request(app).put("/api/articles/999999").send({name: "Test new name", content: "Test new content"});
        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
    });
    test("DELETE /api/articles/:id supprimer un article", async () => {
        const create = await request(app).post("/api/articles/create").send({name: "Test delete name", content: "Test delete content"});
        const id = create.body.id;
        const res = await request(app).delete(`/api/articles/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.deleted.id).toBe(id);
    });
    test("DELETE /api/articles/:id 404 si innexistant", async () => {
        const res = await request(app).delete("/api/articles/999999");
        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
    });
    test("Route API innexistante renvoie 404", async () => {
        const res = await request(app).get("/api/unkwnown");
        expect(res.statusCode).toBe(404);
    });
});