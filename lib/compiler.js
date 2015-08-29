/**
 * Created by taurni on 29.08.2015.
 */
module.exports = function ( htmlString,componentList,callback ){
    var cheerio =   require("cheerio");
    var hogan =     require('hogan.js');
    var fs =        require('fs');
    var $ = cheerio.load(htmlString);
    var count = 0, ready = 0;
    for (var i = 0; i < componentList.length; i++){
        var componentName = componentList[i];
        var $components = $(componentName);
        var cmpLen = $components.length;
        if(cmpLen > 0){
            ready += cmpLen
        }

        for(var c = 0; c < cmpLen ; c++){
            compileComponent($components[c],componentName,function(err,data){
                count ++;
                done();
            });
        }
    }
    done();

    //check if done
    function done(){
        if(count == ready && i+1 == componentList.length) {
            callback(null, $.html()); //module return
        } else{
        return false;
        }
    }

    function compileComponent(component,componentName,callback){
        var cmpAtr = $(component).attr();
        var cmpCont = $(component).html();
        renderComponent(
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

    function renderComponent(template,data,cmpCont,callback){
        callback(null,cmpCont,hogan.compile(template).render(data));
    }

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

