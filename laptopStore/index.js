// NOTE: This is just a basic server with Node, doing with Express is much simpler and efficient than this.

const fs = require('fs'); // used for file reading;
const http = require('http');
const url = require('url');

// '__dirname' is the absolute path leading and also including 'laptopStore/'
const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8'); // synchronous
//console.log(__dirname);

const laptopData = JSON.parse(json);

// Creates server
const server = http.createServer((req, res) => {
    // Called each time the server is accessed
    // console.log('Somenone did access the server!');

    //console.log(req.url);
    const pathName = url.parse(req.url, true).pathname; // We just want the path name in this case
    //console.log(pathName);

    //console.log(url.parse(req.url, true));
    //console.log(url.parse(req.url, true).query);
    const id = url.parse(req.url, true).query.id;

    // PRODUCT OVERVIEW
    // if pathName is '/product' or empty, redirect to 'first' page 
    if (pathName === '/products' || pathName === '/') {
        // Send a response to the page to load something
        res.writeHead(200, { 'Content-type': 'text/html' }); // status of the response, 200 in this case, which means 'ok'
        //res.end('This is the Products page!'); // response sent;

        fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
            let overviewOutput = data;

            fs.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, data) => {
                
                //remember, join will turn the array data into a string readable by the browser :D
                const cardsOutput = laptopData.map(e => replaceTemplate(data, e)).join(''); 
                overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput);
                res.end(overviewOutput);

                console.log(err);
            });

            console.log(err);
        });
    }

    // LAPTOP DETAIL
    // && ensures that the id is always less than laptopData size(laptopData is an array);
    else if (pathName === '/laptop' && id < laptopData.length) {
        // Send a response to the page to load something
        res.writeHead(200, { 'Content-type': 'text/html' }); // status of the response, 200 in this case, which means 'ok'
        //res.end(`This is the Laptop page for laptop ${id}!`); // response sent;

        // asynchronous when a function is passed
        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
            const laptop = laptopData[id];
            
            res.end(replaceTemplate(data, laptop));
        });
    }

    // IMAGES 
    else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)){
        fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
            res.writeHead(200, { 'Content-type': 'image/jpg' });
            res.end(data);
        });
    }

    // ERROR - URL NOT FOUND
    else {
        // Send a response to the page to load something
        res.writeHead(404, { 'Content-type': 'text/html' }); // status of the response, 200 in this case, which means 'ok'
        res.end('URL was not found on the server!'); // response sent;
    }
});

// Server listening
server.listen(1337, 'localhost', () => {
    // Listens for requests in real time :D
    console.log('Listening for requests now');
});

function replaceTemplate(originalHtml, laptop) {
    // chain, one of the parameters is a regex string, a normal can be used as well but less effectively 
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName); // returns string, only replaces first occurance;
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);

    return output;
}