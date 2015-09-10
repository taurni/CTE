module.exports = {
    options:{
        componentsDir: "components",
    },

    foo:{
        files:[
            //{src: 'views/*.html', dest: 'build/TEST.html'},
            {
                expand:true,
                cwd:'views',
                src: '*.html',
                dest: 'build/'
            }
        ]
    },

}