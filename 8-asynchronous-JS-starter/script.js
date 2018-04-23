//////////////////////////////////////////////////////////
// Synchronous, execute in order
/*
const second = () => {
    console.log('Second');
}

const first = () => {
    console.log('Hey there');
    second();
    console.log('The End!');
}

first();
*/

/////////////////////////////////////////////////////////
// Asynchronous
// -Allows asynchonous functions to run in the "background";
// -Callback runs once the function has finished its work;
// -Move on immediately: Non-blockink! No need to wait for the end of a big task to move on to the next;
// -Note: Search Event Loop to know more!!!
/*
const second = () => {
    //executes after 3000ms = 3 seconds
    setTimeout( () => {
        console.log('Async Hey There');
    }, 3000);
}

const first = () => {
    console.log('Hey there');
    second();
    console.log('The End!');
}

first();
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////
// Asynchronous old way
// Warning: might become a callback hell! Functions inside functions and this inside another and so on
/*
function getRecipe() {
    //first
    setTimeout(() => {
        const recipeID = [523, 883, 432, 974];
        console.log(recipeID);

        // second
        setTimeout(id => {

            const recipe = {
                title: 'Fresh tomato pasta',
                publisher: 'Victor'
            }

            console.log(`${id}: ${recipe.title}`);

            // last
            setTimeout(publisher => {

                const recipe2 = {
                    title: 'Italian Pizza',
                    publisher: publisher
                }

                console.log(recipe2);
                console.log(`Made by: ${recipe2.publisher}`);

            }, 1500, recipe.publisher);

        }, 1000, recipeID[2]);

    }, 1500);

}

getRecipe();
*/

////////////////////////////////////////////////////////////////////////////////////
// Promises: callback hell solution
// -Object that keeps track about whether a certain event has happened already or not;
// -Determines what happens after the event has happened;
// -Implements the concept of a future value that we're expecting

// Three functions with promises
// if promise sucessfull: use resolve else use reject, basycally try and catch from Java
const getIDs = new Promise((resolve, reject) => {

    // this timer is for sure to end(sucess), so it woldn't be necessary to call reject here
    setTimeout(() => {
        resolve([523, 883, 432, 974]); //sucess return
        reject('Fatal Error!'); //fail return
    }, 1500);

})

const getRecipe = recId => {
    return new Promise((resolve, reject) =>{

        setTimeout( (ID) => {
            const recipe = {
                title: 'Fresh tomato pasta',
                publisher: 'Victor'
            }

            resolve(`${ID}: ${recipe.title}`);
        }, 1500, recId);
            
    })
}

const getRelated = publisher => {
    return new Promise( (resolve, reject) =>{
        
        setTimeout( pub => {
            const recipe = {
                title: 'Italian Pizza',
                publisher: pub
            }

            resolve(`${pub}: ${recipe.title}`);
        }, 2000, publisher);

    });
}

// consumation of the promises
// result in case of execution sucess is the array, :D
// the argument is the result of resolve;
// get ids then return one of the recipes and then prints it
getIDs
    .then(IDs => {
        console.log(IDs);

        return getRecipe(IDs[2]);
    })
    .then( recipe => {
        console.log(recipe);

        return getRelated('Victor');
    })
    .then( result => console.log(result) )
    .catch( error => console.log(error) );
