module.exports = {
    options:{
        componentsDir: "components"
    },

    foo:{
        files:[
            {src: 'views/*.html', dest: 'build/'},
            {src: 'views-1/*.html', dest: 'build/'}
        ]
    },

}