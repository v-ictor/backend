const path = require('path');
const {unlink} = require('fs-extra');
const Category = require('../models/Category');
const Foods = require('../models/Foods');

module.exports = {
    showFoods: async (req, res) => {
        try{
            const foods = await Foods.find().populate({
                path: 'category',
                model: 'Category'
            });
            if(foods.length){
                res.status(200).json(foods);
            } else {
                return res.status(204).json({msg: 'No Content'});
            }
        } catch(err){
            res.status(500).send(err);
        }
    },
    createFood: async (req, res) => {
        try{
            const {title, description, price, category, ingredients} = req.body;
            const imageFood = req.file;
            const foods = await Foods.findOne({title});
            const categories = await Category.findOne({name:category});
            if(foods){
                if(imageFood){
                    await unlink(path.resolve('./src/uploads/images/img/'+imageFood.filename));
                    return res.json({msg:'La comida ya existe.'});
                } else {
                    return res.json({msg:'La comida ya existe.'})
                }
            } else {
                const newFood = new Foods({
                    title,
                    description,
                    price,
                    ingredients,
                    category: categories._id
                });
                if(!imageFood){
                    await newFood.save();
                    res.json({message:'Comida guardada sin foto.'});
                } else {
                    newFood.imageFood = '/images/img/'+imageFood.filename;
                    await newFood.save();
                    res.json({message:'Comida guardada con foto.'})
                }
            }
        } catch(err){
            res.status(500).send(err);
        }
    },
    showFood: async (req, res) => {
        try{
            const {id} = req.params;
            const food = await Foods.findById(id).populate({
                path: 'category',
                model: 'Category'
            });
            if(food){
                res.json(food);
            } else {
                return res.status(204).json({msg:'NO CONTENT'});
            }
        } catch(err){
            res.status(500).send(err);
        }
    },
    deleteFood: async (req, res) => {
        const {id} = req.params;
        const food = await Foods.findByIdAndDelete(id);
        if(food.imageFood === '/images/default/food.jpg'){
            res.json({message:'Comida eliminada sin imagen.'})
        } else {
            await unlink(path.resolve('./src/uploads'+food.imageFood));
            res.json({message:'Comida eliminada con imagen.'});
        }
    },
    updateFood: async (req, res) => {
        try{
            const {id} = req.params;
            const {title,description,category,price,ingredients} = req.body;
            const imageFood = req.file;
            const categories = await Category.findOne({name:category});
            var updFood = {
                title,
                description,
                price,
                category: categories._id,
                ingredients
            };
            if(imageFood){
                updFood.imageFood = '/images/img/'+imageFood.filename;
                const food = await Foods.findByIdAndUpdate(id, updFood);
                if(food.imageFood === '/images/default/food.jpg'){
                    res.json({msg:'Actualizado con foto 1 sin foto'});
                } else {
                    await unlink(path.resolve('./src/uploads'+food.imageFood));
                    res.json({msg:'Actualizado con foto 1 con foto'});
                }
            } else {
                updFood.imageFood = '/images/default/food.jpg';
                const food = await Foods.findByIdAndUpdate(id, updFood);
                if(food.imageFood === '/images/default/food.jpg'){
                    res.json({msg:'Actualizado sin foto 1 sin foto'});
                } else {
                    await unlink(path.resolve('./src/uploads'+food.imageFood));
                    res.json({msg:'Actualizado sin foto 1 con foto'});
                }
            }
        } catch(err){
            res.status(500).send(err);
        }
    }
};