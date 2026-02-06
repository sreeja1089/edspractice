import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
  block.append(footer);

  const footerCmp = footer.querySelectorAll('.section >div > div>div');

  const footerWrapper = document.createElement('div');
  footerWrapper.classList.add('container');

  const linkWrappers = [...footerCmp].slice(0, -1);
  linkWrappers.forEach(item => {
      const footerItem = document.createElement('div');
      footerItem.classList.add('footer-item');

      const headingText = item.querySelector('div:first-child').textContent;
      footerItem.innerHTML = `<h5>${headingText}</h5>`;
      const links = item.querySelectorAll('a');
      links.forEach(link => {
          const linkText = link.textContent;
          const url = link.href;
          footerItem.innerHTML += `<a href="${url}">${linkText}</a>`;
      });
      footerWrapper.append(footerItem);
  });

  const newsLetter = footerCmp[2];
  const newsLetterWrapper = document.createElement('div');
  newsLetterWrapper.classList.add('newsletter');

  const titleText = newsLetter.querySelector('div:first-child').textContent.trim();
  const detailsText = newsLetter.querySelector('p:first-child').textContent.trim();
  const copyrightText = newsLetter.querySelector('p:last-child').textContent.trim();

  newsLetterWrapper.innerHTML = `
      <h5>${titleText}</h5>
      <p>${detailsText}</p>
      <div>
          <input type="email" name="email">
          <button type="button">Sign Up</button>
      </div>
      <p class="copyright">${copyrightText}</p>
  `;

  footerWrapper.append(newsLetterWrapper);
  block.innerHTML = '';
  block.append(footerWrapper);
}
