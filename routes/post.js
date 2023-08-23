const express = require('express');
const mongoose = require('mongoose');
const PostsModel = require('../models/postModel');
const AuthorModelSchema = require("./author");
const authorsModel = require('../models/authorsModel');
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const veryFileToken = require('../middlewares/veryFileToken');
const crypto = require('crypto'); // libreria presente in nodejs che genera un id univoco




const post = express.Router()

cloudinary.config({ 
    cloud_name: 'dsmb3mzsp', 
    api_key: '871683394519529', 
    api_secret: 'Wss9FCpQptIISb-boHhBFiw3nQM' 
  });



const cloudStorage = new CloudinaryStorage({
     cloudinary: cloudinary,
     params: {
        folder: 'testEpicode',
        format: async ( req, file, cb)=> 'png',
        public_id: (req, file) => file.name,
     }
    
});


// funzione di default 
const internalStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads') // cartella uploads dove deve salvare i file
    },

    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const fileExtension = file.originalname.split(".").pop();
		cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`);
    }
});

const uploads = multer({ storage: internalStorage }); // caricarsi quello storage
const cloudUpload = multer ({ storage: cloudStorage }) // caricare immagine incloud


//! POST dell'IMG
post.post('/posts/internalUpload', uploads.single('cover'), async (req, res) =>{

    const imageURL= req.protocol + "://" + req.get("host")  //salvare in mongoose tutto l url generato
    

    try {
        const imageName = req.file.filename;
        res.status(200).send({  cover:  `${imageURL}/uploads/${imageName}`  })
        
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Upload not completed correctly",
           
        });
    }
})
//! post IMG in CLOUD
post.post("/posts/cloudUpload", cloudUpload.single("cover"), async (req, res) => {
		try {
			res.status(200).json({ cover: req.file.path });
		} catch (error) {
			console.error("File upload failed:", error);
			res.status(500).json({ error: "File upload failed" });
		}
	}
);




//! GET TITLE
post.get('/posts/title'), async (req, res) => {
    const { postTitle } = req.query;

    try {
        const postByTitle = await PostsModel.find({
            title: {
                $regex: '.*' + postTitle + '.*',
                $options: 'i',
            },
        });

        if (!postByTitle || postByTitle.length == 0) {
            return res.status(404).send({
                statusCode: 404,
                message: `post with title ${postTitle} not found!`
            })
        }

       res.status(200).send({
        status: 200,
        postByTitle,
       })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server Error",
            error,
        });
    }
}

//!GET ID

post.get("/posts/:id", async (req, res) => {

    try {

        const { id } = req.params

        const posts = await PostsModel.findById(id);

        res.status(200).send({
            statusCode: 200,

            posts: posts,
        });

    } catch (error) {

        res.status(500).send({
            statusCode: 500,
            message: "internal server Error",
            error,
        });

    }

})

//! GET dei POSTS

post.get("/posts",    async (request, response) => {

    const totalPosts = await PostsModel.count();

    try {
        const posts = await PostsModel.find()
        .populate("author");  //serve a popolare l'autore nel post tramite id



        response.status(200).send({
            statusCode: 200,
            message:"ciao",
            totalPost: totalPosts,
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


//! POST 
post.post('/posts/create',  async (req, res) =>  { 

    const user = await authorsModel.findOne({_id: req.body.author});


    

    if(!user){
        return res.status(404).send({
            statusCode: 404,
            message: "internal server Error",
    })
    }

   

    const newPost = new PostsModel({

        category: req.body.category,
        title: req.body.title,
        cover:  req.body.cover ,
        readTime: req.body.readTime,
        author: user._id,
        content: req.body.content,
    })

    try {
        const post = await newPost.save();
         
        await authorsModel.updateOne({_id: user._id}, {$push: {posts: post}});

        res.status(201).send({
            statusCode: 201,
            message: "Post saved successfully",
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

//! PATCH POSTS
//chiamata modifica per modificare solo quello che passo

post.patch('/posts/:id', async (res, req) => {
    const { id } = req.params

    const postExist = await PostsModel.findById(id)

    if (!postExist) {
        return res.status(404).send({
            statusCode: 404,
            mesage: ` post with id ${id} not found!`
        })

    }

    try {
        const postId = id;
        const dataToUpdate = req.body
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server Error",
            error,
        });
    }
})

//! PUT ID

post.put('/posts/:id', async (req, res) => {
    const { id } = req.params

    const element = PostsModel.findById(id)

    if (!element) {
        return res.status(404).send({
            statusCode: 404,
            mesage: ` post with id ${id} not found!`
        })

    }

    try {

        const dataUpdate = req.body
        const option = { new: true }
        const postExist = await PostsModel.findByIdAndUpdate(id, dataUpdate, option)

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

//! GET TITLE
post.get('/posts/title'), async (req, res) => {
    const { postTitle } = req.query;

    try {
        const postByTitle = await PostsModel.find({
            title: {
                $regex: '.*' + postTitle + '.*',
                $options: 'i',
            },
        });

        if (!postByTitle || postByTitle.length == 0) {
            return res.status(404).send({
                statusCode: 404,
                message: `post with title ${postTitle} not found!`
            })
        }

       res.status(200).send({
        status: 200,
        postByTitle,
       })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server Error",
            error,
        });
    }
}

//! DELETE POST ID

post.delete('/posts/:id', async (req, res) => {
    const { id } = req.params

    try {
        const element = PostsModel.findById(id)

        if (!element) {
            return res.status(404).send({
                statusCode: 404,
                mesage: ` post with id ${id} not found!`
            })

        }



        // const dataUpdate = req.body
        // const option = { new: true }
        const postToDelete = await PostsModel.findByIdAndDelete(id)

        res.status(201).send({
            statusCode: 201,
            message: `Post with id ${id} deleted successfully`,

        });


    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server Error",
            error,
        });
    }
})



module.exports = post;