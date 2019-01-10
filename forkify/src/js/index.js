///////////////////////////////////////////////////////////////////
// Global app controller

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';

import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Sopping list object
 * - Liked recipes
 */
const state = {};

// an async expression function
/**
 * Search controller
 */
const controlSearch = async () => {
    //1 - get the query from the view
    const query = searchView.getInput();

    // TESTING
    //const query = 'pizza';


    if (query) {
        // 2 - New search object and add it to state
        state.search = new Search(query);

        // 3 - Prepare the UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4 - Search for recipes
            await state.search.getResults();

            // 5 - Render results on UI
            clearLoader();
            searchView.rederResults(state.search.result);

        } catch (err) {
            alert('Something went wrong with the search...');
            clearLoader();
        }
    }

}

/** 
 * Recipe controller
 */
const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // Prepare the UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe); // the spinning wheel

        // Hightlight selected search item 
        if (state.search) searchView.highlightSelected(id);

        // Create new Recipe object
        state.recipe = new Recipe(id);

        // TESTING
        //window.r = state.recipe;

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings in time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
            );

        } catch (err) {
            alert('Error processing recipe');
            console.log(err);
        }
    }
}

/** 
 * List controller
 */
const controlList = () => {
    // create new list if there is none yet
    if (!state.list) state.list = new List();

    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(e => {
        const item = state.list.addItem(e.count, e.unit, e.ingredient);
        listView.renderItem(item);
    });
}

/** 
 * Likes controller
 */
const controlLike = () => {
    if(!state.likes) state.likes = new Likes();

    const currentId = state.recipe.id;

    // User has NOT yet liked current recipe
    if (!state.likes.isLiked(currentId)) {
        // Add like to the state
        const newLike = state.likes.addLike(
            currentId,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like to UI list
        likesView.renderLike(newLike);

    // User HAS yet liked current recipe
    } else {
        // Remove like to the state
        state.likes.deleteLike(currentId);

        // Toggle the like button
        likesView.toggleLikeBtn(false);

        // Remove like from UI list
        likesView.deleteLike(currentId);
    }

    likesView.toggleLikeMenu(state.likes.getNumLikes());
}

// Restore like recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();

    // Restore likes
    state.likes.readStorage(); 

    // Toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render the existing likes 
    state.likes.likes.forEach(like => likesView.renderLike(like));
});

// Handles delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handles the delete event, if 'shopping__delete' or any of its children are clicked
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);

    // Handles count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});

//sets the window to listen to these events, avoiding repetion; 
[
    // events 
    'hashchange',
    'load'
].forEach(event => window.addEventListener(event, controlRecipe));

elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button if clicked 
        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec');

            recipeView.updateServingsIngredients(state.recipe);
        }
    }
    else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button if clicked
        state.recipe.updateServings('inc');
        
        recipeView.updateServingsIngredients(state.recipe);
    }
    else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        // Add ingredients to shopping list
        controlList();
    } 
    else if (e.target.matches('.recipe__love, .recipe__love *')){
        // Like controller
        controlLike();
    }
});


/////////////////////////////////////////////////////////////
// Buttons
elements.searchForm.addEventListener('submit', event => {
    event.preventDefault();

    controlSearch();
});

// event delegation
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        // parse int specifies that it is decimal
        const goToPage = parseInt(btn.dataset.goto, 10); // activates goto function attributed to the button
        searchView.clearResults();
        searchView.rederResults(state.search.result, goToPage);
    };
});