const bcrypt = require('bcrypt');


async function dajHash() {
    const password = "password1";
    const hashPassword = await bcrypt.hash(password, 10);
    console.log({
        password,
        hashPassword
    });
}

dajHash();
