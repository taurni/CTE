/**
 * Created by taurni on 29.08.2015.
 */
module.exports = Template;

var cheerio =   require("cheerio");
var fs =        require('fs');
var Component = require("./component-module");


function Template ( template,componentList,componentsDir ) {
    this.template = template;
    this.componentList = componentList;
    this.componentsDir = componentsDir;

}

/**
 * Template compiler.
 * Replace component tags with component template
 * @param callback
 */
Template.prototype.compile = function(callback) {
    var _inUse = findComponents(this.template, this.componentList);
    var count = _inUse.length; //count of components occurrences what needs replacement
    var ready = 0; //count of components what haw been replaced
    var that = this;

    //template does not contain any components
    if (_inUse.length == 0) {
        callback(null, this.template);
        return;
    }

    this.template = replaceComponents(this.template, _inUse);
    done();

    //check if all components are done and call callback function
    function done() {
        //if (count == ready && that.components + 1 >= _cmps.length) {
        if (count == ready ) {
            callback(null, that.template); //module return
        } else {
            return false;
        }
    }

    /**
     * Search which components the template is using
     * @param template
     * @param componentList - list of available components
     * @returns {Array,null} Array of component names or null
     */
    function findComponents(template, componentList) {
        var $ = cheerio.load(template);
        var _components = [];
        for (var i = 0; i < componentList.length; i++) {
            var comp = $(componentList[i]);
            if (comp.length > 0) {
                _components.push(componentList[i]);
            }
        }
        //retun components
        return _components;
    }

    /**
     * Find component definition tag in template and replace
     * @param template
     * @param cmps
     * @returns {*}
     */
    function replaceComponents(template,cmps){
        for (var i = 0; i < cmps.length; i++) {
            //replace all occurrences
            template = replaceComponent(template, cmps[i])
        }

        return template;
    }

    /**
     * Replace all components
     * @param template
     * @param componentName
     */
    function replaceComponent(template, componentName) {
        var $ = cheerio.load(template);
        var $components = $(componentName); //find the component in view
        var cmpLen = $components.length;//how many occurs

        count += (cmpLen-1);

        var compTmpl = fs.readFileSync(that.componentsDir + '/' + componentName + '/template.html').toString();

        for (var i = 0; i < cmpLen; i++) {
            var comp = $components[i];
            var cmpAtr = $(comp).attr();
            var cmpCont = $(comp).html();
            var component = new Component(compTmpl, cmpAtr, cmpCont);

            component.compile( function (err, data) {
                //Component in Component CHECK !!
                var cc = findComponents(data,that.componentList);
                if(cc.length != 0 ){
                    count += cc.length;
                    data = replaceComponents(data, cc)
                }

                //replace data in componenet
                $(comp).replaceWith(data);
                ready++;
            });
        }
        return $.html();
    }

};