let RepoUser = require('../repository/User.js');

module.exports = class Register {
    printForm(request, response) {
        response.render('register/form');  
    }

    processForm(request, response) {

        if(request.body.phone.match(/^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/) != true) {
            // il y a une erreur
        }
        let entity = {
            email : request.body.email || '',
            password : request.body.password || '', // devra être hashé
            civility : request.body.civility || '',
            firstname: request.body.firstname || '',
            lastname: request.body.lastname || '',
            phone: request.body.phone || ''
        };

        /**
         *  @todo
         *  Vérifier adresse inexistante en BDD 
         *  (si déja en BDD afficher msg erreur et réafficher formulaire pré-remplie)
         *  Hasher le mot de passe
         */ 
        (new RepoUser).add(entity).then((user) => {
            if(user === null) {
                //request.flash('error','Il y a eut un probleme');
                response.redirect('/inscription');
            }
            else {
                //request.flash('success','Vous etes bien inscris');
                response.redirect('/');
            }
        });         
    }
};