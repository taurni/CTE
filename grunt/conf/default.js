module.exports = {
    options:{
        componentsDir: "app/components",
    },

    foo:{
        files:[
            //{src: 'views/*.html', dest: 'build/TEST.html'},
            {
                expand:true,
                cwd:'app/views',
                src: '*.html',
                dest: 'build/'
            }
        ]
    },

}