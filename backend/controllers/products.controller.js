import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProduct = async (req , res)=>{
    try{
        const products =  await Product.find({});
        if(!products){
            return res.status(400).json({
                success :false, 
                message : 'Products not found'
            })
        }

        res.status(200).json({
            success :true,
            data : products
        })
    }
    catch(error){
        console.log(`Error in get all products controller  : ${error.message}`)
        res.status(500).json("Internal Server  Error");
    }
}

//--------------------------------------------*************------------------------------------------------

export const createProduct =  async (req , res) =>{
     const product = req.body;
     try {
        if(!product.name || !product.price || !product.image){
            return res.status(400).json({
                success : false ,
                message : "Please provide all fileds"
            })
        }
        const newProduct = new Product(product)
        if(newProduct){
            await newProduct.save(); 
        }
        res.status(201).json({
            success : true , 
            data : newProduct
        })
     } catch (error) {
        console.log(`Error in create product controller : ${error.message}`)
        res.status(500).json("Internal Server  Error");
     }
}

//--------------------------------------------*************------------------------------------------------

export const deleteProduct = async(req , res)=>{
    const {id} = req.params;
    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({
            success : true, 
            message : "Product Deleted"
        })
    } catch (error) {
        console.log(`Error in delete controller  : ${error.message}`)
        res.status(500).json("Internal Server  Error");
    }
}

//--------------------------------------------*************------------------------------------------------

export const updateProduct = async (req , res)=>{
    const {id} = req.params;
    try {
        const product = req.body;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({
                success : false ,
                message : "Invalid Product id"
            })
        }
        const isProduct =  await Product.findById(id);
        if(!isProduct){
            return res.status(404).json({
                success :false , 
                message : "Product not found"
            })
        }
        const updatedProduct = await Product.findByIdAndUpdate(id , product,{new :true});
        
        if(!updatedProduct){
            return res.status(400).json({
                success :false, 
                message : 'Products not found'
            })
        }

        res.status(200).json({
            success :true , 
            message : "Successfully",
            data : updatedProduct
        })


    } catch (error) {
        console.log(`Error in update controller  : ${error.message}`)
        res.status(500).json("Internal Server  Error");      
    }
}