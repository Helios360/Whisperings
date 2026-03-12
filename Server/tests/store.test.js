const fs = require('fs').promises;
const { getAll, saveAll, ensureFile } = require("../store.js");

const FILE = "db.json";
let backup;

beforeEach(async () => {
    try {
        backup = await fs.readFile(FILE, "utf8");
    } catch {
        backup = null;
    }

    await fs.writeFile(FILE, "[]", "utf8");
});

afterEach(async () => {
    if (backup === null) {
        await fs.unlink(FILE).catch(() => {});
    } else {
        await fs.writeFile(FILE, backup);
    }
});

test('getAll returns empty array', async () => {
    const data = await getAll();
    expect(data).toEqual([]);
});

test('saveAll persists data', async () => {
    const testData = [{ id: 1, name: "test" }];
    await saveAll(testData);

    const data = await getAll();
    expect(data).toEqual(testData);
});

test('ensureFile creates file if missing', async () => {
    await fs.unlink(FILE).catch(() => {});
    await ensureFile();

    const content = await fs.readFile(FILE, "utf8");
    expect(content).toBe("[]");
});