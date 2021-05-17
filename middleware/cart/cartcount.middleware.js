module.exports = function (req, res, next){
    if(req.signedCookies.addItemsCount){
       res.locals.addItemsCount =  req.signedCookies.addItemsCount;
    }

    next();
}