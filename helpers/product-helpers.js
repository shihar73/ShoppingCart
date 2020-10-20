var db = require('../config/connection')
module.exports = {

    addproduct: (product, callback) => {
        
        db.get().collection('product').insertOne(product).then((data) => {
            callback(data.ops[0]._id)
            
        })

    }

}