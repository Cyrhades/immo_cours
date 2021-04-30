if(typeof process.env.PORT == 'undefined') {
    module.exports = require('./dev.config.js');
} else {
    module.exports = {
        appKey: process.env.appKey,
        websiteName: 'Toitoi mon toit',
        directory_product_image : __dirname+'/../public/images/realties/',
        port : process.env.PORT || 3000,
        db : {
            user : process.env.db_user,
            pwd: process.env.db_pwd,
            cluster: process.env.db_cluster,
            dbname: process.env.db_dbname
        },
        smtp: {
            service: process.env.smtp_provider,
            auth: {
                user: process.env.smtp_user,
                pass: process.env.smtp_pass
            }
        }
    };
}