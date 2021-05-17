const shortId = require('shortid');
const db = require('../../db');


class SessionsMiddleware {
    
    sessionMiddleware(req, res, next){
        
        if(!req.signedCookies.sessionsId){
            var sessionsId = shortId.generate();
            res.cookie('sessionsId', sessionsId ,{
                signed : true
            });

            db.get('sessions').push({'sessionsId': sessionsId}).write();
        }

        next();

    }
}

module.exports = new SessionsMiddleware;