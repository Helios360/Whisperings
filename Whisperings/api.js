const API_URL = 'http://localhost:3000/api/articles';

async function request(url, options = {}) {
    const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    });
    if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
    return res.json();
}

export async function createArticle(articleData) {
    return request(`${API_URL}/create`, {
        method: 'POST',
        body: JSON.stringify(articleData)
    });
}

export async function getArticles() {
    return request(API_URL);
}

export async function updateArticle(id, updatedData) {
    return request(`${API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData)
    });
}

export async function deleteArticle(id) {
    return request(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
}