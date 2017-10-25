# Site Builder NPM module
Creates a site from a set of json data files

## Config
### Site config
Set config variables in /src/data/config.json

### Pages
Create pages in /src/data/pages.json

Only have ONE is_root page

Follow similar convention for other pages.

## Usage
1. Clone the repo

2. cd into directory

3. run "npm install -g"

4. run "npm-sitebuilder-configure" to configure & build the site OR "npm-sitebuilder-build" to just build the site.

5. View created website in /dist folder

6. Install Surge ("npm install --global surge") to deploy the site after building. MAKE SURE YOU ONLY PUBLISH THE /dist folder!