////////////////////////////////////////////////////////////
// doc: retrives data from search queries

import axios from 'axios'; // works like fetch but is instead supported by most of the browsers
import {key, proxy} from '../config';

export default class Search {

    constructor(query){
        this.query = query;
    }

    // async method of the class to return the recipes data
    async getResults(){   
        // Error handling
        try {
            // AJAX request to the API
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
    
            // only the recipes(data) will be important to receive 
            this.result = res.data.recipes;
            
            return this.result;     
    
        } catch (error){
            alert(error);
        }
       
    }
} 

