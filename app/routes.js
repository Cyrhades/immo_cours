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

    app.post('/inscription', token.verify, (req, res) => {
        let Register = require('../src/controllers/Register.js');
        (new Register()).processForm(req, res);
    });

    app.get('/connexion', token.generate, (req, res) => {
        let Authenticated = require('../src/controllers/Authenticated.js');
        (new Authenticated()).printForm(req, res);
    });

    app.post('/connexion', token.verify, (req, res) => {
        let Authenticated = require('../src/controllers/Authenticated.js');
        (new Authenticated()).processForm(req, res);
    });

    app.get('/deconnexion', (req, res) => {
        let Authenticated = require('../src/controllers/Authenticated.js');
        (new Authenticated()).disconnect(req, res);
    });
    
    app.get('/mot_de_passe_oublie', (req, res) => {
        let ResetPassword = require('../src/controllers/ResetPassword.js');
        (new ResetPassword).print(req, res);
    });
    app.post('/mot_de_passe_oublie', (req, res) => {
        let ResetPassword = require('../src/controllers/ResetPassword.js');
        (new ResetPassword).process(req, res, app);
    });




    app.get('/admin', (req, res) => {
        let Dashboard = require('../src/controllers/Dashboard.js');
        (new Dashboard()).print(req, res);
    });

    //---------------------------------------------------------
    //  ADMIN Realty
    //---------------------------------------------------------
    let RealtyController = require('../src/controllers/Realty.js');
    let Realty = new RealtyController();
    app.get('/admin/realty', Realty.print.bind(Realty));
    app.get('/admin/realty/add', token.generate, Realty.printForm);
    app.post('/admin/realty/add',   
        require('express-fileupload')({createParentPath: true}),
        require('../src/services/LcParserService.js'),  
        token.verify, 
        Realty.processForm
    );
    app.get('/admin/realty/delete/:id', Realty.delete);
    app.get('/admin/realty/edit/:id', token.generate, Realty.printForm);
    app.post('/admin/realty/edit/:id', token.verify, Realty.processForm);

    //---------------------------------------------------------
    //  ADMIN User
    //---------------------------------------------------------
    let UserController = require('../src/controllers/User.js');
    let User = new UserController();
    app.get('/admin/User', User.print);
    app.get('/admin/user/add', token.generate, User.printForm);
    app.post('/admin/user/add', token.verify, User.processForm.bind(User));
    app.get('/admin/user/delete/:id', User.delete);
    app.get('/admin/user/edit/:id', token.generate, User.printForm);
    app.post('/admin/user/edit/:id', token.verify, User.processForm);
};