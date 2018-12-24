import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

// limit defaults to 17 the size of titles of recipes being shown
const limitRecipeTitle = (recipe, limit = 17) => {
    const newTitle = [];
    if (recipe.length > limit) {
        //'Pasta with Tomato' turns into an array with 3 elements
        // acc -> accumulator
        // cur -> current
        recipe.split(' ').reduce((acc, curr) => {
            //if accumulator of words plus the current word is <= than the limit,
            //push the current element to the Array newTitle 
            if (acc + curr.length <= limit) {
                newTitle.push(curr);
            }

            return acc + curr.length; // this is the acc which will be passed as an argument in the next callback of reduce
        }, 0); //initial value 0 

        // join is reverse of split
        return `${newTitle.join(' ')} ...`;
    }

    return recipe;
}

//render recipe as an list item
const renderRecipe = recipe => {

    const markup = `<li>
                        <a class="results__link" href="#${recipe.recipe_id}">
                            <figure class="results__fig">
                                <img src="${recipe.image_url}" alt="${recipe.title}">
                            </figure>
                            <div class="results__data">
                                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                                <p class="results__author">${recipe.publisher}</p>
                            </div>
                        </a>
                    </li>`

    elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

// create buttons
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
`;

// num results = total of results, results per page 
const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if (page === 1 && pages > 1) {
        // Button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Both buttons will appear in the page
        // the following is possible because button is a template string
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    }
    else if (page === pages && pages > 1) {
        // Only button to go to the prev page
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin',button);
}

// render each recipe of the array, 10 per page 
export const rederResults = (recipes, page = 1, resPerPage = 10) => {
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage; //its ten, but in slice it will go up to 9, exactly as expected

    // automatically pass the element to the function renderRecipe
    recipes.slice(start, end).forEach(renderRecipe);

    // render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
}