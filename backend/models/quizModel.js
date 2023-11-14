const mongoose = require('mongoose');

const quesSchema = mongoose.Schema({
    quiz: [{
        question: { type: String, required: true, },
        option_1: { type: String, required: true, },
        option_2: { type: String, required: true, },
        option_3: { type: String },
        option_4: { type: String },
        answer: { type: String, required: true, },
    }]
})

const Ques = mongoose.models.questions || new mongoose.model('Question', quesSchema);

module.exports = Ques;