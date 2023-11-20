const mongoose = require('mongoose');

const quesSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    quiz: [{
        question: { type: String, required: true, },
        options: {
            type: [String],
            required: true,
        },
        correctAnswer: { type: String, required: true, },
    }],
})

const Ques = new mongoose.model('Question', quesSchema);

module.exports = Ques;