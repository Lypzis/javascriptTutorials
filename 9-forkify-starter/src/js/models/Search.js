////////////////////////////////////////////////////////////
// doc: retrives data from search queries

import axios from 'axios'; // works like fetch but is instead supported by most of the browsers

export default class Search {

    constructor(query){
        this.query = query;
    }

    // async method of the class to return the recipes data
    async getResults(){   
        // cross origin test with cors-anywhere, since the cors is not handled by the owners of this API
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        
        // API key
        const key = '8092d77f911d7f024b2081f0d87a294b';
        
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

