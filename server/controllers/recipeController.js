require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');


/**
 * GET /
 * Homepage
 **/
exports.homepage = async (req, res) => {
	try {
		const categoriesLimitNumber = 5;
		const recipeLimitNumber = 4;
		const categories = await Category.find({}).limit(categoriesLimitNumber);
		const latest = await Recipe.find({}).sort({
			_id: -1
		}).limit(recipeLimitNumber);
		const american = await Recipe.find({
			'category': 'American'
		}).limit(recipeLimitNumber);
		const chinese = await Recipe.find({
			'category': 'Chinese'
		}).limit(recipeLimitNumber);
		const japanese = await Recipe.find({
			'category': 'Japanese'
		}).limit(recipeLimitNumber);
		const food = {
			latest,
			american,
			chinese,
			japanese
		};
		res.render('index', {
			title: 'Cooking Blog - Home',
			categories,
			food
		});
	} catch (e) {
		res.status(500).send({
			message: e.message || "Error occurred."
		});
	}

}

/**
 * GET /explore-latest
 * Explore Latest
 **/
exports.exploreLatest = async (req, res) => {
	try {
		const limitNumber = 20;
		const latest = await Recipe.find({}).sort({
			_id: -1
		}).limit(limitNumber);
		res.render('explore-latest', {
			title: 'Cooking Blog - Explore Latest',
			latest
		});
	} catch (e) {
		res.status(500).send({
			message: e.message || "Error occurred."
		});
	}

}

/**
 * GET /categories
 * Categories
 **/
exports.exploreCategories = async (req, res) => {
	try {
		const limitNumber = 20;
		const categories = await Category.find({}).limit(limitNumber);
		res.render('categories', {
			title: 'Cooking Blog - Categories',
			categories
		});
	} catch (e) {
		res.status(500).send({
			message: e.message || "Error occurred."
		});
	}

}

/**
 * GET /categories/:id
 * CategoryById
 **/
exports.exploreCategoryById = async (req, res) => {
	try {
		let categoryId = req.params.id;
		const limitNumber = 20;
		const categoryById = await Recipe.find({
			'category': categoryId
		}).limit(limitNumber);
		res.render('category', {
			title: 'Cooking Blog - ' + categoryId + ' Food',
			categoryId,
			categoryById
		});
	} catch (e) {
		res.status(500).send({
			message: e.message || "Error occurred."
		});
	}

}

/**
 * GET /recipe/:id
 * Recipe
 **/
exports.exploreRecipe = async (req, res) => {
	try {
		let recipeId = req.params.id;
		const recipe = await Recipe.findById(recipeId);
		let recipeName = 'Recipe';
		if (recipe.name) {
			recipeName = recipe.name;
			if (recipe.email) {
				recipeName = recipeName + ' by ' + recipe.email;
			}
		}
		res.render('recipe', {
			title: 'Cooking Blog - ' + recipeName,
			recipe
		});
	} catch (e) {
		res.status(500).send({
			message: e.message || "Error occurred."
		});
	}

}

/**
 * GET /explore-random
 * Explore Random
 **/
exports.exploreRandom = async (req, res) => {
	try {
		let count = await Recipe.find().countDocuments();
		let random = Math.floor(Math.random() * count);
		const recipe = await Recipe.findOne().skip(random).exec();
		res.render('explore-random', {
			title: 'Cooking Blog - Explore Random',
			recipe
		});
	} catch (e) {
		res.status(500).send({
			message: e.message || "Error occurred."
		});
	}

}

/**
 * GET /submit-recipe
 * Submit Recipe
 **/
exports.submitRecipe = async (req, res) => {
	const infoErrorsObj = req.flash('infoErrors');
	const infoSubmitObj = req.flash('infoSubmit');
	res.render('submit-recipe', {
		title: 'Cooking Blog - Submit Recipe',
		infoErrorsObj,
		infoSubmitObj
	});
}

/**
 * POST /submit-recipe
 * Submit Recipe
 **/
exports.submitRecipeOnPost = async (req, res) => {
	try {
		let imageUploadFile;
		let uploadPath;
		let newImageName;

		if (!req.files || Object.keys(req.files).length === 0) {
			console.log('No files were uploaded.');
		} else {
			imageUploadFile = req.files.image;
			newImageName = Date.now() + imageUploadFile.name;
			uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
			imageUploadFile.mv(uploadPath, function(err) {
				if (err) {
					return res.status(500).send(err);
				}
			});
		}

		const newRecipe = new Recipe({
			name: req.body.name,
			description: req.body.description,
			email: req.body.email,
			ingredients: req.body.ingredients,
			category: req.body.category,
			image: newImageName,
		});
		await newRecipe.save();
		req.flash('infoSubmit', 'Recipe successfully added!');
		res.redirect('submit-recipe');
	} catch (e) {
		req.flash('infoErrors', e);
		res.redirect('submit-recipe');
	}
}

/**
 * POST /search
 * Search Recipes
 **/
exports.searchRecipe = async (req, res) => {
	try {
		let searchTerm = req.body.searchTerm;
		let recipes = await Recipe.find({
			$text: {
				$search: searchTerm,
				$diacriticSensitive: true
			}
		});
		res.render('search', {
			title: 'Cooking Blog - Search',
			recipes,
			searchTerm
		});
	} catch (e) {
		res.status(500).send({
			message: e.message || "Error occurred."
		});
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
