import axios from 'axios'; // works like fetch but is instead supported by most of the browsers
import { key, proxy } from '../config';

export default class Recipe {
    constructor(id) { //needs only the id of the recipe
        this.id = id;
    }

    async getRecipe() {
        try {
            // AJAX request to the API
            const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);

            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
            // only the recipes(data) will be important to receive 
        } catch (error) {
            alert(error);
        }
    }

    // assumes that for each 3 ingredients, increases 15 minutes
    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4; // :D
    }

    // "filters" useless information and leaves only the usefull stuff
    parseIngredients() {
        // The way that it is received from the server
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        // The way that it is wanted to be
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const units = [...unitsShort, 'kg', 'g'];

        // manipulate each ingredient(it is a string) from the ingredients array
        const newIngredients = this.ingredients.map(e => {
            // 1) Uniform units
            let ingredient = e.toLowerCase(); // converts everything to lower case.
            // every each unitLong
            unitsLong.forEach((unit, i) => { 
                // replace the unit for the respective unitShort 
                ingredient = ingredient.replace(unit, unitsShort[i]);
            })

            // 2) Remove text between parentheses and the parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' '); // regex.

            // 3) Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(e2 => units.includes(e2)); // checks if it is a valid ingredient and returns the index if true.

            let objIngredient;
            if(unitIndex > -1){
                // There is a unit
                const arrCount = arrIng.slice(0, unitIndex); // assuming the first character is a number. ex. 4 1/2 is [4, 1/2]; 4 cups, arrCount is [4]
                
                let count;
                if(arrCount.length === 1){
                    count = eval(arrIng[0].replace('-', '+')); // evaluate if it is an account and get the result of it.
                } // if more than a number
                else {
                    count = eval(arrIng.slice(0, unitIndex).join('+')); //  [4, 1/2] --> eval("4+1/2") --> 4.5
                }

                objIngredient = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }
            }else if(parseInt(arrIng[0], 10)){
                // There is NO unit, if it is something that can be converted to a decimal number.
                objIngredient = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ') // starts from one(jumping 0) and goes all the way to the end of the array, then, turn the array back to be a string.
                }
            } 
            else if(unitIndex === -1){
                // There is NO unit and NO number in first position
                objIngredient = {
                    count: 1,
                    unit: '',
                    ingredient 
                } // ingredient inside the object will have an automatically assigned value
            }

            return objIngredient;
        });

        this.ingredients = newIngredients;
    }
}