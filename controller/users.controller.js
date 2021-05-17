const db = require('../db');
const shortId = require('shortid');

class UserController {

    //[GET] /users
    index(req, res){
        res.render('users/index',{users : db.get('user').value(), signedCookies: req.signedCookies.userId});
    }

    //[GET] /users/search
    search(req, res){
        var q = req.query.q;
        var users = db.get('user').value();
        var matchedUsers = users.filter(function(user){
          return user.name.indexOf(q) !== -1;
        });
        res.render('users/index',
        { 
            users: matchedUsers,
            searchedValue: q,
        })
    }
    //[GET] /users/create
    getCreate(req, res){
        res.render('users/create',{users : db.get('user').value(), signedCookies: req.signedCookies.userId})
    }

    //[POST] /users/create
    postCreate(req, res){
        req.body.id = shortId.generate();
        req.body.avatar = (req.file.path).split('/').slice(1).join('/');
        console.log(req.body.avatar);
        db.get('user').push(req.body).write();
        res.redirect('/users');
    }

    //[GET] /users/view/:id
    userDetails(req, res){
        var id = req.params.id;
        // console.log(id)
        // console.log(typeof id)
        var users = db.get('user').find({ id: id }).value();
        // console.log(users)
        res.render('users/view', {users: users});
    }
}

module.exports = new UserController;
