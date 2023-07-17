const express = require('express')
const UserModel = require('../model/userModel')
const userRouter = express.Router()
const jwt = require('jsonwebtoken')
const bc = require('bcryptjs')

userRouter.post('/register',async(req,res)=>{
   const {name,email,gender,password} = req.body
   try {
    const user = await UserModel.find({email}) 
    if(user.length>0){
        res.status(200).json({msg:'user already registered please login!'})
    }else{
        bc.hash(password,5,async(err,hash)=>{
            if(err){
                res.status(400).json({msg:'something went wrong'})
            }else{
                const users = new UserModel({name,email,gender,password:hash})
                await users.save()
                res.status(200).json({msg:'user successfully registered'})
            }
        })       
    }
   } catch (error) {
    req.status(400).json(error)
   }
})

userRouter.post('/login',async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.find({email})
        if(user.length>0){
           bc.compare(password,user[0].password,(err,result)=>{
            if(err){
                res.status(400).json({msg:'wrong password'})
            }else{
                let token = jwt.sign({userId:user[0]._id},'social')
                res.status(200).json({msg:'login successfully',token})
            }
           })
        }else{
            res.status(400).json({msg:'please registered! first'})
        }
    } catch (error) {
        res.status(400).json({msg:'please registered! first',error})
    }
})

module.exports = userRouter