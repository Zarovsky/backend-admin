const mongoose = require('mongoose');
require('dotenv').config();

// async hace que retorne una promesa
const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log('DB online');
    }
    catch (error) {
        throw new Error('Error conectando a la BBDD');
    }
}

module.exports = {
    dbConnection
}
