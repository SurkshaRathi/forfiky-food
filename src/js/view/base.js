export const elements = {
   searchInput: document.querySelector('.search__field'),
   searchForm: document.querySelector('.search'),
   searchresList: document.querySelector('.results__list'),
   searchRes: document.querySelector('.results'),
   searchResPage:document.querySelector('.results__pages'),
   searchReList: document.querySelector('.results'),
   recepi:document.querySelector('.recipe')
}

export const elementString ={
   loader:'loader'
};


export const randerLoader = parent => {

   const loader = `
          <div class= "${elementString.loader}">
                <svg>
                     <use href="img/icons.svg#icon-cw"></use>
          
               </svg>
          </div>
   `;
   parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader= () =>{

const loader = document.querySelector(`.${elementString.loader}`);
if(loader) loader.parentElement.removeChild(loader);
}