export default function decorate(block) {
  const blogsWrapper = document.createElement('div');
  blogsWrapper.classList.add('container');
  const blogsList = document.createElement('div');
  blogsList.classList.add('blogs-list');
  const blogListItems = block.querySelectorAll('.blogs>div');
  blogListItems.forEach((item) => {
    const blogItem = document.createElement('div');
    blogItem.classList.add('blog-item');
    const blogTitle = item.querySelector("h3").textContent.trim();
    const details = item.querySelectorAll("p");
    const date = details[0].textContent.trim();
    const blogDescription = details[1].textContent.trim();
    const readMore = item.querySelector('a');
    const readMoreText = readMore.textContent;
    const readMoreLink = readMore.href;
    blogItem.innerHTML = `
        <div class="blog-details">
            <h3>${blogTitle}</h3>
            <span>${date}</span>
        </div>
        <p>${blogDescription}</p>
        <a href="${readMoreLink}">${readMoreText}</a>
    `;
    blogsList.append(blogItem);
  });
  blogsWrapper.append(blogsList);

  block.innerHTML = '';
  block.append(blogsWrapper);
}
