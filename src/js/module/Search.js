import axios from 'axios';
import{Key,proxy} from '../module/config';

export default class Search{
   
  constructor(query){
   this.query= query;
  }
   
  async  getresult(){

    
   
     try{
      const response= await axios(`${proxy}http://food2fork.com/api/search?key=${Key}&q=${this.query}`);
      this.result = response.data.recipes;
     //console.log(response);
    console.log(this.result)
     }
     catch(err){
       alert(err);
     }
    
  }

}





