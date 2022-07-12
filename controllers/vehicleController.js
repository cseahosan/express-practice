const Vehicle = require('../models/Vehicle');

const index = async (req, res, next) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (err) {
        next(err);
    }
};

const store = async (req, res, next) => {
    try {
        const Vcl = new Vehicle(req.body);
        const data = await Vcl.save();
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

const show = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        res.status(200).json(vehicle);
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false});
        res.status(200).json(vehicle);
    } catch (err) {
        next(err);
    }
};

const destroy = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findByIdAndRemove(req.params.id);
        res.status(200).json(vehicle);
    } catch (err) {
        next(err);
    }
};

module.exports = {index, store, show, update, destroy};