module.exports = function (models) {
    const { user } = models;

    return {
        getAllUsers() {
            return user.findAll();
        }
    }
}
