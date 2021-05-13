const db = require('../../db');

class AuthMiddleware{
   
    authRequire(req, res, next){
        console.log('req.cookies.userId' + req.cookies.userId)
        if(!req.cookies.userId){
            res.redirect('/auth/login');
            return;
        }
        
        var user = db.get('user').find({ id: req.cookies.userId }).value();

        if(!user){
            res.redirect('auth/login');
            return;
        }

        next();

    }

}

module.exports = new AuthMiddleware;