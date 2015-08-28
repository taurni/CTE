# Component Template Engine 

This project is inspired by [Polymer Project](https://www.polymer-project.org). I wanted to use DRY coding in HTML but there wasn't tool for my needs. So I decided to make one.
Yes, I could use polymer but making my own sounds like a lot of fun, plus I needed this old browsers support. 

## How this works?
* You define your **components** in separate files. etc. *my-component*
    * Like in web components, use dash in component name!
    * Inside the component definition you can use **mustache** syntax for adding content. (Data by parameters)
    * You can use *\<content\>\</content\>* tag inside a component as a placeholder for component child nodes.
* You make your "view" HTML file(s) and include defined components to view.
    * To include component just add *\<component-name\>\</component-name\>* tag
    * parameters in component are taken as mustache data
     
