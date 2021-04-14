const express = require('express');
const app = express();
const path = require('path');
const config = require('./app/config');
const sassMiddleware = require('node-sass-middleware');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//--------------------------------------------------------------------
//      Gestinnaire sass
//--------------------------------------------------------------------
app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'build'),
    dest: path.join(__dirname, 'public'),
    debug: false,
    indentedSyntax: false, // true Compiles files with the .sass extension
    outputStyle: 'compressed'
}));

//--------------------------------------------------------------------
//      Mise en place du moteur de template
//--------------------------------------------------------------------
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

//--------------------------------------------------------------------
//      Mise en place du répertoire static
//--------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
 
//--------------------------------------------------------------------
//       permet d'envoyer des variables à toutes les vues
//-------------------------------------------------------------------- 
app.use((req,res,next) => {

    res.locals.websiteName = config.websiteName; 
    next();
});

//--------------------------------------------------------------------
//      Chargement des routes
//--------------------------------------------------------------------
require('./app/routes')(app);
 
//--------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------
app.listen(config.port,() => {
    console.log(`Le serveur est démarré : http://localhost:${config.port}`);
    if (process.send) {
        process.send('online');
    }
});