export default function decorate(block) {
  const imgPath = block.querySelector('img').src;
  const contentWrapper = block.querySelector('h1').parentElement; 
  const titleText = contentWrapper.querySelector('h1')?.textContent.trim();
  const detailsText = contentWrapper.querySelector('p')?.textContent.trim(); 
  const bannerContainerDiv = document.createElement('div');
  bannerContainerDiv.classList.add('container');
  bannerContainerDiv.innerHTML = `
    <div class="banner-content">
      <h1>${titleText}</h1>
      <p>${detailsText}</p>
    </div>
  `;

  const bottomBarText = block.querySelector('.banner > div:last-child p')?.textContent.trim();
  const bottomBarDiv = document.createElement('div');
  bottomBarDiv.classList.add('bottom-bar');
  bottomBarDiv.innerHTML = `
    <div class="container">
      <p>${bottomBarText}</p>
    </div>
  `;

  block.innerHTML = '';
  block.append(bannerContainerDiv, bottomBarDiv);
  if (imgPath) {
    document.documentElement.style.setProperty("--bg1", `url(${imgPath})`);
  }
}
