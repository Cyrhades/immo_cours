const assert = require('assert');
const repoUser = require('../src/repository/User.js');

before(function(done) {
    require('mongoose').connection.once('open', () =>  {
        done();
    });    
});

describe(`Email existe / n'existe pas en BDD`, () => {
    it('email existant', (done) => {
        (new repoUser).emailExists('cyrhades76@gmail.com').then((result) => {
            assert.strictEqual(result, true,`L'email de test n'a pas été trouvé dans la BDD`);
            done();
        });
    });
 
    it('email inexistant', (done) => {
        (new repoUser).emailExists('cyrhades76+fake.notexists@gmail.com').then((result) => {
            // La promesse true ou false dans le resolve, car on l'utilise ainsi dans l'enregistrement d'utilisateur
            assert.strictEqual(result, false,`L'email a été trouvé dans la BDD`);
            done();
        });
    });
});


describe(`Récupérer un utilisateur par son email`, () => {
 
    it('récupérer un utilisateur existant avec son email', (done) => {
        (new repoUser).getUserByEmail('cyrhades76@gmail.com').then((result) => {
            assert.notStrictEqual(result, null)
            assert.strictEqual(result.email, 'cyrhades76@gmail.com')
            done();
        });
    });

    it('Tenter de récupérer un utilisateur inexistant avec un email', (done) => {
        (new repoUser).getUserByEmail('cyrhades76+fake.notexists@gmail.com').then(() => {}, (result) => {
            assert.strictEqual(result, false)
            done();
        });
    });
});