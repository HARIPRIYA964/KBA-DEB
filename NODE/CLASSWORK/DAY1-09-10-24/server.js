//server creation

const http = require('http');
const server = http.createServer((req,res)=>{
    res.statusCode =200;
    res. setHeader('content-Type', 'text/plain');
    res. end('Hello from server! \n');

});
server.listen(3000,'127.0.0.1', () =>{
    console.log('server running at http://127.0.0.1:3000/')
});