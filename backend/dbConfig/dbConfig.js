
const mongoose = require('mongoose');

const connect = async () =>  {
    await mongoose.connect("mongodb://127.0.0.1:27017/quiz-user-data")
    .then(() => console.log('User Database Connected'))
    .catch((error) => console.log(error));
}

module.exports = connect;