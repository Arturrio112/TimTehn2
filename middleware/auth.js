const User = require('../models/user');



isLoggedIn = (req, res, next) => {
    if (!req.session.userID) {
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findByID(id)
    if (!user || user != req.session.userID) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/product/${id}`);
    }
    next();
}

module.exports = {
    isLoggedIn,
    isAuthor,
}