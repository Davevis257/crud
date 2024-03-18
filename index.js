const http = require('http');

// Data placeholders for books and authors
let books = [];
let authors = [];

// Function to extract authentication username and password from the header
function extractCredentials(headers) {
    const authHeader = headers.authorization;
    if (authHeader && authHeader.startsWith('Basic ')) {
        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
        const [username, password] = credentials.split(':');
        return { username, password };
    }
    return null;
}

// Function to handle incoming requests
function handleRequest(req, res) {
    //  Get the authentication username and password from the header
    const credentials = extractCredentials(req.headers);
    if (!credentials) {
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        res.end('Unauthorized');
        return;
    }

    //  Free up the body to be able to carry payload for other method types
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        req.body = body;

        //  Adding more endpoints for books [GET, POST, PUT, PATCH, DELETE]
        if (req.url === '/books' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(books));
        } else if (req.url === '/books' && req.method === 'POST') {
            const newBook = JSON.parse(req.body);
            books.push(newBook);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newBook));
        } else if (req.url.startsWith('/books/') && req.method === 'PUT') {
            
        } else if (req.url.startsWith('/books/') && req.method === 'PATCH') {
            
        } else if (req.url.startsWith('/books/') && req.method === 'DELETE') {
            
        }

        //  Adding more endpoints for authors [GET, POST, PUT, PATCH, DELETE]
        else if (req.url === '/authors' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(authors));
        } else if (req.url === '/authors' && req.method === 'POST') {
            const newAuthor = JSON.parse(req.body);
            authors.push(newAuthor);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newAuthor));
        } else if (req.url.startsWith('/authors/') && req.method === 'PUT') {
            
        } else if (req.url.startsWith('/authors/') && req.method === 'PATCH') {
            
        } else if (req.url.startsWith('/authors/') && req.method === 'DELETE') {
            
        }

        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    });
}


const server = http.createServer(handleRequest);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
