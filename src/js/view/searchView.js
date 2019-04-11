
import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => elements.searchInput.value = "";
export const clearResult = () => {
    elements.searchresList.innerHTML = "";
    elements.searchResPage.innerHTML= "";
}

export const highlighterSelected= id =>{
    document.querySelector(`a[href *="${id}"]`).classList.add('results__link--active');
}
/**
 * title = push tamato with catchup in spanish 
 * starting acc= 0 and curr.length = 4 [push ]
 * acc= 0 / acc+ curr.length = 4  newTitle = ['push']
 * acc= 4/ acc+curr.length = 10 newTitle= ['push' 'tamato']
 * acc= 10/ acc+curr.length = 14 newTitle= ['push' 'tamato' 'with']
 * acc= 14/ acc+curr.length = 22 newTitle= ['push' 'tamato' 'with']
 */
const titleLengthLimit = (title, limit = 17) => {
    const newTitle = [];
    if (title.length >= limit) {

        title.split(' ').reduce((acc, curr) => {

            if (acc + curr.length <= limit) {
                newTitle.push(curr);

            }
            return acc + curr.length;
        }, 0);
        return `${newTitle.join('  ')}...`;
    }
    return title;
}

const renderRecepi = recepi => {

    const markUp = `
         
     <li>
     <a class="results__link " href="#${recepi.recipe_id}">
         <figure class="results__fig">
             <img src=${recepi.image_url} alt="Test">
         </figure>
         <div class="results__data">
             <h4 class="results__name">${titleLengthLimit(recepi.title)}</h4>
             <p class="results__author">${recepi.publisher}</p>
         </div>
     </a>
 </li>
     `;

    elements.searchresList.insertAdjacentHTML('beforeend', markUp);
}
const createButton = (page, type) => `
         
             <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
             <span>page ${type === 'prev' ? page - 1 : page + 1}</span>
                 <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                    </svg>
                 
                </button>
  `;

const renderButton = (page, numResult, perPageResult) => {

    const pages = Math.ceil(numResult / perPageResult);
    let button;
    if (page === 1 && pages > 1) {
        // only one button to next 
       // console.log(page);
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Both Back and next Button
        button = `${createButton(page, 'next')}
                ${createButton(page, 'prev')}`;

    } else if (page === pages) {

        // only back button is here
        button = createButton(page, 'prev');
    }
    elements.searchResPage.insertAdjacentHTML('afterbegin', button);

};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // render results of currente page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecepi);

    // render pagination buttons
    renderButton(page, recipes.length, resPerPage);
};