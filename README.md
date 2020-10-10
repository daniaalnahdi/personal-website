# Personal Website

This website is built with HTML, SCSS, JavaScript, and Webpack. It's hosted on GitHub Pages at [daniaalnahdi.com](http://daniaalnahdi.com/).

## Installation
1. Install [Node.js](https://nodejs.org/en/download/) on your machine 
2. Install project dependencies 

   ```
   npm install
   ```
   
## Scripts
- Starts the development server

  ```
  npm start
  ```
- Creates a production build
  ```
  npm run build
  ```
- Creates a new production build and deploys
  ```
  npm run deploy
  ```
  
## Forking Notes
Remember to change the `npm run deploy` script accordingly. __If you're hosting on GitHub Pages:__ if you want to add a [custom domain](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/configuring-a-custom-domain-for-your-github-pages-site), change the command to `npm run build && echo '<YOURDOMAIN.COM>' > ./dist/CNAME && gh-pages -d dist`, which will create the required CNAME file containing your domain in your `gh-pages` branch. If you don't have a domain,  `npm run build && gh-pages -d dist` should suffice.
