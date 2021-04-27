module.exports = (app) => {

    // Ajout du middleware de gestion des JWT
    require('../src/services/LcAppJwtService.js')(app);

    // Ajout du middleware de gestion des CSRF
    const token = require('../src/services/LcCsrfToken.js')(app);

    app.get('/', token.generate, (req, res) => {
        let Home = require('../src/controllers/Home.js');
        (new Home()).print(req, res);
    });

    app.get('/annonce/:id', (req, res) => {
        let Announce = require('../src/controllers/Announce.js');
        (new Announce()).print(req, res);
    });

    app.get('/inscription',  token.generate, (req, res) => {
        let Register = require('../src/controllers/Register.js');
        (new Register()).printForm(req, res);
    });

    app.post('/inscription', (req, res) => {
        let Register = require('../src/controllers/Register.js');
        (new Register()).processForm(req, res);
    });

    app.get('/connexion', token.generate, (req, res) => {
        let Authenticated = require('../src/controllers/Authenticated.js');
        (new Authenticated()).printForm(req, res);
    });

    app.post('/connexion', (req, res) => {
        let Authenticated = require('../src/controllers/Authenticated.js');
        (new Authenticated()).processForm(req, res);
    });

    app.get('/deconnexion', (req, res) => {
        let Authenticated = require('../src/controllers/Authenticated.js');
        (new Authenticated()).disconnect(req, res);
    });
    
    app.get('/admin', (req, res) => {
        let Dashboard = require('../src/controllers/Dashboard.js');
        (new Dashboard()).print(req, res);
    });

    app.get('/admin/realty', (req, res) => {
        let Realty = require('../src/controllers/Realty.js');
        (new Realty()).print(req, res);
    });

    app.get('/admin/realty/add', token.generate, (req, res) => {
        let Realty = require('../src/controllers/Realty.js');
        (new Realty()).printForm(req, res);
    });

    app.post('/admin/realty/add', (req, res) => {
        let Realty = require('../src/controllers/Realty.js');
        (new Realty()).processForm(req, res);
    });
    
    app.get('/admin/realty/delete/:id', (req, res) => {
        let Realty = require('../src/controllers/Realty.js');
        (new Realty()).delete(req, res);
    });


    app.get('/admin/realty/edit/:id', token.generate, (req, res) => {
        let Realty = require('../src/controllers/Realty.js');
        (new Realty()).printForm(req, res);
    });

    app.post('/admin/realty/edit/:id', (req, res) => {
        let Realty = require('../src/controllers/Realty.js');
        (new Realty()).processForm(req, res);
    });
};