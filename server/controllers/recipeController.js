require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');


/**
 * GET /
 * Homepage
**/
exports.homepage = async(req, res) => {
	try {
			const categoriesLimitNumber = 5;
			const recipeLimitNumber = 4;
			const categories = await Category.find({}).limit(categoriesLimitNumber);
			const latest = await Recipe.find({}).sort({_id: -1}).limit(recipeLimitNumber);
			const american = await Recipe.find({ 'category': 'American'}).limit(recipeLimitNumber);
			const chinese = await Recipe.find({ 'category': 'Chinese'}).limit(recipeLimitNumber);
			const japanese = await Recipe.find({ 'category': 'Japanese'}).limit(recipeLimitNumber);
			const food = {latest, american, chinese, japanese};
			res.render('index', { title: 'Cooking Blog - Home', categories, food } );
	} catch (e) {
		res.status(500).send({message: e.message || "Error occurred."});
	}

}

/**
 * GET /categories
 * Categories
**/
exports.exploreCategories = async(req, res) => {
	try {
			const limitNumber = 20;
			const categories = await Category.find({}).limit(limitNumber);
			res.render('categories', { title: 'Cooking Blog - Categories', categories } );
	} catch (e) {
		res.status(500).send({message: e.message || "Error occurred."});
	}

}

/**
 * GET /recipe/:id
 * Recipe
**/
exports.exploreRecipe = async(req, res) => {
	try {
			let recipeId = req.params.id;
			const recipe = await Recipe.findById(recipeId);
			res.render('recipe', { title: 'Cooking Blog - Recipe', recipe } );
	} catch (e) {
		res.status(500).send({message: e.message || "Error occurred."});
	}

}

/*
async function insertDummyRecipeData() {
	try {
		await Recipe.insertMany([
			{
				"name": "Japanese recipe 1",
				"description": `Recipe Description Goes Here`,
				"email": "recipeemail@raddy.co.uk",
				"ingredients": [
					"1 level teaspoon baking powder",
					"1 level teaspoon cayenne pepper",
					"1 level teaspoon hot smoked paprika",
				],
				"category": "Japanese",
				"image": "sushi.jpg"
			},
			{
				"name": "Japanese recipe 2",
				"description": `Recipe Description Goes Here`,
				"email": "recipeemail@raddy.co.uk",
				"ingredients": [
					"1 level teaspoon baking powder",
					"1 level teaspoon cayenne pepper",
					"1 level teaspoon hot smoked paprika",
				],
				"category": "Japanese",
				"image": "sushi.jpg"
			},
		]);
	} catch (e) {
		console.log('Error:', + e);
	}
}

insertDummyRecipeData();
*/
