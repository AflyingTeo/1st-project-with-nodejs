const db = require("../db");

class HomeController{

    getHome(req, res){
        res.render('index', { users: db.get('user').value(), signedCookies: req.signedCookies.userId});
        // console.log(req.signedCookies.userId);
    }
}

module.exports = new HomeController;
