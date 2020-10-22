var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();


/* GET admin product listing. */
router.get('/', function (req, res, next) {
productHelpers.getAllProduct().then((products)=>{
console.log(products);
  res.render("admin/view-products", { products, title: "Admin-Panel", admin: true })

})
});

// GET admin add product
router.get('/add-product', (req, res) => {
  res.render("admin/add-product", { title: "Add-products" ,admin:true})

});

//POST data reseving
router.post('/add-product', (req, res) => {
  console.log(req.body);
  console.log(req.files.image);       

  productHelpers.addproduct(req.body, (id) => {
    let image = req.files.image
    image.mv('./public/product-images/' + id + ".jpg", (err, done) => {
      if (!err) {
       // res.render('admin/add-product', { title: "Add-products"  ,admin:true})
       res.redirect("/admin")
      } else {
        console.log(err);
      }
    })
  })


}) 

module.exports = router;
