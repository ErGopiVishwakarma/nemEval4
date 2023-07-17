const  express = require('express')
const SocialModel = require('../model/socialModel')
const socialRouter = express.Router()

socialRouter.post('/add',async(req,res)=>{
    const {title,body,device} = req.body
    try {
        const post = new SocialModel({title,body,device,postedBy:req.id})
        await post.save()
        res.status(200).json({msg:'post added successfully'})
    } catch (error) {
        res.status(400).json({msg:error}) 
    }
})

socialRouter.get('/posts',async(req,res)=>{
     const {device} = req.query
     const query = {postedBy:req.id}
     try {
        if(device){
            query.device = device
        }
        const post = await SocialModel.find(query)
        res.status(200).send({data:post})
     } catch (error) {
        res.status(400).send(error)
     }
})

socialRouter.patch('/update/:id',async(req,res)=>{
    const {id} = req.params
    try {
        await SocialModel.findByIdAndUpdate(id,req.body,{new:true})
        res.send('post updated successfully!')
    } catch (error) {
        res.send(error)
    }
})

socialRouter.delete('/delete/:id',async(req,res)=>{
    const {id} = req.params
    try {
        await SocialModel.findByIdAndDelete(id,{new:true})
        res.send('post deleted successfully!')
    } catch (error) {
        res.send(error)
    }
})

module.exports = socialRouter