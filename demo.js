const http = require('http');
const fs = require('fs');



function serverStaticFile(res, path, contentType, resCode){
    if(!resCode) resCode = 200;

    fs.readFile(__dirname+path, function(err,data){
        if(err){
            res.writeHead(500,{'Content-Type':'text/plain'});
            res.end('Internal Error');
        }else{
            res.writeHead(resCode,{'Content-Type':contentType});
            res.end(data);
        }
    });
}

http.createServer(
    function(req,res){
        let path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();

        switch(path){
            case '': 
                serverStaticFile(res,'/public/home.html','text/html');
            break;
            case '/about':
                serverStaticFile(res,'/public/about.html','text/html');
            break;
            case '/wind':
                serverStaticFile(res,'/public/wind.png','image/png');
            break;
            default:
                serverStaticFile(res,'/public/404.html','text/html',404);
        }
    }
).listen(3000);

console.log('Server is running on localHost:3000');