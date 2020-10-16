var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  products=[
    {
      name: "vivo y50",
      category: "Mobile",
      description: "It's a good phone ",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.WYDQE18ty-2mRQ0221r0HAHaHa%26pid%3DApi&f=1"

    }
  ]

res.render("index",{products, title:"Admin-Panel", admin:true})
});

module.exports = router;
