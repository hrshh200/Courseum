const mongoose = require("mongoose");

const employeefeedback = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        required: true
    },
    review : {
        type: String,
        required: true
    }
})

const feedback = new mongoose.model("Feedback" , employeefeedback);
module.exports = feedback;