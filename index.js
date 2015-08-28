/**
 * input (failMidaParsida, KustOtsidaKomponente, JSONdata?, callback)
 * @type {*|exports|module.exports}
 */

var cheerio =   require("cheerio");
var fs =        require('fs');
var hogan =     require('hogan.js');
var components;
var componentsDir = "components";

var htmlString = fs.readFileSync('views/test.html').toString();
var $ = cheerio.load(htmlString);
//collect components
fs.readdir(componentsDir,function(err,dir){
    if(err){
        throw err;
        return console.error(err);
    }
    components = dir;
    compileDom();
});

//compiles custom tags into predefined component html
function compileDom(){
    // search components
    for (var i = 0; i < components.length; i++){
        var componentName = components[i];
        var $component = $(componentName);

        //1 component may be more than once
        for(var c = 0; c < $component.length; c++){
           // console.log($component[c].tagName)
            var cmpAtr = $($component[c]).attr();
            var cmpCont = $($component[c]).html();
            var templeate  = compileComponent(
                    fs.readFileSync('components/'+componentName+'/templeate.html').toString(),
                    $($component[c]).attr()
                );
            console.log(componentName,":",cmpCont);
            if(cmpCont != "undefined"){
                debugger;
                var $c =  cheerio.load(templeate);
                $c('content').replaceWith(
                    cmpCont
                )
            }
            $($component[c]).replaceWith(
                $c.html()
            );
        }
    }
    //console.log($.html())
    fs.writeFile("build/test.html", $.html(), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}

//compiles mustache süntax inside component templeate
function compileComponent(templeate,data){
    return hogan.compile(templeate).render(data);
}

//content insert
function insertConten(){
    var $c = cheerio.load(htmlString);
}