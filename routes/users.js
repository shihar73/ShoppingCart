var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let products = [
    {
      name: "IPhone 10",
      category: "Mobile",
      description: "It's a good phone ",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.i-uYtPWRCvFe2qJjuagRzAHaHa%26pid%3DApi&f=1"

    },
    {
      name: "IPhone 11",
      category: "Mobile",
      description: "It's a good phone ",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.OOFam0AzFxbdDU_VA-40CQHaHa%26pid%3DApi&f=1"

    },
    {
      name: "Samsung m31",
      category: "Mobile",
      description: "It's a good phone ",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.9MyVNGRl-r_sPL_u2Pj-xAHaHa%26pid%3DApi&f=1"

    },
    {
      name: "Oppo f10",
      category: "Mobile",
      description: "It's a good phone ",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.-pbDbCzGlvvRdTQFPvLx_QHaHa%26pid%3DApi&f=1"

    },
    {
      name: "Redmi note 9",
      category: "Mobile",
      description: "It's a good phone ",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.QOo9pvvbSnNM9n6ppLYNkAHaHa%26pid%3DApi&f=1"

    },
    {
      name: "vivo y50",
      category: "Mobile",
      description: "It's a good phone ",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.WYDQE18ty-2mRQ0221r0HAHaHa%26pid%3DApi&f=1"

    },


  ]

  res.render('index', { products,title :"Shoping" } );
});

module.exports = router;
