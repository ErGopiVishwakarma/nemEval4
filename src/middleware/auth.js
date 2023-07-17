const jwt = require('jsonwebtoken')

const auth = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        try {
            jwt.verify(token,'social',(err,decode)=>{
                if(err){
                    res.send('something went wrong!')
                }else{
                    req.id = decode.userId
                    next()
                } 
            })
        } catch (error) {
            res.status(400).json({msg:"plase login first"})
        }
    }else{
        res.status(400).json({msg:"plase login first"})
    }
}

module.exports = auth