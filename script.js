const GITHUB_USERNAME = 'bobcodes26';
const repoGrid = document.getElementById('repo-grid');
const loader = document.getElementById('loader');

async function fetchRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`);
        const data = await response.json();

        // Filter out forks and get top 6
        const repos = data
            .filter(repo => !repo.fork)
            .slice(0, 6);

        renderRepos(repos);
    } catch (error) {
        repoGrid.innerHTML = `<p style="color:red; text-align:center;">Error connecting to Neural Link. Please refresh.</p>`;
        console.error('Fetch error:', error);
    } finally {
        loader.style.display = 'none';
    }
}

function renderRepos(repos) {
    repoGrid.innerHTML = repos.map(repo => `
        <div class="repo-card">
            <h3>${repo.name.toUpperCase()}</h3>
            <p>${repo.description || 'No description available for this neural module.'}</p>
            <div class="repo-meta">
                <span>⚡ ${repo.language || 'Plain Text'}</span>
                <span>⭐ ${repo.stargazers_count}</span>
            </div>
            <a href="${repo.html_url}" target="_blank" style="display:block; margin-top:15px; color:white; font-size:0.7rem; text-decoration:none; border-bottom:1px solid #22d3ee; width:fit-content;">OPEN_REPO ></a>
        </div>
    `).join('');
}

// Initialize fetch
fetchRepos();
