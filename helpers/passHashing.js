const bcrypt = require('bcrypt');
const saltorRounds = 10; 

async function hashing (pass){
    return hashedPassword = await bcrypt.hash(pass, saltorRounds);
  };

module.exports = { hashing };