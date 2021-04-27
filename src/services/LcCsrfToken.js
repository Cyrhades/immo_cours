module.exports = (app) => { 
    app.use((req,res,next) => {
        require("pug").filters = {
            csrf: () => {
                return `<input type="hidden" name="csrf" value="${res.locals.token_csrf}" />`;
            }
        };
        next();
    });

    return {
        generate : (req, res, next)  => {
            let token = require('crypto').createHash('sha1').update(`${new Date().toDateString()}${Math.random()}`).digest('hex').toLowerCase();
            req.session.token_csrf = token;
            res.locals.token_csrf = token;
            next();
        }
    };
}