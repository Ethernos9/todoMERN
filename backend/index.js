import express from "express";
import zod from "zod"
import cors from "cors"


// zod
import { createTodo,updateTodo } from "./types.js";



const app = express()
const port = 3000;
// middleware

app.use(cors())
app.use(express.json())

// db
import connectDb from "./connectDB.js";

connectDb("mongodb://127.0.0.1:27017/todosFull").then(()=>console.log("Db connection established")).catch(()=>console.log("Error connecting DB"))
import todoModel from "./models/todoModel.js";

app.use(express.json())
app.get("/todos",async(req,res)=>{
     const todos = await todoModel.find({})
     res.status(200).json({
        
        todos
     })
})
app.post("/todo",async(req,res)=>{
      const {title,desc} = req.body
      const parseSchema = createTodo.safeParse(req.body)
      if (!parseSchema.success){
        res.status(411).json({
            msg:"you must provide valid inputs"
        })
        return
      }   

      const todo  = await todoModel.create ({
        title:title,
        desc :desc  
        
    })
    res.status(201).json({
        msg:"todo created successfully",
        data:todo
    })
        
})
app.put("/completed",async(req,res)=>{
    const {id} = req.body
    const parseSchema = updateTodo.safeParse(req.body)
      if (!parseSchema.success){
        res.status(411).json({
            msg:"you must provide valid inputs"
        })
        return
      }  

      const todo = await todoModel.findById(id)
       if (!todo) return res.status(400).json({
        msg:"Not found"
       })
       todo.complete =!todo.complete
       
       await todo.save()
       res.status(200).json({
           msg: "Todo updated successfully",
           data:todo
       })


    //    await todo.updateOne({
    //     _id: req.body.id,

    //    },{
    //     completed:!true
    //    })
})

app.post("/delete",async(req,res)=>{
    const {id }= req.body;
    const parseSchema = updateTodo.safeParse(req.body)
      if (!parseSchema.success){
        res.status(411).json({
            msg:"you must provide valid inputs"
        })
        return
      }  
      const todo = await todoModel.findById(id)
      if(!todo){
        return res.status(404).json({
            msg: "todo does not exist"
        })
      }
       await todoModel.findByIdAndDelete(id)
      res.status(200).json({
        msg: "Todo deleted successfully"
      })

})
app.listen(port,()=>{
    console.log(`listening on ${port}`)
})