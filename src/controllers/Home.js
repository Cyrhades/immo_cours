let RepoRealty = require('../repository/Realty.js');

module.exports = class Home {
   
    print(request, response) {
        // Pour le moment sans pagination
        let repo = new RepoRealty();
        repo.find({}).then((realties) => {
            response.render('home', {realties}); 
        });
    }
};