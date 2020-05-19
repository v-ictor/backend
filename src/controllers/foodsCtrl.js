const path = require('path');
const {unlink} = require('fs-extra');
const Category = require('../models/Category');
const Foods = require('../models/Foods');

module.exports = {
    showFoods: async (req, res) => {
        try{
            const foods = await Foods.find()/*.populate({
                path: 'category',
                model: 'Category'
            })*/;
            if(foods.length){
                res.status(200).json(foods);
            } else {
                return res.status(204).json({msg: 'No Content'});
            }
        } catch(err){
            res.status(500).send(err);
        }
    },
    showFoodsEnable: async (req, res) => {
        try{
            const foods = await Foods.find({status: true})/*.populate({
                path: 'category',
                model: 'Category'
            })*/;
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
                var priceN = price;
                const newFood = new Foods({
                    title,
                    description,
                    // price: priceN,
                    ingredients,
                    category: categories.name
                });
                if(priceN.indexOf(',') != -1){
                    priceN = priceN.replace(".","");
                    priceN = priceN.replace(",",".");
                    newFood.price = priceN;
                    // const newFood = new Foods({
                    //     title,
                    //     description,
                    //     price: priceN,
                    //     ingredients,
                    //     category: categories.name
                    // });
                    if(!imageFood){
                        await newFood.save();
                        res.json({message:'Comida guardada sin foto.'});
                    } else {
                        newFood.imageFood = '/images/img/'+imageFood.filename;
                        await newFood.save();
                        res.json({message:'Comida guardada con foto.'})
                    }
                    // res.json({msg: 'con comas.',total: Number(numero)});
                } else {
                    newFood.price = priceN;
                    // const newFood = new Foods({
                    //     title,
                    //     description,
                    //     price: priceN,
                    //     ingredients,
                    //     category: categories.name
                    // });
                    if(!imageFood){
                        await newFood.save();
                        res.json({message:'Comida guardada sin foto.'});
                    } else {
                        newFood.imageFood = '/images/img/'+imageFood.filename;
                        await newFood.save();
                        res.json({message:'Comida guardada con foto.'})
                    }
                    // res.json({msg: 'sin comas.',total: Number(numero)});
                }
                
            }
        } catch(err){
            res.status(500).send(err);
        }
    },
    showFood: async (req, res) => {
        try{
            const {id} = req.params;
            const food = await Foods.findById(id)/*.populate({
                path: 'category',
                model: 'Category'
            })*/;
            if(food){
                res.status(200).json(food);
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
        if(food){
            if(food.imageFood === '/images/default/food.jpg'){
                res.json({message:'Comida eliminada sin imagen.'})
            } else {
                await unlink(path.resolve('./src/uploads'+food.imageFood));
                res.json({message:'Comida eliminada con imagen.'});
            }
        } else {
            return res.status(300).json({msg:'La comida no existe.'});
        }
    },
    updateFood: async (req, res) => {
        try{
            const {id} = req.params;
            const {title,description,category,price,ingredients} = req.body;
            const imageFood = req.file;
            const categories = await Category.findOne({name:category});
            var priceN = price;
            var updFood = {
                title,
                description,
                // price,
                category: categories.name,
                ingredients
            };
            if(priceN.indexOf(',') != -1){
                priceN = priceN.replace(".","");
                priceN = priceN.replace(",",".");
                updFood.price = priceN;
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
                    // updFood.imageFood = '/images/default/food.jpg';
                    const food = await Foods.findByIdAndUpdate(id, updFood);
                    res.json({msg:'Actualizado'});
                    // if(food.imageFood === '/images/default/food.jpg'){
                    //     res.json({msg:'Actualizado sin foto 1 sin foto'});
                    // } else {
                    //     await unlink(path.resolve('./src/uploads'+food.imageFood));
                    //     res.json({msg:'Actualizado sin foto 1 con foto'});
                    // }
                }
            } else {
                updFood.price = priceN;
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
                    // updFood.imageFood = '/images/default/food.jpg';
                    const food = await Foods.findByIdAndUpdate(id, updFood);
                    res.json({msg:'Actualizado'});
                    // if(food.imageFood === '/images/default/food.jpg'){
                    //     res.json({msg:'Actualizado sin foto 1 sin foto'});
                    // } else {
                    //     await unlink(path.resolve('./src/uploads'+food.imageFood));
                    //     res.json({msg:'Actualizado sin foto 1 con foto'});
                    // }
                }
            }
            
        } catch(err){
            res.status(500).send(err);
        }
    },
    upadteText: async (req, res) => {
        try{
            const {id} = req.params;
            const {title,description,category,price,ingredients} = req.body;
            const categories = await Category.findOne({name:category});
            var updFood = {
                title,
                description,
                price,
                category: categories.name,
                ingredients
            };
            const food = await Foods.findByIdAndUpdate(id, updFood);
            res.json({msg:'Actualizado', food});
        } catch(err){
            res.status(500).send(err);
        }
    },
    enable: async (req, res) => {
        const {id} = req.params;
        const foods = await Foods.findById(id);
        foods.status = !foods.status;
        await foods.save();
        if(foods.status === true){
            res.status(200).json({msg:'La categoria esta habilitada.'})
        } else {
            res.status(200).json({msg:'La categoria esta deshabilitada.'})
        }
    }
};