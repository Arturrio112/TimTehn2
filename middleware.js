const User = require('./models/user')


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user_id) {
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}



module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = User.findByID(id)
    if (id != req.session.user_id) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/`);
    }
    next();
}

module.exports.notFound = (req, res) => res.status(404).send('Route does not exist')


class ExpressError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;