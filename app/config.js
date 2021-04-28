if(typeof process.env.PORT == 'undefined') {
    module.exports = require('./dev.config.js');
} else {
    module.exports = {
        appKey: process.env.appKey,
        websiteName: 'Toitoi mon toit',
        port : process.env.PORT || 3000,
        db : {
            user : process.env.db_user,
            pwd: process.env.db_pwd,
            cluster: process.env.db_cluster,
            dbname: process.env.db_dbname
        }
    };
}