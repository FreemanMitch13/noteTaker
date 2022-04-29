const router = require('express').Router();
// const apiRoutes = require('./apiRoutes');
const htmlRoutes = require('./htmlRoutes.js');

// app.use('/api', apiRoutes);
router.use('/', htmlRoutes);

module.exports = router;