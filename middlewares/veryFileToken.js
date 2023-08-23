const jwt = require("jsonwebtoken");
const express = require('express')


const veryFileToken = (req, res, next)=>{
    const token = req.header('Authorization')

    if(!token) {
        return res.status(401).send({
            errorType: "Token non presente!",
            statusCode: 401,
            message: "Per poter utilizzare l'endpoint c'è bisogno di un'autorizzazione"
        })
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
    } catch (error) {
        res.status(403).send({
            errorType: "Token scaduto o non corretto",
            statusCode: 403,
        });
    }
}


module.exports = veryFileToken