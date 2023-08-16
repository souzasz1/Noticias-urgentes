const apiKey = '5013739ddb20498420bad2fe87103743';
const apiUrl = `https://gnews.io/api/v4/top-headlines?lang=en&token=${apiKey}`;

async function fetchNews() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const articles = data.articles;
    const newsContainer = document.getElementById('news-container');

    articles.forEach(article => {
      const articleDiv = document.createElement('div');
      articleDiv.classList.add('article');

      const title = document.createElement('h2');
      title.textContent = article.title;

      const image = document.createElement('img');
      image.src = article.image;
      image.alt = article.title;

      const description = document.createElement('p');
      description.textContent = article.description;

      const commentsSection = document.createElement('div');
      commentsSection.classList.add('comments');
      commentsSection.innerHTML =`
      <h3>Comentários</h3>
      <div class="comment-list"></div>
       
      <form class="comment-form">
        <input type="text" class="comment-input" placeholder="Adicione um comentário...">
        <button type="submit">Adicionar Comentário</button>
      </form>
     
      `;

      const commentForm = commentsSection.querySelector('.comment-form');
      const commentList = commentsSection.querySelector('.comment-list');

      commentForm.addEventListener('submit', event => {
        event.preventDefault();
        const commentInput = commentForm.querySelector('.comment-input');
        const commentText = commentInput.value.trim();

        if (commentText !== '') {
          const commentElement = document.createElement('div');
          commentElement.classList.add('comment');
          commentElement.textContent = commentText;
          commentList.appendChild(commentElement);
          commentInput.value = '';
        }
      });

      articleDiv.appendChild(title);
      articleDiv.appendChild(image);
      articleDiv.appendChild(description);
      articleDiv.appendChild(commentsSection);

      newsContainer.appendChild(articleDiv);
    });
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}

document.addEventListener('DOMContentLoaded', fetchNews);
