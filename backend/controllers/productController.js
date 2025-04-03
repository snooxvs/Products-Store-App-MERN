import mongoose from 'mongoose';
import Product from '../models/productModel.js'

export const postProduct = async(req,res)=>{
    try{
        const product = req.body;
        if(!product.name || !product.price || !product.image){
            return res.status(400).json({success: false,message: 'Please provide all fields'})
        }
        const newProduct = await Product.create(req.body)
        res.status(201).json({success: true,message: "Product Created",data: newProduct})
    }catch(err){
        console.log(`Error in create product : ${err.message}`)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
}

export const deleteProduct = async (req,res)=>{
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({success: false,message: 'Invalid Product Id'})
        }
        const deleted = await Product.findByIdAndDelete(req.params.id)
        if (!deleted) {
            console.log("Product not found in database.");
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({success: true,message: "Product Deleted",data: deleted})
    }catch(err){
        console.log(`Error in delete product : ${err.message}`)
        res.status(500).json({success: false,message: "Product not found"})
    }
}

export const getAllProduct = async (req,res)=>{
    try{
        const getAll = await Product.find({})
        res.status(200).json({success: true,message: "GET All Product",data: getAll})
    }catch(err){
        console.log(`Error in get all product : ${err.message}`)
        res.status(500).json({success: false,message: "Internal Server Error"})
    }
}

export const putProduct = async (req,res)=>{
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({success: false,message: 'Invalid Product Id'})
        }
        const updated = await Product.findByIdAndUpdate(req.params.id,req.body,{new: true})
        res.status(200).json({success: true,message: "Product Updated",data: updated})
    }catch(err){
        console.log(`Error in update product : ${err.message}`)
        res.status(500).json({success: false,message: "Internal Server Error"})
    }
}

