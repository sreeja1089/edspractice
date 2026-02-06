export default function decorate(block) {
  /* change to ul, li */
  console.log(block);

  const cards = [...block.children];

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('container');

  cards.forEach((card) => {
      const img = card.querySelector('img');
      const imgSrc = img?.src;
      const altText = img?.alt;
      const detailsList = card.querySelectorAll('p');

      const cardItem = document.createElement('div');
      cardItem.classList.add('card-item');
  
      cardItem.innerHTML = `
        <div class="card-image">
          <img src="${imgSrc}" alt="${altText}">
        </div>
      `;

      const cardDetails = document.createElement('div');
      cardDetails.classList.add('card-content');
      
      detailsList.forEach(content => {
          cardDetails.innerHTML += `<p>${content.textContent.trim()}</p>`;
      });
  
      cardItem.append(cardDetails);
      cardsWrapper.append(cardItem);
  });

  block.innerHTML = '';
  block.append(cardsWrapper);
}
