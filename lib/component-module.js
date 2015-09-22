/*
 * Component compiler
 * It compiles template, data and content
 */
var hogan =     require('hogan.js');
var cheerio =   require("cheerio");

/**
 *
 * @param compStr {String} - component template
 * @param data {JSON} - mustache(hogan) data
 * @param content {String} - content data
 * @constructor
 */
function Component(compStr,data,content){
    this.template = compStr;
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
 * Compiles data
 * @returns {String}
 */
Component.prototype.compile = function(){
    this.compiled = renderData(this.template,this.data);
    this.compiled = insertContent(this.compiled,this.content);

    return this.compiled;
};

/*
    Render mustache
 */
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