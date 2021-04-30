let RepoUser = require('../repository/User.js');

module.exports = class User {

    print(request, response) {
        //let page = parseInt(request.params.page) || 1;
        let page = parseInt(request.query.page) || 1;
        let limit = 10; // nombre d'éléments par page
        let offset = (limit*page)-limit;

        let repo = new RepoUser();
        repo.count({}).then((count) => {
            let last = Math.ceil(count/limit);
            // // le filtre sera le même que dans countBy
            repo.find({}, limit, offset).then((realties) => {
                response.render('admin/user/list', {
                    realties,
                    page,
                    last
                }); 
            });
        });       
    }

    printForm(request, response) {
        // on est en modification
        if(typeof request.params.id !== 'undefined') {
            let repo = new RepoUser();
            repo.findById(request.params.id).then((User) => {
                response.render('admin/user/form', {form : User});
            }, () => {
                request.flash('error',`Le bien n'a pas été trouvé`)
                response.redirect('/admin/user');
            });   
        } 
        // on est en ajout
        else {
            response.render('admin/user/form', {form: { contact: {}, address : {}}});
        }
    }


    processForm(request, response) {
        let entity = {
            email : request.body.email || '',
            civility : request.body.civility || '',
            firstname: request.body.firstname || '',
            lastname: request.body.lastname || '',
            phone: request.body.phone || '',
            role: request.body.role || 'user'
        };

        let repo = new RepoUser();
        let promise;
        if(typeof request.params.id !== 'undefined') {
            promise = repo.updateById(request.params.id, entity);
        } else {
            let bcrypt = require('bcryptjs');
            let password = this.genereratePassword();
            entity.password = bcrypt.hashSync( password, bcrypt.genSaltSync(10) );
            // Envoyer un mail contenant le mot de passe
            promise = repo.add(entity);
        }
        promise.then(() => {
            if(typeof request.params.id !== 'undefined') {
                request.flash('notify', `L'utilisateur a été modifié.`);
            } else {
                request.flash('notify',  `L'utilisateur a été créé.`);
            }
            response.redirect('/admin/user');
        }, () => {
            request.flash('error', `L'enregistrement a échoué.`);
            response.redirect('/admin/user/add');  
        });         
    }


    delete(request, response) {
        if(request.params.id != undefined && request.params.id != '') {
            let repo = new RepoUser();
            repo.delete({_id : request.params.id}).then(() => {
                request.flash('notify', 'Le bien a été supprimé.');
                response.redirect('/admin/user');
            }, () => {
                request.flash('error', 'La suppression du bien a échoué.');
                response.redirect('/admin/user');
            });  
        } 
        else {
            request.flash('error', 'Une erreur est survenue.');
            response.redirect('/admin/user');
        }
    }

    genereratePassword() {
        let chars = 'azertyupqsdfghjkmwxcvbn23456789AZERTYUPQSDFGHJKMWXCVBN!;,?#{})([*$^%_-';
        let pass = '';
        for(let i=0;i<10;i++){
            let wpos = Math.round(Math.random()*chars.length);
            pass+=chars.substring(wpos,wpos+1);
        }
        return pass;
    }
};