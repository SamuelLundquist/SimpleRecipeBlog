const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

/**
 * App routes
**/

//Get Routes
router.get('/', recipeController.homepage);
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/categories', recipeController.exploreCategories);
router.get('/categories/:id', recipeController.exploreCategoryById);
router.get('/recipe/:id', recipeController.exploreRecipe);
router.get('/explore-random', recipeController.exploreRandom);
router.get('/submit-recipe', recipeController.submitRecipe);

// POST Routes
router.post('/search', recipeController.searchRecipe);


module.exports = router;
