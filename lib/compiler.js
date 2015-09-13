/**
 * Created by taurni on 29.08.2015.
 */
module.exports = function ( htmlSrc,componentList,callback ){
    var cheerio =   require("cheerio");
    var hogan =     require('hogan.js');
    var fs =        require('fs');
    var $ = cheerio.load(fs.readFileSync(htmlSrc).toString());
    var count = 0, ready = 0;

    /* over components */
    for (var i = 0; i < componentList.length; i++){
        var componentName = componentList[i];
        var $components = $(componentName); //find the component in view
        var cmpLen = $components.length;//how many occurs
        if(cmpLen > 0) {
            count += cmpLen;
            //over occurrences
            for (var c = 0; c < cmpLen; c++) {
                compileComponent($components[c], componentName, function (err, data) {
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

    /*Replace custom component tag with component code*/
    function compileComponent(component,componentName,callback){
        var cmpAtr = $(component).attr(); //atributes
        var cmpCont = $(component).html(); //content,innerHTML
        renderComponent(
            //TODO: get components dir from Grunt task/conf
            fs.readFileSync('components/'+componentName+'/template.html').toString(),
            cmpAtr,
            cmpCont,
            function(err,cmpCont,cmpTemplate){
                insertContent(cmpTemplate,cmpCont,function(err,$data){
                    $(component).replaceWith(
                        $data.html()
                    );
                    //TODO: Check if component contains another component
                    callback(null,"done");
                })
            }
        )
    }

    /*Render Mustache data*/
    function renderComponent(template,data,cmpCont,callback){
        callback(null,cmpCont,hogan.compile(template).render(data));
    }

    /*Replace "content" tag with innerHTML*/
    function insertContent(cmpTemplate,cmpCont,callback){
        if(cmpCont != "undefined"){
            var $c =  cheerio.load(cmpTemplate);
            $c('content').replaceWith(
                cmpCont
            );
            callback(null,$c);
        }
    }
};

