const path = require('path');

// import .env variables
require('dotenv-safe').load({
    allowEmptyValues: true,
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example'),
});

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    secret: "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING",
    mongo: {
        uri: process.env.NODE_ENV === 'development' ? process.env.MONGO_URI_DEV : process.env.MONGO_URI,
    },
};
