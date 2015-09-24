/**
 * Created by taurni on 29.08.2015.
 */
module.exports = function ( htmlSrc,componentList,componentsDir, callback ){
    var cheerio =   require("cheerio");
    var hogan =     require('hogan.js');
    var fs =        require('fs');
    var Component = require("./component-module");
    var $ = cheerio.load(fs.readFileSync(htmlSrc).toString()); //TOSTR
    var count = 0, ready = 0;

    /* Search which components are in use.
     loop over components */
    for (var i = 0; i < componentList.length; i++){
        var componentName = componentList[i];
        var $components = $(componentName); //find the component in view
        var cmpLen = $components.length;//how many occurs

        if(cmpLen > 0) {
            count += cmpLen;
            var compTmpl = fs.readFileSync(componentsDir+'/'+componentName+'/template.html').toString()

            //over occurrences
            for (var c = 0; c < cmpLen; c++) {
                var comp = $components[c];
                var cmpAtr = $(comp).attr();
                var cmpCont = $(comp).html();
                var component = new Component( compTmpl,cmpAtr,cmpCont);

                component.compile(function(err,data){
                    //replace data in componenet
                    $(comp).replaceWith(data);
                    ready++;
                    done();
                });
            }
        }
    }
    done();

    //check if all components are done and call callback function
    function done(){
        if(count == ready && i+1 >= componentList.length) {
            callback(null, $.html(),htmlSrc); //module return
        } else{
        return false;
        }
    }

};