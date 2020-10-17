# NLW-3
# Initialization
Because of network and cache problems, I had to execute the comand `yarn cache clean` and then `npx create-react-app web --template typescript network-timeout 600000`.

# Tools
## Babel 
Convert newer javascript's version to a format that the browser can read. 

## react-icons
A set of free icons.

## react-router-dom and @types/react-router-dom
A module to manage routers in react. The second module is for react to use the module. It's installed as a dependecy because when the app is build, everything is translated to javscript.

## leaflet and react-leaflet and @types/react-leaflet
It's an alternative of using a map besides the Google Map's API. To make it prettier, it's used [mapbox](https://www.mapbox.com/) as a tilelayer.

## axios 
Make API requests.
* Made a api.ts file to configure a base URL. This is useful because the fetch method doesn't have a base URL. So when it's necessary to change all the base urls, it needs to change one by one. 

# Code Pecularities and Miscellaneous
## Tag 'a' and Link
When using the html tag 'a' to redirect to another page, the browser remakes a lot of solicitations. So, it's better to use 'Link', component imported in react-router-dom, because it doesn't make unecessary requisitions to a path in the site.
