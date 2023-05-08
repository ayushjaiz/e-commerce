const mongoose = require('mongoose');

const dbConnect = () => {
    try {
        mongoose.set("strictQuery", false);
        const conn = mongoose.connect(process.env.MONGO_URL);
        console.log("Dtabase connected")
    }
    catch (err) {
        throw new Error(err);
    }
}

module.exports = dbConnect;