let RepoRealty = require('../repository/Realty.js');

module.exports = class Realty {

    print(request, response) {
        if(typeof request.session.user !== 'undefined') {
            //let page = parseInt(request.params.page) || 1;
            let page = parseInt(request.query.page) || 1;
            let limit = 10; // nombre d'éléments par page
            let offset = (limit*page)-limit;

            let repo = new RepoRealty();
            repo.count({}).then((count) => {
                let last = Math.ceil(count/limit);
                // // le filtre sera le même que dans countBy
                repo.find({}, limit, offset).then((realties) => {
                    response.render('admin/realty/list', {
                        realties,
                        page,
                        last
                    }); 
                });
            });
        } else {
            request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            response.redirect('/connexion');  
        }
    }

    printForm(request, response) {
        if(typeof request.session === 'undefined' || typeof request.session.user === 'undefined') {
            request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            response.redirect('/connexion');  
            return;
        }
        // on est en modification
        if(typeof request.params.id !== 'undefined') {
            let repo = new RepoRealty();
            repo.findById(request.params.id).then((realty) => {
                response.render('admin/realty/form', {form : realty});
            }, () => {
                request.flash('error',`Le bien n'a pas été trouvé`)
                response.redirect('/admin/realty');
            });   
        } 
        // on est en ajout
        else {
            response.render('admin/realty/form', {form: { contact: {}, address : {}}});
        }
    }


    processForm(request, response) {
        if(typeof request.session === 'undefined' || typeof request.session.user === 'undefined') {
            request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            response.redirect('/connexion');  
            return;
        }
        // Ce cas ne peux arriver que si le formulaire a été modifé 
        if(typeof request.body.realty == 'undefined' || typeof request.body.contact == 'undefined') {
            request.flash('error', `Le formulaire n'a pas été soumis correctement.`);
            response.redirect('/admin/realty/add');  
        }

        let entity =  {
            address : {
                seller : request.body.realty.seller,
                address1: request.body.realty.address1,
                address2: request.body.realty.address2,
                zipcode : request.body.realty.zipcode,
                city: request.body.realty.city,
                info_address: request.body.realty.info_address,
            },
            contact : {
                civility : request.body.contact.civility,
                firstname: request.body.contact.firstname,
                lastname: request.body.contact.lastname,
                email : request.body.contact.email,
                phone: request.body.contact.phone,
                mobile: request.body.contact.mobile,
                info: request.body.contact.info
            },
            type : request.body.realty.type,
            // 1 Ancien, 2 Neuf, 3 Viager
            type_product: request.body.realty.type_product,
            price : request.body.realty.price,
            amount_commission : request.body.realty.amount_commission,
            percentage_commission: request.body.realty.percentage_commission,
            area : request.body.realty.area,
            room: request.body.realty.room,
            info_realty: request.body.realty.info_realty
        };

        let repo = new RepoRealty();
        let promise;
        if(typeof request.params.id !== 'undefined') {
            promise = repo.updateById(request.params.id, entity);
        } else {
            promise = repo.add(entity);
        }
        promise.then(() => {
            if(typeof request.params.id !== 'undefined') {
                request.flash('notify', 'Le bien a été modifié.');
            } else {
                request.flash('notify', 'Le bien a été créé.');
            }
            response.redirect('/admin/realty');
        }, () => {
            request.flash('error', `L'enregistrement a échoué.`);
            response.redirect('/admin/realty/add');  
        });         
    }


    delete(request, response) {
        if(typeof request.session === 'undefined' || typeof request.session.user === 'undefined') {
            request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            response.redirect('/connexion');  
            return;
        }

        if(request.params.id != undefined && request.params.id != '') {
            let repo = new RepoRealty();
            repo.delete({_id : request.params.id}).then(() => {
                request.flash('notify', 'Le bien a été supprimé.');
                response.redirect('/admin/realty');
            }, () => {
                request.flash('error', 'La suppression du bien a échoué.');
                response.redirect('/admin/realty');
            });  
        } 
        else {
            request.flash('error', 'Une erreur est survenue.');
            response.redirect('/admin/realty');
        }
    }
};