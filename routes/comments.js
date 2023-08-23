const express = require('express');
const mongoose = require('mongoose');
const PostsModel = require('../models/postModel');
const AuthorModelSchema = require("./author");
const authorsModel = require('../models/authorsModel');


//! POST 
post.post('/posts/:id/comments', async (req, res) => { 
    const { id } = req.params

    const postExist = await PostsModel.findById(id)

    if (!postExist) {
        return res.status(404).send({
            statusCode: 404,
            message: ` post with id ${id} not found!`
        })

    }
    

   

    const newComments = new commentsModel({

       commento: req.body.commento 
        
    })

    try {
        
         
        await PostsModel.updateOne({_id: id}, {$push: {commenti: newComments}});

        res.status(201).send({
            statusCode: 201,
            message: "Comments saved successfully",
            paylod: post,
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server Error",
            error,
        });
    }
})