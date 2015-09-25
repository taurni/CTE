/*
 * Component compiler
 * It compiles template, data and content
 */
var hogan =     require('hogan.js');
var cheerio =   require("cheerio");

/**
 *
 * @param template {String} - component template
 * @param data {JSON} - mustache(hogan) data
 * @param content {String} - content data
 * @constructor
 */
function Component(template,data,content){
    this.template = template;
    this.data = data;
    this.content = content;
}

/**
 * Debug function
 */
Component.prototype.logParmas = function(){
    console.log(this.template);
    console.log(this.data);
    console.log(this.content);
};

/**
 * Compiles data.
 * If callback is defined data is returned by callback function,
 * els by return.
 * @returns {String}
 */
Component.prototype.compile = function(callback){
    this.compiled = renderData(this.template,this.data);
    this.compiled = insertContent(this.compiled,this.content);

    //components in component check!
    if(callback == undefined){
        return this.compiled;
    }

    callback(null,this.compiled);

};

/* Render mustache */
function renderData(template,data){
   return hogan.compile(template).render(data);
    //return template
}

function insertContent(template,content){
    var $ = cheerio.load(template);
    //find <content> tag and replace;
    $('content').replaceWith(
        content
    );
    return $.html();
}

module.exports = Component;