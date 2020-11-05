const { response } = require('express');
var express = require('express');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers')
const userHelpers = require('../helpers/user-helpers')
/* GET home page. */
router.get('/', function (req, res, next) {
  let user = req.session.user
  productHelpers.getAllProduct().then((products) => {
    res.render('users/viwe-product', { products, user });

  })
});

router.get('/login', (req, res) => {
  if(req.session.loggedIn){
    console.log("login #$#@$%#%#$%#@");
    res.redirect('/')
  }else{
    res.render('users/login')
  }
})

router.get("/signup", (req, res) => {
  res.render('users/signup')
})

router.post('/signup', (req, res) => {
  userHelpers.dosignup(req.body).then((response) => {
    console.log(response);
  })
  //  if(user_signup_popup){

  //  }

  // productHelpers.getAllProduct().then((products) => {
  //   res.render('users/viwe-product', { products,user_signup_popup:true});

  // })


  res.redirect('/login')

})

router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/')
    } else {
      res.redirect('/login') 
    }
  })
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;
