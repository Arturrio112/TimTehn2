const expressEror = require('../utils/customError')
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof expressEror) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(500).json({ msg: 'Something went wrong, please try again' })
}

module.exports = errorHandlerMiddleware