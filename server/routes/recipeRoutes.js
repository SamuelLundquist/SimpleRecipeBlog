const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

/**
 * App routes
**/
router.get('/', recipeController.homepage);
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/categories', recipeController.exploreCategories);
router.get('/categories/:id', recipeController.exploreCategoryById);
router.get('/recipe/:id', recipeController.exploreRecipe);
router.get('/explore-random', recipeController.exploreRandom);
router.post('/search', recipeController.searchRecipe);


module.exports = router;
