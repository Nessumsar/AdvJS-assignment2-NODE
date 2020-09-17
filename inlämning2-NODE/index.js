var http = require('http');
var url = require('url');
var fs = require('fs');

var secretKey = '/secret?key=VERYSECRET';
var path = require('path');    
var txtFilePath = path.join(__dirname, 'public-info.txt');
var fileContent;

function readTxtFile(){
    fs.readFile(txtFilePath, 'UTF8', (err, data) => {
        if(err){
            console.log(err);
            return null;
        }else{
            fileContent = data;
            return fileContent;
        }
    });
}

readTxtFile();

http.createServer(respond).listen(3000, () => {
console.log('Server is active on port 3000')
});

function respond(req, res){
    let params = url.parse(req.url, true);

    if(params.href == "/"){
        res.write(`<h1>Publik info: </h1> <p> ${fileContent}`)
    }


    if(params.href == secretKey){
        res.write(`   
        <h1>This is a very secret page only YOU can access</h1>
        <br>
        <br>
        <p>Just kidding!</p>`);
        
    }

    res.end();
}
