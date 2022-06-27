module.exports = {

    getHomePage: (req, res) => {
        res.render('main')
    },
    getLogIN: (req, res) => {
        res.render('login')
    },
    getSignUP: (req, res) => {
        res.render('signUp')
    },
    getAuctionHouse: (req, res) => {
        res.render('auctionhouse')
    },
    getProfile: (req, res) => {
        res.render('profile')
    },
    getItem: (req, res) => {
        res.render('item')
    },
    getAuctionItem: (req, res) => {
        res.render('itemAuction')
    }
}