const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    registration_no: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    owners: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Owner" //model
        }
    ],
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User" // model
    }
});

module.exports = vehicleSchema;