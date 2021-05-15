const md5 = require('md5');
const db = require('../db');

class AuthController{

    //[GET] /login
    getLogin(req, res){
        res.render('auth/login');
    }

    //Post Login
    postLogin(req, res){
        var email = req.body.email;
        var password = req.body.password;
        var user = db.get('user').find({ email : email}).value();
        
        if(!user){
            res.render('auth/login',{
                errors : [
                    'User does not exist!!!!'
                ],
                values: req.body
            });
            return;
        }

        var hashedPassword = md5(password);
        console.log(md5(password));
        if(user.password !== hashedPassword){
            res.render('auth/login',{
                errors : [
                    'Wrong password!!!!'
                ],
                values: req.body
            });
            return;
        }

        res.cookie('userId', user.id, {
            'signed': true
        });
        res.redirect('/users');

    }
}
module.exports = new AuthController;
