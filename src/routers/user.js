const express=require('express')
const router = new express.Router();
const auth =require('../middleware/auth');
const User = require('../models/user');
const multer = require('multer');
const sharp =require('sharp')
const {sendWelcomeEmail,sendGoodbyeEmail}=require('../emails/account');    

router.post('/users',async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        sendWelcomeEmail(user.email,user.name)
        res.status(201).send({user,token})

    }catch(e){
        res.status(400).send(e.message)
    }
})
router.post('/users/login',async(req,res) =>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }
    catch(err){
        if(err.message === 'Invalid credentials'){
            return res.status(401).send({"error": "Invalid email or password"})
        }
        res.status(500).send(err.message)
}
})
router.post('/users/logout',auth,async(req,res) =>{
    try{
        req.user.tokens =req.user.tokens.filter(token => {
            return token.token!== req.token
        })
        await req.user.save()

        res.send(req.user.name + " is logged out")
    }catch(e){
        res.status(500).send(e.message)
    }
})
router.post('/users/logoutAll',auth,async(req,res) =>{
    try{
        req.user.tokens =[]
        await req.user.save()

        res.send(req.user.name + " is logged out in all devices")
    }catch(e){
        res.status(500).send(e.message)
    }
})
// Configure Multer
const upload = multer({
    limits:{
      fileSize: 2000000 // 2MB
    }, 
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
          return cb(new Error('Only .jpg, .jpeg, .png files are allowed!'), false);
        }
        cb(null, true);
      }
    
  });
  
router.post('/users/me/avatar',auth,upload.single('file'),async(req,res) =>{
    const buffer =await sharp(req.file.buffer).resize({
        width: 250,
        height: 250
      }).png().toBuffer();
    try {
        req.user.avatar=buffer
        await req.user.save()
        res.status(201).json({
          message: 'Image uploaded successfully!' ,
          data: req.user
        });
      } catch (error) {
        res.status(500).json(error.message);
      }
},(req,res,next) =>{
    res.status(400).send({error: 'Image uploaded failed!'+ error.message});
})

router.get('/users/me',auth,async(req,res)=>{
   res.send({user:req.user})

})
router.get('/users/:id/avatar',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user ||!user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})

router.patch('/users/me',auth,async(req,res)=>{
    const updates =Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)
    )
    if(!isValidOperation){
        return res.status(404).send({"error": "Invalid operation"})
    }
    try{
        updates.forEach((update)=>{
            // console.log(update)
            return req.user[update]=req.body[update]
        })
        await req.user.save()
        res.send(req.user) 
    }catch(e){
        res.status(400).send(e.message)
    }
})
 
router.delete('/users/me',auth,async(req, res)=>{
    try{
        await req.user.deleteOne()
        sendGoodbyeEmail(req.user.email,req.user.name)
        res.send(req.user.name + " is deleted")
    }catch(e){
        res.status(500).send(e.message)
    }

})
router.delete('/users/me/avatar',auth,async(req,res) =>{
    try {
        req.user.avatar= undefined
        await req.user.save()
        res.status(201).json({
          message: 'image Delete successfully!' ,
          
        });
      } catch (error) {
        res.status(500).json(error.message);
      }
})

module.exports = router;