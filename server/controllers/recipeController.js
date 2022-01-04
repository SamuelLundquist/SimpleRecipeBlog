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
			const latestLimitNumber = 4;
			const categories = await Category.find({}).limit(categoriesLimitNumber);
			const latest = await Recipe.find({}).sort({_id: -1}).limit(latestLimitNumber);
			const food = {latest};
			res.render('index', { title: 'Cooking Blog - Home', categories, food } );
	} catch (e) {
		res.status(500).send({message: error.message || "Error occurred."});
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
		res.status(500).send({message: error.message || "Error occurred."});
	}

}

/*
async function insertDummyRecipeData() {
	try {
		await Recipe.insertMany([
			{
				"name": "Recipe Name Goes Here",
				"description": `Recipe Description Goes Here`,
				"email": "recipeemail@raddy.co.uk",
				"ingredients": [
					"1 level teaspoon baking powder",
					"1 level teaspoon cayenne pepper",
					"1 level teaspoon hot smoked paprika",
				],
				"category": "American",
				"image": "southern-friend-chicken.jpg"
			},
			{
				"name": "Recipe Name Goes Here",
				"description": `Recipe Description Goes Here`,
				"email": "recipeemail@raddy.co.uk",
				"ingredients": [
					"1 level teaspoon baking powder",
					"1 level teaspoon cayenne pepper",
					"1 level teaspoon hot smoked paprika",
				],
				"category": "American",
				"image": "southern-fried-chicken.jpg"
			},
		]);
	} catch (e) {
		console.log('Error:', + e);
	}
}

insertDummyRecipeData();
*/
