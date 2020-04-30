const path = require('path');
const {unlink} = require('fs-extra');
const Category = require('../models/Category');
const Foods = require('../models/Foods');

module.exports = {
    showCtgories: async (req, res) => {
        try {
            const category = await Category.find();
            if(category.length){
                res.status(200).json(category);
            } else {
                return res.status(204).send({msg: 'No Content'});
            }
        } catch(err){
            res.status(500).send(err);
        }
    },
    createCategory: async (req ,res) => {
        try{
            const {name,description} = req.body;
            const imageCtgory = req.file;
            const category = await Category.findOne({name});
            if(category){
                if(imageCtgory){
                    await unlink(path.resolve('./src/uploads/images/img/'+imageCtgory.filename));
                    return res.json({message: 'La categoria ya existe.'});
                } else {
                    return res.json({message: 'la categoria ya existe.'})
                }
            } else {
                const newCategory = new Category({
                    name,
                    description
                });
                if(!imageCtgory){
                    await newCategory.save();
                    res.status(201).json({message: 'Categoria guardada sin foto'});
                } else {
                    newCategory.imageCtgory = '/images/img/'+imageCtgory.filename;
                    await newCategory.save();
                    res.status(201).json({message: 'Categoria guardada con foto'});
                }
            }
        } catch(err) {
            res.status(500).send(err);
        }
    },
    showCtgory: async (req, res) => {
        try {
            const {id} = req.params;
            const category = await Category.findById(id);
            if(category){
                res.status(200).json(category);
            } else {
                return res.status(204).json({msg:'NO CONTENT'});
            }
        } catch(err){
            res.status(500).send(err);
        }
        
    },
    deleteCtgory: async (req, res) => {
        const {id} = req.params;
        const category = await Category.findByIdAndDelete(id);
        if(category.imageCtgory === '/images/default/category.jpg'){
            res.json({message: 'Categoria eliminada sin foto.'});
        } else {
            await unlink(path.resolve('./src/uploads'+category.imageCtgory));
            res.json({message: 'Categoria eliminada con foto.'});
        }
    },
    updateCtgory: async (req, res) => {
        try{
            const {id} = req.params;
            const {name,description} = req.body;
            const imageCtgory = req.file;
            var updCategory = {
                name,
                description
            };
            if(imageCtgory){
                updCategory.imageCtgory = '/images/img/'+imageCtgory.filename;
                const category = await Category.findByIdAndUpdate(id, updCategory);
                if(category.imageCtgory === '/images/default/category.jpg'){
                    res.json({msg: 'Actualizado con foto 1 sin foto'});
                } else {
                    await unlink(path.resolve('./src/uploads'+category.imageCtgory));
                    res.json({msg: 'Actualizado con foto 1 con foto'});
                }
            } else {
                updCategory.imageCtgory = '/images/default/category.jpg';
                const category = await Category.findByIdAndUpdate(id, updCategory);
                if(category.imageCtgory === '/images/default/category.jpg'){
                    res.json({msg: 'Actualizado sin foto 1 sin foto.'});
                } else {
                    await unlink(path.resolve('./src/uploads'+category.imageCtgory));
                    res.json({msg: 'Actualizando sin foto 1 con foto'});
                }
            }
        } catch(err){
            res.status(500).send(err);
        }
    },
    showCtgoryFoods: async (req, res) => {
        try{   
            const {key} = req.params;
            const category = await Category.findOne({name: key});
            if(category){    
                const CtgoryFood = await Foods.find({category: category._id});
                if(CtgoryFood.length){
                    res.json(CtgoryFood);
                } else {
                    return res.status(204).json({msg: 'NO CONTENT'});
                }
            } else {
                return res.json({msg:'No existe categoria.'})
            }
        } catch(err){
            res.status(500).send(err);
        }
    }
}