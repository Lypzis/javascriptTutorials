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
/*
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
*/

/////////////////////////////////////////////////////////////
// Async/Await
/*
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

// ES7 feature, an asynchronous function which returns a promise
async function getRecipeAW(){
    //after fullfilment of the promise, IDs gets resolve
    const IDs = await getIDs; 
    console.log(IDs);

    const recipe = await getRecipe(IDs[3]);
    console.log(recipe);

    const pub = await getRelated('Victor');
    console.log(pub);

    return recipe; // async function always retuns yet... ANOTHER promise
}

// then we consume the result
getRecipeAW().then(result => console.log(`da best ${result}!!!`));
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AJAX and APIs
// AJAX => Asynchronous Javascript And XML, allows request and response from a remote server
// API => Application Programing Interface, I can my own API receives data from my server or a 3rd-party API like Google Maps

////////////////////////////////////////////////////////////////////
// Making AJAX calls with Fetch and Promises
/*
// use crossorigin request to test: https://cors-anywhere.herokuapp.com/ 
// https://www.metaweather.com/api/location/(woeid)/  => where on earth id
// fetch gets data from the API
function getWeather(woeid) {

    fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
        .then(result => {
            //console.log(result); //json data received from the server;
            return result.json(); //converts to javascript object data;
        })
        .then(data => {
            //console.log(data);
            const today = data.consolidated_weather[0];

            console.log(`Today\'s temperature in ${data.title} stays \nbetween ${today.min_temp} and ${today.max_temp}.`);
        })
        .catch(error => console.log(error));

}

getWeather(44418); // London
getWeather(2487956); // San Francisco
//getWeather(2487344355456223344326); // Error simulation
*/

//////////////////////////////////////////////////////////////////////
// Making AJAX calls with Fetch and Async/await *Very Cool!!
async function getWeatherAW(woeid) {

    try {

        const jsonData = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);
        const jsObject = await jsonData.json();

        const today = jsObject.consolidated_weather[0];

        console.log(`Today\'s temperature in ${jsObject.title} stays \nbetween ${today.min_temp} and ${today.max_temp}.`);

        return jsObject; // optional

    } catch (error) {

        alert(error);
        console.log('An Fatal Error Ocurred! :O');
    
    }

}

// London
getWeatherAW(44418)
    .then(result => console.log(result)); // handles the result of try from the promise method
// San Francisco
getWeatherAW(2487956)
    .then(result => console.log(result));
//getWeatherAW(2487344355456223344326); // Error simulation
