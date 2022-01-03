require('../models/database');
const category = require('../models/Category');


/**
 * GET /
 * Homepage
**/
exports.homepage = async(req, res) => {

	res.render('index', { title: 'Cooking Blog - Home' } );

}
