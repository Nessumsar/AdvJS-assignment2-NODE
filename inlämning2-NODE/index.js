var http = require('http');
var url = require('url');
var fs = require('fs');

var secretKey = '/secret?key=VERYSECRET';
var path = require('path');    
var filePath = path.join(__dirname, 'public-info.txt');
var fileContent;


function readFile(){
    fs.readFile(filePath, 'UTF8', (err, data) => {
        if(err){
            console.log(err);
            return null;
        }else{
            fileContent = data;
            return fileContent;
        }
    });
}

readFile();


http.createServer(respond).listen(3000, () => {
console.log('Server is active on port 3000')
});



function respond(req, res){

    let params = url.parse(req.url, true);

    console.log(params.href);
    
    if(params.href == "/"){
        res.write(`<h1>Publik info: </h1> <p> ${fileContent}`)
    }


    if(params.href == secretKey){
        res.write(`<p>Ändra texten i textfil!</p>
            
        <textarea name="textarea" id="textarea" cols="30" rows="30">${fileContent}
        </textarea>
        <br>
        <br>
        <input type="submit" class="submit" onclick="${updateTxt()}">`);
    }

    res.end();
}


function updateTxt(){
    var textarea = document.getElementById('textarea');
    let newInfo = textarea.textContent;

    fs.writeFile(filePath, newInfo, (err) => {
        if(err){
            console.log(err)
            return null;
        }
        console.log('win');
    })

}