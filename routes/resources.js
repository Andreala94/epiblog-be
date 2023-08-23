const express = require('express');
const mongoose = require('mongoose');
const resourcesModel = require('../models/resourcesModel');

const resources = express.Router();

resources.get("/resources", async (req, res) => {

    const totalResources = await resourcesModel.count();

    try {
        const resources = await resourcesModel.find();

        res.status(200).send({
            statusCode: 200,
            totalResources: totalResources,
            posts: resources,
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server Error",
            error,
        });
    }

})


//! GET per prendere isActive corrispondente a true

resources.get("/resources/isActive", async (req, res) => {
    try {
        const activeResources = await resourcesModel.find({ isActive: true });


        res.status(200).send({
            statusCode: 200,
            totalActiveResources: activeResources.length,
            isActive: activeResources,
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server Error",
            error,
        });
    }
});

//! GET per trovare l'età maggiore di 26

resources.get("/resources/age", async (req, res) => {
    try {
        const ageResources = await resourcesModel.find({ age: { $gt: 26 } });

        res.status(200).send({
            statusCode: 200,
            totalAgeResources: ageResources.length,
            Age: ageResources,
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server Error",
            error,
        });
    }
});

//! GET per trovare l'età > 26 o  <= 30


resources.get("/resources/age?", async (req, res) => {
    try {
        const ageResources = await resourcesModel.find({ age: { $gt: 26, $lte: 30 } });

        res.status(200).send({
            statusCode: 200,
            totalAgeResources: ageResources.length,
            Age: ageResources,
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server Error",
            error,
        });
    }
});

//! GET per prendere eyes che sia brown o blue

resources.get("/resources/eyeColor", async (req, res) => {

    try {

        const eyeColorData = ["brown", "blue"];
        const eyeColorResources = await resourcesModel.find({ eyes: { $in: eyeColorData } });

        res.status(200).send({
            statusCode: 200,
            totalEyeColorResources: eyeColorResources.length,
            eyeColorResources: eyeColorResources,
        });

    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server Error",
            error,
        });

    }

});


module.exports = resources;