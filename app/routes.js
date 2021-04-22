module.exports = (app) => {

    app.get('/', (req, res) => {
        let Home = require('../src/controllers/Home.js');
        (new Home()).print(req, res);
    });
    
    app.get('/inscription', (req, res) => {
        let Register = require('../src/controllers/Register.js');
        (new Register()).printForm(req, res);
    });

    app.post('/inscription', (req, res) => {
        let Register = require('../src/controllers/Register.js');
        (new Register()).processForm(req, res);
    });

    app.get('/connexion', (req, res) => {
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

    app.get('/admin/realty/add', (req, res) => {
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


    app.get('/admin/realty/edit/:id', (req, res) => {
        let Realty = require('../src/controllers/Realty.js');
        (new Realty()).printForm(req, res);
    });

    app.post('/admin/realty/edit/:id', (req, res) => {
        let Realty = require('../src/controllers/Realty.js');
        (new Realty()).processEdit(req, res);
    });
};