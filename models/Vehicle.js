const { Schema, model, Types } = require('mongoose')

const vehicleSchema = Schema({
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
            type: Types.ObjectId,
            ref: "Owner" //model
        }
    ],
    user: {
        type: Types.ObjectId,
        ref: "User" // model
    }
});

const Vehicle = model('Vehicle', vehicleSchema)
module.exports = Vehicle
