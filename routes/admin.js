var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();


/* GET admin product listing. */
router.get('/', function (req, res, next) {
  productHelpers.getAllProduct().then((products) => {
    // console.log(products);
    res.render("admin/view-products", { products, admin: true })

  })
});

// GET admin add product
router.get('/add-product', (req, res) => {
  res.render("admin/add-product", { admin: true })

});

//POST data reseving
router.post('/add-product', (req, res) => {
  productHelpers.addproduct(req.body, (id) => {
    let image = req.files.image
    image.mv('./public/product-images/' + id + ".jpg", (err, done) => {
      if (!err) {
        res.redirect("/admin")
      } else {
        console.log(err);
      }
    })
  })


})

router.get('/delete-product/:id', (req, res) => {
  let porId = req.params.id
  console.log(porId);
  productHelpers.deleteProduct(porId).then((responce) => {
    res.redirect("/admin/")
  })
})


router.get('/edit-product/:id', async (req, res) => {
  let product = await productHelpers.getProductDetails(req.params.id)
  res.render('admin/edit-product',{product})
})

router.post("/edit-product/:id",(req,res)=>{
  console.log(req.params.id);
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect("/admin")
    if(req.files.image){
      let id=req.params.id
      let image = req.files.image
      image.mv('./public/product-images/' + id + ".jpg")
    }
  })
})


module.exports = router;
