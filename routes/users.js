var express = require('express');
var router = express.Router();
var productHelpers=require('../helpers/product-helpers')

/* GET home page. */
router.get('/', function (req, res, next) {

  productHelpers.getAllProduct().then((products)=>{
    res.render('users/viwe-product', { products,title :"Shoping" } );

  })
});

module.exports = router;
