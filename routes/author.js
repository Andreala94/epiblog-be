const express = require('express');
const mongoose = require('mongoose');
const AuthorModel = require('../models/authorsModel');
const Avatar = require('../middlewares/uploadAvatar')
const author = express.Router()
const bcrypt = require("bcrypt")


author.get("/authors", async (request, response) => {

    try {
        const posts = await AuthorModel.find().populate("posts");

        response.status(200).send({
            statusCode: 200,
            posts: posts,
        });
    } catch (error) {
        response.status(500).send({
            statusCode: 500,
            message: "internal server Error",
            error,
        });
    }

})

author.post('/register/avatarCloud', Avatar.single("avatar"), async (req, res) =>{
    try {
        res.status(200).json({avatar: req.file.path})
    } catch (error) {
        
    }
})
author.post('/register/authors', async (req, res) => {
//   const salt = await bcrypt.genSalt(10) // per scegliere complessità algoritmo di protezione password.

//   const cryptPassword = await bcrypt.hash(req.body.password, salt)
console.log(req.body);

    const newAuthor = new AuthorModel({
        name: req.body.name,
		surname: req.body.surname,
        password: req.body.password,
		email: req.body.email,
		dob: req.body.dob,
		avatar: req.body.avatar,
    })

    try {
        const author = await newAuthor.save();

        res.status(201).send({
            statusCode: 201,
            message: "Author saved successfully",
            author,
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server Error",
            error,
        });
    }
})

author.put('/authors/:id', async (req, res) => {
    const { id } = req.params

    const element = AuthorModel.findById(id)

    if (!element) {
        return res.status(404).send({
            statusCode: 404,
            message: ` post with id ${id} not found!`
        })

    }

    try {

        const dataUpdate = req.body
        const option = { new: true }
        const postExist = await AuthorModel.findByIdAndUpdate(id, dataUpdate, option)

        res.status(201).send({
            statusCode: 201,
            message: "Post saved successfully",
            paylod: postExist,
        });


    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server Error",
            error,
        });
    }
})



author.delete('/author/:id', async (req, res) => {
    const { id } = req.params

    try {
        const authorExit = AuthorModel.findById(id)

        if (!authorExit) {
            return res.status(404).send({
                statusCode: 404,
                message: ` post with id ${id} not found!`
            })

        }
       
        const authorToDelete = await AuthorModel.findByIdAndDelete(id)

        res.status(201).send({
            statusCode: 201,
            message: `Author with id ${id} deleted successfully`,
            
        });


    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server Error",
            error,
        });
    }
})

author.patch('/authors/:id', async (res, req) => {
    const { id } = req.params

    const postExist = await AuthorModel.findById(id)

    if (!postExist) {
        return res.status(404).send({
            statusCode: 404,
            message: ` post with id ${id} not found!`
        })

    }

    try {
        const authorId = id;
        const dataToUpdate = req.body

    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server Error",
            error,
        });
    }
})

module.exports = author;