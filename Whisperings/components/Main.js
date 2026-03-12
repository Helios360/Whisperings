import { createArticle, deleteArticle, getArticles, updateArticle } from "../api";

window.handleCreate = async () => {
    const newName = prompt("Titre :");
    const newContent = prompt("Description");

    if (newName && newContent) {
        await createArticle({ name: newName, content: newContent });
        alert("Article créé !");
        window.location.reload();
    }
};

window.handleUpdate = async (id) => {
    const newName = prompt("Nouveau titre :");
    const newContent = prompt("Nouvelle description :")

    if (newName && newContent) {
        await updateArticle(id, { name: newName, content: newContent });
        alert("Article modifié !");
        window.location.reload();
    }
};

window.handleDelete = async (id) => {
    if (confirm('Supprimer cet article ?')) {
        await deleteArticle(id);
        window.location.reload();
    }
};

export const Main = async () => {
    const data = await getArticles();
    const articles = data.articles || [];

    return `
    <main style="padding: 2rem;">
      <h2>Bienvenue</h2>
      <button onclick="handleCreate()">Créer un article</button>
      <p>Ceci est le contenu principal de ton application.</p>

      <article id="api-content">
        ${articles.map(article => `
            <div style="margin-bottom: 20px; border: 1px solid #ccc; padding: 10px;">
                <h3>${article.name}</h3>
                <p>${article.content}</p>
                
                <button onclick="handleUpdate('${article.id}')">Modifier</button>
                <button onclick="handleDelete('${article.id}')" style="color: red;">Supprimer</button>
            </div>
        `).join('')}
      </article>
    </main> 
  `;
};