

module.exports = function (models) {

    const userRepository = require('./user')(models);


    return {
        user: userRepository
    }

}
