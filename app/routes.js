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
};