var Component = require("../lib/component-module");
var fs =       require('fs');
describe("Compiled component",function(){
   var data = {"foo":"dataFoo","bar":"dataBar"};
   var template =  fs.readFileSync('test/components/test-component/template.html').toString();
   var content = '<h3 class="test">TERE TAURI</h3>';
   var comp = new Component(template,data,content);
   var compiled = comp.compile();

   it("does not contain mustache tags",function(){
      expect(compiled).not.toMatch(/({+\s*[#/^>]?\s*)\w+.(}+)+/);
   });

    it("includes innerHTML content",function(){
       expect(compiled).toEqual(jasmine.stringMatching(content));
    });

   it("callback function",function(done){
      comp.compile(function(err,data){
         expect(compiled).not.toMatch(/({+\s*[#/^>]?\s*)\w+.(}+)+/);
         expect(compiled).toEqual(jasmine.stringMatching(content));
         done();
      })
   })
});
