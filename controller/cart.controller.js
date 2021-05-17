const db = require("../db");

class CartController {
    //[GET] /add/:productId
    addProducts(req, res){
        var productId = req.params.productId;
        var sessionId = req.signedCookies.sessionsId;

        if(!sessionId){
            res.redirect('/products/product-list');
            return;
        }
        var count = db.get('sessions').find({'sessionsId' : sessionId}).get('cart.' + productId, 0).value();
        // console.log(count);
        db.get('sessions').find({'sessionsId' : sessionId}).set('cart.' + productId, count + 1).write();

        var cart = db.get('sessions').find({'sessionsId' : sessionId}).value();
        console.log(Object.values(cart.cart));
        
        var addedItems= Object.values(cart.cart).reduce((total, value) =>{return total + value}, 0);
        console.log(addedItems)
        res.cookie('addItemsCount', addedItems, {signed : true});
        // res.locals.addItemsCount = addedItems;
        res.redirect('/products/products-list');
    }
}

module.exports = new CartController;
