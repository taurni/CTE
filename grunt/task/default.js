module.exports = function(grunt) {
    grunt.registerMultiTask('default', 'My "default" task description.', function () {
        //grunt.log.writeln('Currently running the "default" task.');
        // grunt.log.writeln( JSON.stringify( grunt.config() ));
        //grunt.log.writeln("conf Options :", JSON.stringify( this.options() ));
        //console.log("Files :",  JSON.stringify(this.files ));

        grunt.log.writeln(JSON.stringify(this.files));

        this.files.forEach(function(file) {
           // grunt.log.writeln(i++,file.src);
           var contents = file.src.filter(function (filepath) {
               // Remove nonexistent files (it's up to you to filter or warn here).
               if (!grunt.file.exists(filepath)) {
                   grunt.log.warn('Source file "' + filepath + '" not found.');
                   return false;
               } else {
                   return true;
               }
           }).map(function (filepath) {
               // Read and return the file's source.
              // grunt.log.writeln(filepath);
               return grunt.file.read(filepath);
           })

            grunt.log.writeln(contents);
       });

    });
}