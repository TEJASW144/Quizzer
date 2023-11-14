const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    quizes_made: { type: Number, default: 0, },
    quizes_given: [{
        quiz_id: { type: String },
        score: { type: Number }
    }]
})

const User = mongoose.models.users || new mongoose.model('User', userSchema);

module.exports = {
    User,
}