var bcrypt = require('bcryptjs');

function hashPassword(password){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    return hash
}

module.exports = hashPassword