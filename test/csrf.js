const assert = require('assert');
let stubRequest = { session : {} };
let stubResponse = { locals : {}, status : (code) => {}, send : (message) => {} };
const token = require('../src/services/LcCsrfToken.js')();

describe(`Création d'un token csrf`, () => {
    it(`Test avant la generation d'un CSRF`, (done) => {
        assert.strictEqual(typeof stubRequest.session.token_csrf, 'undefined');
        assert.strictEqual(typeof stubResponse.locals.token_csrf, 'undefined');
        done();
    });

    it(`Test après la generation d'un CSRF`, (done) => {
        token.generate(stubRequest, stubResponse, ()=>{});
        assert.notStrictEqual(typeof stubRequest.session.token_csrf, 'undefined');
        assert.notStrictEqual(typeof stubResponse.locals.token_csrf, 'undefined');
        done();
    });

    it(`Test de la vérification d'un CSRF correct`, (done) => {
        stubRequest.body = { csrf : stubResponse.locals.token_csrf} 
        assert.strictEqual(token.verify(stubRequest, stubResponse, () => true), true);
        done();
    });

    it(`Test de la vérification d'un CSRF incorrect`, (done) => {
        stubRequest.body = { csrf : stubResponse.locals.token_csrf} 
        // @todo
        done();
    });
});