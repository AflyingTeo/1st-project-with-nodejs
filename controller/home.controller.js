const db = require("../db");

class HomeController{

    getHome(req, res){
        if(!req.signedCookies){
            
            res.render('index', { users: db.get('user').value()});
            return;
        }
        else{
            
            // var users = db.get('user').find({ id : req.signedCookies.userId}).value();
            res.render('index', { users: db.get('user').find({ id : req.signedCookies.userId}).value(), signedCookies: req.signedCookies.userId});
            console.log(req.signedCookies.userId)
        }

    }
}

module.exports = new HomeController;
