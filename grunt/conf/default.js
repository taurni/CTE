module.exports = {
    options:{
        componentsDir: "app/components",
    },

    foo:{
        files:[
            //{src: 'app/views/test.js', dest: 'build/TEST.html'},
            {
                expand:true,
                cwd:'app/views',
                src: '*.html',
                dest: 'build/'
            }
        ]
    },

}