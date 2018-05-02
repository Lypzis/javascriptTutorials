///////////////////////////////////////////////////////////////////
// Global app controller

import Search from './models/Search';

import * as searchView from './views/searchView';
import { elements } from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Sopping list object
 * - Liked recipes
 */
const state = {};

// an async expression function
const controlSearch = async () => {
    //1 - get the query from the view
    const query = searchView.getInput();

    if (query) {
        // 2 - New search object and add it to state
        state.search = new Search(query);

        // 3 - Prepare the UI for results
        searchView.clearInput();
        searchView.clearResults();

        // 4 - Search for recipes
        await state.search.getResults();

        // 5 - Render results on UI
        searchView.rederResults(state.search.result);
    }
  
}

elements.searchForm.addEventListener('submit', event => {
    event.preventDefault();

    controlSearch();
});




// testing the async function
/*search.getResults()
    .then( recipes => console.log(recipes[0]))
    .catch( error => console.log(error));
*/


// key = 8092d77f911d7f024b2081f0d87a294b
// API URL for search requests
// http://food2fork.com/api/search 
// and this for recipe requests: 
// http://food2fork.com/api/get 