const express=require('express')
const router = new express.Router();
const Task = require('../models/task')
const auth = require('../middleware/auth');

router.post('/tasks',auth,async(req,res)=>{
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    } catch(e){ 
        res.status(400).send(e.message)
    }
  
 })
 
/*sortby createdAt desc or asc
completed tasks order by true or false
limit&skip for pagination*/
 router.get('/tasks',auth,async(req,res)=>{
    const match={}
    const sort={}
    if(req.query.complete){
        match.complete = req.query.complete==='true'
    } 
    if(req.query.sortBy){ 
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc'? -1 : 1  //-1 for descending order
    }
       
    try{
        // const tasks = await Task.find({owner:req.user._id}) 
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }) //short hand syntax
        res.send(req.user.tasks)
        
    }catch(e){
        res.status(500).send(e.message)
    }
   
 })
 router.get('/tasks/:id',auth,async(req,res)=>{
    try{
        const task = await Task.findOne({_id:req.params.id,owner:req.user._id})
        console.log(task)
        if(!task){
            return res.status(404).send('Data not found')
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e.message)
    }
  
 }) 
 router.patch('/tasks/:id',auth, async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['task','description','complete']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({"error": "Invalid operation"})
    }
    try{
        const task = await Task.findOne({_id:req.params.id, owner:req.user._id})
        if(!task){
            return res.status(404).send('Task not found')
        }
        updates.forEach((update)=>task[update]=req.body[update])
        await task.save()
        res.send(task)
    }catch(e){
        res.status(400).send(e.message)
    }
 })
 router.delete('/tasks/:id',auth,async(req, res)=>{
    try{
        const task = await Task.findOneAndDelete({_id:req.params.id, owner:req.user._id})
        if(!task){
            return res.status(404).send('task not found')
        }
        res.send("Task is Deleted")
    }catch(e){
        res.status(500).send(e.message)
    }

})

module.exports = router;