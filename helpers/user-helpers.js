var db = require('../config/connection')
var collection = require('../config/collections')
const bcrypt = require('bcrypt')
var objectId=require("mongodb").ObjectID
const { USERS_COLLECTIONS } = require('../config/collections')
const { response } = require('express')


module.exports = {
    dosignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            db.get().collection(collection.USERS_COLLECTIONS).insertOne(userData).then((data) => {

                resolve(data.ops[0])
            })
        })
    },

    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response={}
            let user=await db.get().collection(collection.USERS_COLLECTIONS).findOne({email:userData.email})
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if(status){
                        response.user=user 
                        response.status=true
                        resolve(response)
                    }else{
                        resolve({status:false})
                    }
                })
            }else{
                resolve({status:false})
            }
        })
    },
    addToCart:(proId,userId)=>{
        return new Promise(async(resolve,reject)=>{
            let userCart= await db.get().collection(collection.CART_COLLECTION).findOne({user:objectId(userId)})
            if(userCart){
                db.get().collection(collection.CART_COLLECTION).updateOne({user:objectId(userId)},{
                        $push:{
                            product:objectId(proId)
                        }
                }).then((response)=>{
                    resolve()
                })
            }else{
                let cartObj={
                    user:objectId(userId),
                    product:[objectId(userId)]
                }
                db.get().collection(collection.CART_COLLECTION).insertOne(cartObj).then((response)=>{
                    resolve()
                })
            }
        })
    },
    getCartProducts:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let cartItems=await db.get().collection(collection.CART_COLLECTION).aggregate([
                {
                    $match:{user:objectId(userId)}
                },
                {
                    $lookup:{
                        from:collection.PRODUCT_COLLECTION,
                        let:{prodList:"$product"},
                        pipeline:[
                            {
                                $match:{
                                    $expr:{
                                        $in:['$_id','$$prodList']
                                    }
                                }
                            }
                        ],
                        as:"cartItems"
                    }
                }
            ]).toArray()
            resolve(cartItems[0].cartItems)
        })
    }
} 