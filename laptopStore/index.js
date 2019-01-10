// NOTE: This is just a basic server with Node, doing with Express is much simpler and efficient than this.

const fs = require('fs'); // used for file reading;
const http = require('http');
const url = require('url');

// '__dirname' is the absolute path leading and also including 'laptopStore/'
const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
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
    
    // if pathName is '/product' or empty, redirect to 'first' page 
    if (pathName === '/product' || pathName === '/') {
        // Send a response to the page to load something
        res.writeHead(200, {'Content-type': 'text/html'}); // status of the response, 200 in this case, which means 'ok'
        res.end('This is the Products page!'); // response sent;
    } 
    
    // && ensures that the id is always less than laptopData size(laptopData is an array);
    else if (pathName === '/laptop' && id < laptopData.length) {
        // Send a response to the page to load something
        res.writeHead(200, {'Content-type': 'text/html'}); // status of the response, 200 in this case, which means 'ok'
        res.end(`This is the Laptop page for laptop ${id}!`); // response sent;
    }

    else {
        // Send a response to the page to load something
        res.writeHead(404, {'Content-type': 'text/html'}); // status of the response, 200 in this case, which means 'ok'
        res.end('URL was not found on the server!'); // response sent;
    }
});

// Server listening
server.listen(1337, 'localhost', () => {
    // Listens for requests in real time :D
    console.log('Listening for requests now');
});