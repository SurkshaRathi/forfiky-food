
import Search from './module/Search';
import {elements,randerLoader,clearLoader} from './view/base';
import * as searchView from './view/searchView';
import Recepi from './module/Recepi';
import * as RecepiView from './view/recepiView';
 
 const state = {};



 /* 
    Search Control Module
 */

const searchControl= async ()=> {
    
  // 1 get the query from SearchView
  const query= searchView.getInput();
 // console.log(query);
 //const query = 'Pizza';

  //2 search the query in Search object
  if(query){
    state.search = new Search(query);

    // prepare the uI for Result 
    searchView.clearInput();
    searchView.clearResult();
    randerLoader(elements.searchRes);

     //3 Display Spinner on the UI
   try {
  //4 Search for Recpies
   await state.search.getresult();
   clearLoader();

  //5 Render the Result on the UI
  searchView.renderResults(state.search.result);
   }catch(error){
     console.log(error);
     alert('something went  wrong in search');

   }
  }
 
}

 elements.searchForm.addEventListener('submit', e=>{
e.preventDefault();
searchControl();
})
 

elements.searchResPage.addEventListener('click',e=>{
  const btn= e.target.closest('.btn-inline');
  if(btn){
    const gotoPage =parseInt( btn.dataset.goto,10);
    searchView.clearResult();
    searchView.renderResults(state.search.result,gotoPage);
    
    //console.log(gotoPage);
  }
})


/**
 * Recepi Control Module
 */

 const controlRecepi= async ()=>{
   const id = window.location.hash.replace('#','');
   console.log(id);
   if(id){
     // prepare UI for Change 
     RecepiView.clearRecepi();
     // get recepi data
     randerLoader(elements.recepi);
     if(state.recepi) searchView.highlighterSelected(id);
     state.recepi = new Recepi(id);
     
    
     try{
        //get recepi data  and passing ingredients
    
      await state.recepi. getRecipe();
      state.recepi. parseIngredients();
       //calculate serving time 
    state.recepi.calcTime();
   state.recepi.calcServings();
      console.log(state.recepi);
      // render recepi 
      clearLoader();
      RecepiView.randerRecepi(state.recepi);
     }
     catch(error){
       console.log(error);
       alert("Something Went wrong in Recepi controller");
     }
    
   }
}
//window.addEventListener('hashchange',controlRecepi);
['hashchange','load'].forEach(event=> window.addEventListener(event,controlRecepi));






 