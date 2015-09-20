module.exports = function(grunt) {
    grunt.registerMultiTask('default', 'My "default" task description.', function () {
        var compiler = require("../../lib/compiler.js");
        var options = this.options({
            //default values
            componentsDir:  "components",
            viewsDir:       "views"
        });
        var files = this.filesSrc;
        var count = 1;
        var filesCount = files.length;
        var componentsList = grunt.file.expand({cwd:options.componentsDir},'*');
        var done = this.async();
        var fileMap ={};

        //view files
        this.files.forEach(function(fileObj){
            var _dest = fileObj.dest;
            var _files = fileObj.src.filter(function(filepath){
                // Remove nonexistent files (it's up to you to filter or warn here).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            });
            _files.forEach(function(file){
                fileMap[file] = _dest;
                compiler(file,componentsList,options.componentsDir, function(err,contents,fileSrc){
                    if(err){
                        return console.error(err);
                    }
                    //write file
                    grunt.file.write(fileMap[fileSrc], contents);
                    if(count++ == filesCount){
                        // All done!
                        done();
                    }
                });
            });


        });

    });

}


    //grunt.log.writeln('Currently running the "default" task.');
    // grunt.log.writeln( JSON.stringify( grunt.config() ));
    //grunt.log.writeln("conf Options :", JSON.stringify( this.options() ));
    //console.log("Files :",  JSON.stringify(this.files ));

    //grunt.log.writeln(JSON.stringify(this.files));
    //grunt.log.writeln(JSON.stringify(this.filesSrc));
    //this.filesSrc.forEach(function(file) {
        //    grunt.log.writeln("# ",file);
        //
        //   var contents = file.filter(function (filepath) {
        //       // Remove nonexistent files (it's up to you to filter or warn here).
        //       if (!grunt.file.exists(filepath)) {
        //           grunt.log.warn('Source file "' + filepath + '" not found.');
        //           return false;
        //       } else {
        //           return true;
        //       }
        //   }).map(function (filepath) {
           //    // Read and return the file's source.
           //   // grunt.log.writeln(filepath);
           //    return grunt.file.read(filepath);
           //})
           //
           // grunt.log.writeln(contents);
       //});

    //});
