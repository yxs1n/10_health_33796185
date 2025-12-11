const express = require('express');
const router = express.Router();

// Home Route
router.get('/', function(req, res, next) {
    const user = req.session.user;

    if (!user) {
        return res.render('index.ejs', { user: null, workouts: [] });
    }

    let sqlquery = 'SELECT * FROM workouts WHERE user_id = ? ORDER BY date DESC LIMIT 1';
    db.query(sqlquery, [user.userid], (err, results) => {
        if (err) {
            return next(err);
        }
        res.render('index.ejs', { user: user, workouts: results });
    });
});

// About Route
router.get('/about', function(req, res, next) {
    res.render('about.ejs')
});

module.exports = router;