/**
 * input (listOfViews/dir?, componentDir,)
 * @type {*|exports|module.exports}
 */
var compiler = require("./lib/compiler.js");
var fs =        require('fs');
var componentsDir = "components";
//var htmlString = fs.readFileSync('views/test.html').toString();
//var $ = cheerio.load(htmlString);

//collect components
fs.readdir(componentsDir,function(err,componets){
    if(err){
        throw err;
        return console.error(err);
    }

    compiler('views/test.html',componets,function(err,data){
        fs.writeFile("build/test.html", data, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });
    })
});