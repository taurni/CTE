/**
 * Created by taurni on 29.08.2015.
 */
module.exports = Template;

var cheerio =   require("cheerio");
var hogan =     require('hogan.js');
var fs =        require('fs');
var Component = require("./component-module");


function Template ( template,componentList,componentsDir ) {
    this.template = template;
    this.componentList = componentList;
    this.componentsDir = componentsDir;
}

Template.prototype.compile = function(callback){

    var $ = cheerio.load(this.template); //TOSTR
    var count = 0, ready = 0;
    var that = this;

    /* Search which components are in use.
     loop over components */
    for (var i = 0; i < this.componentList.length; i++){
        var componentName = this.componentList[i];
        var $components = $(componentName); //find the component in view
        var cmpLen = $components.length;//how many occurs

        if(cmpLen > 0) {
            count += cmpLen;
            var compTmpl = fs.readFileSync(this.componentsDir+'/'+componentName+'/template.html').toString()

            //over occurrences
            for (var c = 0; c < cmpLen; c++) {
                var comp = $components[c];
                var cmpAtr = $(comp).attr();
                var cmpCont = $(comp).html();
                var component = new Component( compTmpl,cmpAtr,cmpCont);

                component.compile(function(err,data){
                    //replace data in componenet
                    $(comp).replaceWith(data);
                    // KOMPONENT IN KOMPONENT CHECK !!
                   //& var test = new Template(data,that.componentList,that.componentsDir);
                    //test.compile(function(err,data){

                    //})
                    ready++;
                    done();
                });
            }
        }
    }
    done();

    //check if all components are done and call callback function
    function done(){
        if(count == ready && i+1 >= that.componentList.length) {
            callback(null, $.html()); //module return
        } else{
        return false;
        }
    }

};