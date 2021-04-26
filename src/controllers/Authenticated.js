let RepoUser = require('../repository/User.js');
let config = require('../../app/config.js');

module.exports = class Authenticated {
    printForm(request, response) {
        response.render('authenticated/form', {form: {}});  
    }

    processForm(request, response) {
        (new RepoUser).getUserByEmail(request.body.email).then((user) => {
            let bcrypt = require('bcryptjs');
            if(bcrypt.compareSync(request.body.password, user.password)) {
                //request.session.user = user;
                let jwt = require('jsonwebtoken');
                let Cookies = require( "cookies" );
                let accessToken = jwt.sign({
                    username: user.email, 
                    firstname : user.firstname, 
                    lastname: user.lastname, 
                    role: user.role
                }, config.appKey, {expiresIn: 604800});   

                new Cookies(request, response).set('access_token', accessToken, {httpOnly: true, secure: false });
                request.flash('notify', 'Vous êtes maintenant connecté.');
                response.redirect('/');
            } else {
                response.render('authenticated/form', { 
                    error : `L'identification a échouée`, 
                    form : {email : request.body.email || ''}
                }); 
            }       
        }, () => {
            response.render('authenticated/form', { 
                error : `L'identification a échouée`, 
                form : {email : request.body.email || ''}
            }); 
        });
    }

    disconnect(request, response) {
        //request.session.user = null;
        let Cookies = require( "cookies" );
        new Cookies(request, response).set('access_token', null, {maxAge:0});
        request.flash('notify', 'Vous êtes maintenant déconnecté.');
        response.redirect('/');
    }
}