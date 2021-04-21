let RepoRealty = require('../repository/Realty.js');

module.exports = class Realty {

    print(request, response) {
        if(typeof request.session.user !== 'undefined') {
            let repo = new RepoRealty();
            repo.find().then((realties) => {
                response.render('admin/realty/list', {realties});
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
  
        response.render('admin/realty/form');
    }

    processForm(request, response) {
        if(typeof request.session === 'undefined' || typeof request.session.user === 'undefined') {
            request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
            response.redirect('/connexion');  
            return;
        }
        // Ce cas ne peux arriver que si le formulaire a été modifé 
        if(request.body.realty == undefined || request.body.contact == undefined) {
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
        repo.add(entity).then((user) => {
            request.flash('notify', 'Le bien a été créé.');
            response.redirect('/admin/realty');
        }, () => {
            response.render('register/form', { 
                error : `L'enregistrement du bien a échoué`, 
                form : entity 
            });
        });         

    }
};