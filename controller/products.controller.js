const md5 = require('md5');
const db = require('../db');


class ProductsController{

    //[GET] /Products
    getProducts(req, res){
        var page = parseInt(req.query.page) || 1;
        var perPage = 12;
        var start = (page - 1) * perPage;
        var end = page * perPage;
        var products = db.get('products').value();
        // var productsPerPage = db.get('products').value().slice(start, end);
        var productsPerPage = db.get('products').value().slice(start, end);
        var pageLength = Math.round(products.length / perPage);
//TO DEBUG
        // var pageLength = 100;
        var nextPage = parseInt(req.query.page) + 1;
        var prevPage = parseInt(req.query.page) - 1;
        res.render('products/index', 
            {   
                products: productsPerPage,
                currentPage: parseInt(req.query.page), 
                nextPage: nextPage,
                prevPage: prevPage,
                pageLength: pageLength,
            }
        );
    }
}
module.exports = new ProductsController;
