const mongoose = require('mongoose');

const dbConnect = (uri) => {
    try {
        mongoose.set("strictQuery", true);
        const conn = mongoose.connect(uri);
        console.log("Database connected")
    }
    catch (err) {
        throw new Error(err);
    }
}

module.exports = dbConnect;