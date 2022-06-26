module.exports = {

    getHomePage: (req, res) => {
        res.render('main')
    },
    getLogIN: (req, res) => {
        res.render('login')
    },
    getSignUP: (req, res) => {
        res.render('signUp')
    }
}