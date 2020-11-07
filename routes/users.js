const { response } = require('express');
var express = require('express');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers')
const userHelpers = require('../helpers/user-helpers')

// Midilwair
const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) next()
  else res.redirect("/login")
}

/* GET home page. */
router.get('/', function (req, res, next) {
  let user = req.session.user
  productHelpers.getAllProduct().then((products) => {
    res.render('users/viwe-product', { products, user });

  })
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
  } else {
    res.render('users/login', { "loginErr": req.session.loginErr })
    req.session.loginErr = false
  }
})

router.get("/signup", (req, res) => {
  res.render('users/signup')
})

router.post('/signup', (req, res) => {
  userHelpers.dosignup(req.body).then((response) => {
  })
  res.redirect('/login')

})

router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/')
    } else {
      req.session.loginErr = "Invalid username or password"
      res.redirect('/login')
    }
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

router.get("/cart", verifyLogin, (req, res) => {
  res.render("users/cart")
})




module.exports = router;
