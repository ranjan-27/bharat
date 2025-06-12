async function fetchConstitutionData() {
    try {
        const response = await fetch('data.json'); 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const articles = data[0];

        displayPreamble(articles[0]); 
        displayArticles(articles.slice(1));
      
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function displayPreamble(preamble) {
    const preambleElement = document.getElementById('preamble-content');
    preambleElement.textContent = preamble.ArtDesc; 
}

function displayArticles(articles) {
    const articlesContainer = document.getElementById('articles-content');
    articles.forEach(article => {
        const articleElement = document.createElement('div');
        
        // Constructing the content for article
        articleElement.innerHTML = `<strong>Article ${article.ArtNo}: ${article.Name}</strong><p>${article.ArtDesc}</p>`;
        
        // Display clauses if they exist
        if (article.Clauses) {
            const clausesContainer = document.createElement('div');
            article.Clauses.forEach(clause => {
                const clauseElement = document.createElement('p');
                clauseElement.innerHTML = `<strong>Clause ${clause.ClauseNo}:</strong> ${clause.ClauseDesc}`;
                clausesContainer.appendChild(clauseElement);
            });
            articleElement.appendChild(clausesContainer);
        }

        articlesContainer.appendChild(articleElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchConstitutionData();
});

