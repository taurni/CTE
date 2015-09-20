var compiler = require("../lib/compiler.js");
var fs =       require('fs');
var components = [
   // "test-content",
   // "test-parameter",
    "test-replace"
];
var componentsDir = "test/components";
//jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
describe("Can compile components:",function(){

    it("replaces component tag with component template",function(done){
        var result = fs.readFileSync(componentsDir+'/test-replace/template.html').toString();
        compiler('test/views/view.html',components,componentsDir,function(err,content,fileSrc){
            if(err){
                return console.error(err);
                done();
            }
            this.content = content;
            expect(this.content).toEqual(result);
            done();
        });

    });
    //it("inserts parameters as variables");
    //it("inserts components tag inner HTML as component content");

});