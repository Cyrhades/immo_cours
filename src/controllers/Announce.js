let RepoRealty = require('../repository/Realty.js');

module.exports = class Home {
    print(request, response) {
        // on est en modification
        if(typeof request.params.id !== 'undefined') {
            let repo = new RepoRealty();
            repo.findById(request.params.id).then((realty) => {
                response.render('announce/index', {realty});
            }, () => {
                request.flash('error',`Le bien n'a pas été trouvé.`)
                response.redirect('/');
            });   
        } else {
            request.flash('error',`Le bien n'a pas été trouvé.`)
            response.redirect('/');
        }
    }
};
